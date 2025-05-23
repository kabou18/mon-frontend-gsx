import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ModifierEleve = () => {
  const { id } = useParams();
  const [eleve, setEleve] = useState(null);
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/eleves/${id}`)
      .then(res => {
        const data = res.data;
        setEleve({
          nom: data.nom || '',
          prenom: data.prenom || '',
          classe: data.classe || '',
          dateNaissance: data.dateNaissance ? data.dateNaissance.slice(0, 10) : '',
          sexe: data.sexe || 'Masculin'
        });
      })
      .catch(err => console.error("Erreur de chargement :", err));
  }, [id]);

  const handleChange = (e) => {
    setEleve({ ...eleve, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (motDePasse !== 'admin123') {
      alert('Mot de passe incorrect');
      return;
    }
    axios.put(`http://localhost:5000/api/eleves/${id}`, eleve)
      .then(() => navigate('/eleves'))
      .catch(err => console.error("Erreur de mise à jour :", err));
  };

  if (!eleve) return <div>Chargement...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier l'Élève</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" value={eleve.nom} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="prenom" value={eleve.prenom} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="classe" value={eleve.classe} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="dateNaissance" value={eleve.dateNaissance} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="sexe" value={eleve.sexe} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="Masculin">Masculin</option>
          <option value="Féminin">Féminin</option>
        </select>
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={e => setMotDePasse(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Enregistrer</button>
      </form>
    </div>
  );
};

export default ModifierEleve;