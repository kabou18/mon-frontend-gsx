import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentification très simple
    if (identifiant === 'admin' && motDePasse === 'admin123') {
      localStorage.setItem('connecte', true);
      navigate('/');
    } else {
      setErreur('Identifiants incorrects');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-red-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col items-center">
        <img src="/logo.jpg" alt="Logo école" className="h-20 w-20 mb-4 rounded-full border-4 border-blue-700 shadow" />
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Connexion</h2>
        {erreur && <p className="text-red-600 text-sm mb-2">{erreur}</p>}
        <input
          type="text"
          placeholder="Identifiant"
          className="w-full mb-3 p-3 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-700 transition"
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full mb-3 p-3 border-2 border-red-300 rounded focus:outline-none focus:border-red-600 transition"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-red-600 text-white p-3 rounded font-semibold hover:from-blue-900 hover:to-red-700 transition">Se connecter</button>
      </form>
    </div>
  );
};

export default Connexion;
