import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.jpeg" 
              alt="ABK Kandadji" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">ABK KANDADJI</p>
              <p className="text-xs text-gray-500">Gestion Juridique</p>
            </div>
          </Link>

          {/* Menu */}
          {user && (
            <div className="flex gap-8 items-center">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Dashboard
              </Link>
              <Link 
                to="/contracts" 
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Contrats
              </Link>
              <Link 
                to="/deadlines" 
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Échéances
              </Link>
              <Link 
                to="/alerts" 
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Alertes
              </Link>

              {/* Profil */}
              <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">{user.nom_prenom}</p>
                  <p className="text-gray-500 text-xs">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded text-sm font-medium transition"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
