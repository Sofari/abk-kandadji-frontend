import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar-ABK';
import LoginForm from './components/LoginForm';

// Pages ABK
import DashboardPage from './pages/DashboardPage-ABK';
import ContractsPage from './pages/ContractsPage-ABK';
import DeadlinesPage from './pages/DeadlinesPage-ABK';
import AlertsPage from './pages/AlertsPage-ABK';

// Composant ProtectedRoute
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
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
      </Routes>
    </Router>
  );
}
