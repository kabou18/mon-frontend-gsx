// src/components/ActionButtons.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <button
        onClick={() => navigate('/eleves')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Afficher les Élèves par Classe
      </button>
      <button
        onClick={() => navigate('/eleves/ajouter')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Créer un Nouvel Élève
      </button>
    </div>
  );
};

export default ActionButtons;
