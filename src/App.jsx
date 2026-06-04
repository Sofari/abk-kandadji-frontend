import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Components
import Sidebar from './components/Sidebar';
import LoginForm from './components/LoginForm';

// Pages Console - 6 pages complètes
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import ContractsPage from './pages/ContractsPage';
import PartnersPage from './pages/PartnersPage';
import DeadlinesPage from './pages/DeadlinesPage';
import AlertsPage from './pages/AlertsPage';
import ClausesPage from './pages/ClausesPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}

export default function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        {/* Accueil */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Principal Section */}
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contracts"
          element={
            <ProtectedRoute>
              <ContractsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/partners"
          element={
            <ProtectedRoute>
              <PartnersPage />
            </ProtectedRoute>
          }
        />

        {/* Gestion Section */}
        <Route
          path="/deadlines"
          element={
            <ProtectedRoute>
              <DeadlinesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <AlertsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clauses"
          element={
            <ProtectedRoute>
              <ClausesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
