import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjouterPaiement = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [classe, setClasse] = useState('PS');
  const [type, setType] = useState('mensualite'); // Ajouté
  const [mois, setMois] = useState('janvier');
  const [montant, setMontant] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(montant) <= 0) {
      alert('Le montant doit être supérieur à 0');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/paiements/ajouter', {
        nom,
        prenom,
        classe,
        mois: type === 'mensualite' ? mois : undefined,
        montant: parseFloat(montant),
        type // Ajouté
      });
      alert('Paiement ajouté avec succès');
      navigate('/paiements');
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de l\'ajout du paiement');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ajouter un Paiement</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-md">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          required
        />
        <select value={classe} onChange={e => setClasse(e.target.value)} required>
          {["PS", "MS", "GS", "CI", "CP", "CE1", "CE2", "CM1", "CM2"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} required>
          <option value="mensualite">Mensualité</option>
          <option value="inscription">Inscription</option>
        </select>
        {type === "mensualite" && (
          <select value={mois} onChange={e => setMois(e.target.value)} required>
            {["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
        <input
          type="number"
          placeholder="Montant"
          value={montant}
          onChange={e => setMontant(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Valider
        </button>
      </form>
    </div>
  );
};

export default AjouterPaiement;