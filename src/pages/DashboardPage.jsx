import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { contractsAPI, deadlinesAPI, alertsAPI } from '../api/client';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    contracts: 0,
    documents: 0,
    partners: 0,
    deadlines: 0,
    alerts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [contracts, deadlines, alerts] = await Promise.all([
        contractsAPI.getAll(1, 100),
        deadlinesAPI.getAll(1, 100),
        alertsAPI.getAll(1, 100),
      ]);

      setStats({
        contracts: contracts.data.data.contracts?.length || 0,
        documents: 0,
        partners: 0,
        deadlines: deadlines.data.data.deadlines?.length || 0,
        alerts: alerts.data.data.alerts?.length || 0,
      });
    } catch (error) {
      console.error('Erreur stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatBox = ({ label, value, status = 'normal' }) => {
    const statusColors = {
      normal: 'border-gray-700 text-gray-300',
      warning: 'border-yellow-700 text-yellow-400',
      critical: 'border-red-700 text-red-400',
      success: 'border-green-700 text-green-400',
    };

    return (
      <div className={`border ${statusColors[status]} rounded p-4 flex flex-col`}>
        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">{label}</p>
        <p className="text-3xl font-bold font-mono">{value}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="ml-64 min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-8">
        <h1 className="text-2xl font-bold text-gray-100">Accueil</h1>
        <p className="text-sm text-gray-500 mt-1">Aperçu du système de gestion juridique</p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <StatBox label="Contrats" value={stats.contracts} status="normal" />
          <StatBox label="Documents" value={stats.documents} status="normal" />
          <StatBox label="Partenaires" value={stats.partners} status="normal" />
          <StatBox label="Alertes" value={stats.alerts} status={stats.alerts > 0 ? 'warning' : 'normal'} />
          <StatBox label="Échéances" value={stats.deadlines} status="normal" />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Section */}
          <div className="border border-gray-800 rounded p-6">
            <h2 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">État du système</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">API Backend</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400">Actif</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-sm text-gray-400">Base de données</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400">Connectée</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Interface</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400">Opérationnel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border border-gray-800 rounded p-6">
            <h2 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">Raccourcis</h2>
            <div className="space-y-2">
              <a
                href="/contracts"
                className="block px-4 py-2 border border-gray-700 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                → Gérer les contrats
              </a>
              <a
                href="/deadlines"
                className="block px-4 py-2 border border-gray-700 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                → Gérer les échéances
              </a>
              <a
                href="/alerts"
                className="block px-4 py-2 border border-gray-700 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                → Gérer les alertes
              </a>
            </div>
          </div>
        </div>

        {/* Recent Contracts */}
        <div className="mt-8 border border-gray-800 rounded p-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-4">Contrats récents</h2>
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">Aucun contrat enregistré</p>
          </div>
        </div>
      </div>
    </div>
  );
}
