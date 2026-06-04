import { useState, useEffect } from 'react';
import { deadlinesAPI } from '../api/client';

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadDeadlines();
  }, []);

  const loadDeadlines = async () => {
    try {
      setLoading(true);
      const response = await deadlinesAPI.getAll();
      setDeadlines(response.data.data.deadlines || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Chargement...</div>;
  }

  return (
    <div className="ml-64 min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Échéances</h1>
          <p className="text-sm text-gray-500 mt-1">Suivi des dates clés</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 border border-blue-600 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
        >
          + Nouvelle
        </button>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Total</p>
            <p className="text-2xl font-mono font-bold">{deadlines.length}</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">En cours</p>
            <p className="text-2xl font-mono font-bold text-blue-400">0</p>
          </div>
          <div className="border border-yellow-700 rounded p-4">
            <p className="text-xs uppercase text-yellow-600 mb-2">En retard</p>
            <p className="text-2xl font-mono font-bold text-yellow-400">0</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Proches (&lt;7j)</p>
            <p className="text-2xl font-mono font-bold">0</p>
          </div>
        </div>

        {/* Filters */}
        <div className="border border-gray-800 rounded p-4 mb-8">
          <p className="text-xs uppercase text-gray-500 mb-3 font-bold">Filtres</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Rechercher..."
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 placeholder-gray-600 focus:border-blue-600 focus:outline-none"
            />
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Tous</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {deadlines.length === 0 ? (
          <div className="border border-gray-800 rounded p-12 text-center">
            <p className="text-gray-500 text-sm">Aucune échéance</p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800 bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Limite</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((d) => (
                  <tr key={d.id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td className="px-4 py-3 text-gray-300">{d.description || '-'}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{d.date_action ? new Date(d.date_action).toLocaleDateString('fr-FR') : '-'}</td>
                    <td className="px-4 py-3 text-gray-300 font-mono">{d.date_limite ? new Date(d.date_limite).toLocaleDateString('fr-FR') : '-'}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-1 border border-gray-700 rounded text-gray-400">{d.statut || '-'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Nouvelle échéance</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300">✕</button>
            </div>
            <form className="space-y-3">
              <input type="text" placeholder="Titre" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none" />
              <textarea placeholder="Description" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none" rows="2"></textarea>
              <input type="date" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none" />
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-3 py-2 border border-gray-700 rounded text-sm hover:bg-gray-800">Annuler</button>
                <button type="submit" className="flex-1 px-3 py-2 border border-blue-600 text-blue-400 rounded text-sm hover:bg-blue-600 hover:text-white">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
