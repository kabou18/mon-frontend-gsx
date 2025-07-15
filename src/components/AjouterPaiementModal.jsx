import React, { useState } from 'react';
import api from '../services/api';

const AjouterPaiementModal = ({ eleve, onClose }) => {
  const [type, setType] = useState('mensualite');
  const [mois, setMois] = useState('janvier');
  const [montant, setMontant] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!montant || parseFloat(montant) <= 0) {
      alert('Le montant doit être un nombre supérieur à 0');
      return;
    }

    setLoading(true);
    try {
      await api.post('/paiements/ajouter', {
        eleveId: eleve._id,
        mois: type === 'mensualite' ? mois : undefined,
        montant: parseFloat(montant),
        type
      });
      alert('Paiement ajouté avec succès');
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de l\'ajout du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Ajouter un Paiement pour {eleve.prenom} {eleve.nom}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <select value={type} onChange={e => setType(e.target.value)} required className="border px-2 py-1">
            <option value="mensualite">Mensualité</option>
            <option value="inscription">Inscription</option>
          </select>
          {type === "mensualite" && (
            <select value={mois} onChange={e => setMois(e.target.value)} required className="border px-2 py-1">
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
            className="border px-2 py-1"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Envoi...' : 'Valider'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjouterPaiementModal;