import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AjouterEleve = () => {
  const [formData, setFormData] = useState({ nom: '', prenom: '', classe: '', dateNaissance: '', sexe: '' });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('--- DEBUG INFO ---');
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('------------------');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/eleves', formData);
      navigate('/eleves');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'élève :", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter un Élève</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="classe" placeholder="Classe" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="dateNaissance" placeholder="Date de naissance" onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="sexe" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Sélectionnez le sexe</option>
          <option value="Masculin">Masculin</option>
          <option value="Féminin">Féminin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterEleve;
