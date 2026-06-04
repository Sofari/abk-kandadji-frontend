import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

// Icons minimalistes SVG pour console admin
const Icons = {
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  Files: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2-13H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2z" />
    </svg>
  ),
  Contract: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm6-11a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
};

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const MenuItem = ({ icon: Icon, label, path }) => (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive(path)
          ? 'bg-gray-700 text-white border-l-2 border-blue-500'
          : 'text-gray-300 hover:text-white hover:bg-gray-700'
      }`}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-2">
         
          <div>
              <img 
  src="/logo.jpeg" 
  alt="ABK Kandadji" 
  className="h-16 w-16 object-contain bg-white rounded-lg p-1"
/>
            <p className="text-xs text-gray-500">Portail Gestion Juridique</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-6">
        {/* Principal Section */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">Principal</p>
          <div className="space-y-1">
            <MenuItem icon={Icons.Home} label="Accueil" path="/" />
            <MenuItem icon={Icons.Files} label="Documents" path="/documents" />
            <MenuItem icon={Icons.Contract} label="Contrats" path="/contracts" />
            <MenuItem icon={Icons.Users} label="Partenaires" path="/partners" />
          </div>
        </div>

        {/* Gestion Section */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">Gestion</p>
          <div className="space-y-1">
            <MenuItem icon={Icons.Clock} label="Échéances" path="/deadlines" />
            <MenuItem icon={Icons.Bell} label="Alertes" path="/alerts" />
            <MenuItem icon={Icons.Settings} label="Clauses" path="/clauses" />
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="border-t border-gray-800 p-4">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
              {user?.nom_prenom?.[0]?.toUpperCase()}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-100 truncate">{user?.nom_prenom}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 bg-gray-800 border border-gray-700 rounded shadow-lg mb-2 py-1 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                Profil
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors border-t border-gray-700"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
