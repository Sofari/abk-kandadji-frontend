import { useState, useEffect } from 'react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titre: '',
    type: '',
    categorie: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    console.log('Document créé:', formData);
    setFormData({ titre: '', type: '', categorie: '', description: '' });
    setShowModal(false);
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des documents juridiques</p>
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
            <p className="text-xs uppercase text-gray-500 mb-2">Total docs</p>
            <p className="text-2xl font-mono font-bold">{documents.length}</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Types</p>
            <p className="text-2xl font-mono font-bold">0</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Catégories</p>
            <p className="text-2xl font-mono font-bold">0</p>
          </div>
        </div>

        {/* Filters */}
        <div className="border border-gray-800 rounded p-4 mb-8">
          <p className="text-xs uppercase text-gray-500 mb-3 font-bold">Filtres</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Rechercher par titre ou description..."
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 placeholder-gray-600 focus:border-blue-600 focus:outline-none"
            />
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Tous les types</option>
            </select>
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Toutes les catégories</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {documents.length === 0 ? (
          <div className="border border-gray-800 rounded p-12 text-center">
            <p className="text-gray-500 text-sm">Aucun document</p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800 bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Titre</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Catégorie</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example rows would go here */}
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
              <h2 className="text-lg font-bold">Ajouter un document</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Titre du document"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              >
                <option value="">Sélectionner un type</option>
                <option value="contrat">Contrat</option>
                <option value="avenant">Avenant</option>
                <option value="clause">Clause</option>
                <option value="autre">Autre</option>
              </select>
              <select
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="general">Générale</option>
                <option value="confidentiel">Confidentielle</option>
                <option value="archive">Archive</option>
              </select>
              <textarea
                placeholder="Description du document"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
                rows="3"
              ></textarea>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-3 py-2 border border-gray-700 rounded text-sm hover:bg-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 border border-blue-600 text-blue-400 rounded text-sm hover:bg-blue-600 hover:text-white"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
