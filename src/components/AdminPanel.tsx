import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Settings, Home, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Installer from './Installer';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">
                <Home className="w-5 h-5" />
              </Link>
              <Link 
                to="/admin"
                className={`flex items-center gap-2 ${
                  location.pathname === '/admin' ? 'text-blue-600' : 'text-gray-600'
                } hover:text-blue-600 transition-colors`}
              >
                <Settings className="w-5 h-5" />
                <span>Panel</span>
              </Link>
              <Link 
                to="/admin/installer"
                className={`flex items-center gap-2 ${
                  location.pathname === '/admin/installer' ? 'text-blue-600' : 'text-gray-600'
                } hover:text-blue-600 transition-colors`}
              >
                <span>Instalator</span>
              </Link>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Wyloguj</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Panel administracyjny</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Konfiguracja systemu</h2>
          <p className="text-gray-600 mb-4">
            Zarządzaj ustawieniami strony i modułów systemu.
          </p>
          <Link
            to="/admin/installer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Otwórz instalator
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="installer"
        element={
          <AdminLayout>
            <Installer />
          </AdminLayout>
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default AdminPanel;