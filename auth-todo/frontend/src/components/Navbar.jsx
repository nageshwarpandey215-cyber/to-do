import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 TodoApp</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-90">Welcome, {user?.name}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
