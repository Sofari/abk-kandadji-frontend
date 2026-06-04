import { useState, useEffect } from 'react';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    type: '',
    pays: '',
    contact: '',
    email: '',
    telephone: '',
    adresse: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Partenaire créé:', formData);
    setFormData({ nom: '', type: '', pays: '', contact: '', email: '', telephone: '', adresse: '' });
    setShowModal(false);
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Partenaires</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des partenaires et contacts</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Total</p>
            <p className="text-2xl font-mono font-bold">{partners.length}</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Types</p>
            <p className="text-2xl font-mono font-bold">0</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Pays</p>
            <p className="text-2xl font-mono font-bold">0</p>
          </div>
          <div className="border border-gray-800 rounded p-4">
            <p className="text-xs uppercase text-gray-500 mb-2">Actifs</p>
            <p className="text-2xl font-mono font-bold text-green-400">0</p>
          </div>
        </div>

        {/* Filters */}
        <div className="border border-gray-800 rounded p-4 mb-8">
          <p className="text-xs uppercase text-gray-500 mb-3 font-bold">Filtres</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Rechercher par nom, contact, email..."
              className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 placeholder-gray-600 focus:border-blue-600 focus:outline-none"
            />
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Tous les types</option>
              <option value="entreprise">Entreprise</option>
              <option value="individu">Individu</option>
              <option value="ogm">OGM</option>
            </select>
            <select className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none">
              <option>Tous les pays</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {partners.length === 0 ? (
          <div className="border border-gray-800 rounded p-12 text-center">
            <p className="text-gray-500 text-sm">Aucun partenaire</p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800 bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-bold uppercase tracking-wider">Téléphone</th>
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
          <div className="bg-gray-900 border border-gray-800 rounded p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-900 pb-4">
              <h2 className="text-lg font-bold">Ajouter un partenaire</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nom du partenaire"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              >
                <option value="">Sélectionner un type</option>
                <option value="entreprise">Entreprise</option>
                <option value="individu">Individu</option>
                <option value="ogm">OGM</option>
              </select>
              <input
                type="text"
                placeholder="Pays"
                value={formData.pays}
                onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Personne de contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
              />
              <textarea
                placeholder="Adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:border-blue-600 focus:outline-none"
                rows="2"
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
