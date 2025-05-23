import React, { useState } from 'react';

const PaiementFormMois = ({ eleveId, mois, onPaiement }) => {
  const [montant, setMontant] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!montant) return;
    onPaiement({ eleveId, mois, montant: Number(montant) });
    setMontant('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="number"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        placeholder="Montant"
        className="border rounded px-2 py-1 w-28"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Enregistrer
      </button>
    </form>
  );
};

export default PaiementFormMois;
