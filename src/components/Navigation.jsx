// src/components/Navigation.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const isConnected = localStorage.getItem('connecte') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('connecte');
    navigate('/connexion');
  };

  return (
    <nav className="bg-blue-700 text-white p-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <img src="/logo.jpg" alt="Logo école" className="h-8 w-8 object-contain rounded bg-white p-0.5 shadow" />
        <span className="text-lg font-semibold tracking-wide">GSX</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-red-500 font-semibold transition-colors">Accueil</Link>
        <Link to="/eleves" className="hover:text-red-500 font-semibold transition-colors">Élèves</Link>
        <Link to="/paiements" className="hover:text-red-500 font-semibold transition-colors">Paiements</Link>
        <Link to="/statistiques" className="hover:text-red-500 font-semibold transition-colors">Statistiques</Link>
        {isConnected && (
          <button
            onClick={handleLogout}
            className="ml-6 bg-red-600 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded transition-colors shadow"
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
