import { useState, useEffect } from 'react';
import { contractsAPI } from '../api/client';

export default function ContractList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      setLoading(true);
      const response = await contractsAPI.getAll();
      setContracts(response.data.data.contracts || []);
      setError(null);
    } catch (err) {
      setError('Erreur chargement contrats');
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
        <h2 className="text-2xl font-bold">Contrats</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nouveau
        </button>
      </div>

      {contracts.length === 0 ? (
        <p className="text-gray-500">Aucun contrat trouvé</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Numéro</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Titre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Montant</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date Signature</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold">{contract.numero_contrat}</td>
                  <td className="px-6 py-3">{contract.titre}</td>
                  <td className="px-6 py-3">{contract.montant || '-'}</td>
                  <td className="px-6 py-3">
                    {contract.date_signature
                      ? new Date(contract.date_signature).toLocaleDateString('fr-FR')
                      : '-'}
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
