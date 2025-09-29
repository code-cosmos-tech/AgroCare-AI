import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, useNavigate, BrowserRouter, NavLink, Navigate } from 'react-router-dom';
import MyFarms from './pages/MyFarms';
import CropRecommender from './pages/CropRecommender';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PestIdentifier from './pages/PestIdentifier';
import { ToastContainer } from "react-toastify"
import { useAuth } from './store/Auth';
import { useLanguage } from './store/language';

// Header Component
const Header = () => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/my-farms':
        return 'My Farms';
      case '/recommend':
        return 'Crop Recommender';
      case '/identify':
        return 'Pest Identifier';
      default:
        return 'Farm Management';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          {getPageTitle(location.pathname)}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { T, language, setLanguage } = useLanguage();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/my-farms', label: 'My Farms', icon: '🌾' },
    { path: '/recommend', label: 'Crop Recommender', icon: '💡' },
    { path: '/identify', label: 'Pest Identifier', icon: '🔍' },
  ];

  return (
    <aside className="bg-green-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Farm Manager</h2>
        <p className="text-green-200 text-sm">Smart Agriculture</p>
      </div>
      <div className="mb-4 flex space-x-2 bg-white rounded-lg shadow-sm p-2">
        <button
          onClick={() => setLanguage('en')}
          className={`flex-1 text-sm font-medium px-3 py-1 rounded-md border ${language === 'en'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-700 border-gray-300'
            }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('hi')}
          className={`flex-1 text-sm font-medium px-3 py-1 rounded-md border ${language === 'hi'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-700 border-gray-300'
            }`}
        >
          हिन्दी
        </button>
        <button
          onClick={() => setLanguage('or')}
          className={`flex-1 text-sm font-medium px-3 py-1 rounded-md border ${language === 'or'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-700 border-gray-300'
            }`}
        >
          ଓଡ଼ିଆ
        </button>
      </div>


      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
              ? 'bg-green-700 text-white'
              : 'text-green-100 hover:bg-green-700 hover:text-white'
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-green-700">
        <button
          className="flex items-center space-x-3 p-3 w-full text-left text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
          onClick={() => navigate('/login')}
        >
          <span className="text-lg">⚙️</span>
          <span className="font-medium">Settings</span>
        </button>

        <button
          className="flex items-center space-x-3 p-3 w-full text-left text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
          onClick={() => { logout(); navigate(0) }}
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </aside>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

// App Component with Conditional Layout
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Authentication pages without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages with layout */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/my-farms" element={<ProtectedRoute><MainLayout><MyFarms /></MainLayout></ProtectedRoute>} />
        <Route path="/recommend" element={<ProtectedRoute><MainLayout><CropRecommender /></MainLayout></ProtectedRoute>} />
        <Route path="/identify" element={<ProtectedRoute><MainLayout><PestIdentifier /></MainLayout></ProtectedRoute>} />

        {/* Default redirect */}
        <Route path="*" element={<MainLayout><Dashboard /></MainLayout>} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
