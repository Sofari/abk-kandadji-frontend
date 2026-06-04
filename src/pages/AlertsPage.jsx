import { useState, useEffect } from 'react';
import { alertsAPI } from '../api/client';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await alertsAPI.getAll();
      setAlerts(response.data.data.alerts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const activeAlerts = alerts.filter(a => a.statut === 'active');
  const inactiveAlerts = alerts.filter(a => a.statut === 'deactivee');

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Chargement...</div>;
  }

  return (
    <div className="ml-64 min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Alertes</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des alertes et notifications</p>
        </div>
        <button className="px-4 py-2 border border-blue-600 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium">
          + Nouvelle
        </button>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Total</p>
            <p className="text-2xl font-mono font-bold">{alerts.length}</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">En attente</p>
            <p className="text-2xl font-mono font-bold">0</p>
          </div>
          <div className="border border-red-700 rounded p-4">
            <p className="text-xs uppercase text-red-600 mb-2">Critiques</p>
            <p className="text-2xl font-mono font-bold text-red-400">0</p>
          </div>
          <div className="border border-green-700 rounded p-4">
            <p className="text-xs uppercase text-green-600 mb-2">Acquittées</p>
            <p className="text-2xl font-mono font-bold text-green-400">0</p>
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
              <option>Tous niveaux</option>
            </select>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="mb-8">
            <p className="text-xs uppercase text-green-600 font-bold mb-3">Alertes actives</p>
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="border border-green-700 rounded p-4 hover:bg-gray-900 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-mono text-green-400">Alert #{alert.id}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.type_alerte}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-400 hover:text-blue-300">Modifier</button>
                      <button className="text-xs text-yellow-400 hover:text-yellow-300">Pause</button>
                      <button className="text-xs text-red-400 hover:text-red-300">Suppr</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Alerts */}
        {inactiveAlerts.length > 0 && (
          <div className="mb-8">
            <p className="text-xs uppercase text-gray-600 font-bold mb-3">Alertes inactives</p>
            <div className="space-y-2">
              {inactiveAlerts.map((alert) => (
                <div key={alert.id} className="border border-gray-800 rounded p-4 hover:bg-gray-900 transition-colors opacity-75">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-mono text-gray-400">Alert #{alert.id}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.type_alerte}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-green-400 hover:text-green-300">Activer</button>
                      <button className="text-xs text-red-400 hover:text-red-300">Suppr</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.length === 0 && (
          <div className="border border-gray-800 rounded p-12 text-center">
            <p className="text-gray-500 text-sm">Aucune alerte</p>
          </div>
        )}
      </div>
    </div>
  );
}
