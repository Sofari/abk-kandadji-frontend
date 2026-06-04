import { useState, useEffect } from 'react';
import { contractsAPI } from '../api/client';

export default function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      setLoading(true);
      const response = await contractsAPI.getAll();
      setContracts(response.data.data.contracts || []);
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
          <h1 className="text-2xl font-bold text-gray-100">Contrats</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des contrats et accords</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 border border-blue-600 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
        >
          + Nouveau
        </button>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Total</p>
            <p className="text-2xl font-mono font-bold">{contracts.length}</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Actifs</p>
            <p className="text-2xl font-mono font-bold text-green-400">0</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Montant total</p>
            <p className="text-2xl font-mono font-bold">0 XOF</p>
          </div>
        </div>

        {/* Filters */}
        <div className="border border-gray-800 rounded p-4 mb-8">
          <p className="text-xs uppercase text-gray-500 mb-3 font-bold">Filtres</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Rechercher..."
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 placeholder-gray-600 focus:border-blue-600 focus:outline-none"
            />
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Tous les statuts</option>
            </select>
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Tous les partenaires</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {contracts.length === 0 ? (
          <div className="border border-gray-800 rounded p-12 text-center">
            <p className="text-gray-500 text-sm">Aucun contrat</p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800 bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Numéro</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Titre</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Montant</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Signature</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td className="px-4 py-3 text-gray-300 font-mono">{c.numero_contrat}</td>
                    <td className="px-4 py-3 text-gray-300">{c.titre}</td>
                    <td className="px-4 py-3 text-gray-300 font-mono">{c.montant || '-'}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{c.date_signature ? new Date(c.date_signature).toLocaleDateString('fr-FR') : '-'}</td>
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
              <h2 className="text-lg font-bold">Nouveau contrat</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300">✕</button>
            </div>
            <form className="space-y-3">
              <input type="text" placeholder="Numéro" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none" />
              <input type="text" placeholder="Titre" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none" />
              <input type="number" placeholder="Montant" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none" />
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
