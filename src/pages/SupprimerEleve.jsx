import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SupprimerEleve = () => {
  const { id } = useParams();
  const [eleve, setEleve] = useState(null);
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/eleves/${id}`)
      .then(res => setEleve(res.data))
      .catch(err => console.error("Erreur de chargement :", err));
  }, [id]);

  const handleDelete = async () => {
    if (motDePasse !== 'admin123') {
      alert('Mot de passe incorrect');
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/eleves/${id}`);
      navigate('/eleves');
    } catch (err) {
      console.error("Erreur de suppression :", err);
    }
  };

  if (!eleve) return <div>Chargement...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supprimer l'Élève</h1>
      <p>Êtes-vous sûr de vouloir supprimer l'élève suivant ?</p>
      <p><strong>{eleve.nom} {eleve.prenom}</strong> - Classe : {eleve.classe}</p>
      <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} className="w-full p-2 border rounded mt-4" required />
      <button onClick={handleDelete} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>
    </div>
  );
};

export default SupprimerEleve;