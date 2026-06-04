import { useState, useEffect } from 'react';
import { deadlinesAPI } from '../api/client';

export default function DeadlinesList() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDeadlines();
  }, []);

  const loadDeadlines = async () => {
    try {
      setLoading(true);
      const response = await deadlinesAPI.getAll();
      setDeadlines(response.data.data.deadlines || []);
      setError(null);
    } catch (err) {
      setError('Erreur chargement échéances');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (statut) => {
    const colors = {
      planifiee: 'bg-blue-100 text-blue-800',
      en_attente: 'bg-yellow-100 text-yellow-800',
      en_cours: 'bg-orange-100 text-orange-800',
      completée: 'bg-green-100 text-green-800',
      depassée: 'bg-red-100 text-red-800',
    };
    return colors[statut] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Échéances</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nouvelle
        </button>
      </div>

      {deadlines.length === 0 ? (
        <p className="text-gray-500">Aucune échéance trouvée</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date Limite</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deadlines.map((deadline) => (
                <tr key={deadline.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{deadline.description || '-'}</td>
                  <td className="px-6 py-3">
                    {deadline.date_action
                      ? new Date(deadline.date_action).toLocaleDateString('fr-FR')
                      : '-'}
                  </td>
                  <td className="px-6 py-3 font-semibold">
                    {deadline.date_limite
                      ? new Date(deadline.date_limite).toLocaleDateString('fr-FR')
                      : '-'}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(deadline.statut)}`}>
                      {deadline.statut || 'Non défini'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-blue-600 hover:underline mr-3">Modifier</button>
                    <button className="text-red-600 hover:underline">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
