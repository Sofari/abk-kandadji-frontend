import { useState, useEffect } from 'react';
import { alertsAPI } from '../api/client';

export default function AlertsList() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await alertsAPI.getAll();
      setAlerts(response.data.data.alerts || []);
      setError(null);
    } catch (err) {
      setError('Erreur chargement alertes');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-2xl font-bold">Alertes</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nouvelle
        </button>
      </div>

      {alerts.length === 0 ? (
        <p className="text-gray-500">Aucune alerte trouvée</p>
      ) : (
        <div className="grid gap-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Alerte #{alert.id}</h3>
                  <p className="text-gray-600">Type: {alert.type_alerte}</p>
                  <div className="mt-2 flex gap-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      alert.statut === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.statut}
                    </span>
                  </div>
                </div>
                <div className="space-x-2">
                  <button className="text-blue-600 hover:underline">Modifier</button>
                  <button className="text-red-600 hover:underline">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
