import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Paiements = () => {
  const [paiements, setPaiements] = useState([]);
  const [mois, setMois] = useState('tout');
  const [classe, setClasse] = useState('tout');
  const [situation, setSituation] = useState('tout');

  const classes = ['tout', 'PS', 'MS', 'GS', 'CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];
  const moisList = [
    'tout', 'inscription', // <-- Ajouté pour filtrer les inscriptions
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const situations = ['tout', 'Payé', 'Non payé'];

  const fetchPaiements = async () => {
    try {
      let url = 'http://localhost:5000/api/paiements/filtrer?';
      if (mois !== 'tout') {
        if (mois === 'inscription') {
          url += `type=inscription&`;
        } else {
          url += `mois=${mois}&`;
        }
      }
      if (classe !== 'tout') url += `classe=${classe}&`;
      if (situation !== 'tout') url += `situation=${situation}&`;

      const response = await axios.get(url);
      setPaiements(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des paiements :', error);
    }
  };

  useEffect(() => {
    fetchPaiements();
  }, [mois, classe, situation]);

  const totalMontant = paiements.reduce((sum, p) => sum + (p.montant || 0), 0);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Suivi des Paiements</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block font-medium">Mois :</label>
          <select value={mois} onChange={(e) => setMois(e.target.value)} className="border rounded px-2 py-1">
            {moisList.map((m) => (
              <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Classe :</label>
          <select value={classe} onChange={(e) => setClasse(e.target.value)} className="border rounded px-2 py-1">
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Situation :</label>
          <select value={situation} onChange={(e) => setSituation(e.target.value)} className="border rounded px-2 py-1">
            {situations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {paiements.length === 0 ? (
        <p>Aucun paiement trouvé pour les critères sélectionnés.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nom</th>
              <th className="border p-2">Prénom</th>
              <th className="border p-2">Classe</th>
              <th className="border p-2">Mois</th>
              <th className="border p-2">Montant</th>
              <th className="border p-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {paiements.map((p) => (
              <tr
                key={p._id}
                className={
                  p.situation === 'Non payé' ? 'bg-red-100' :
                  p.situation === 'Payé' ? 'bg-green-100' : ''
                }
              >
                <td className="border p-2">{p.nom}</td>
                <td className="border p-2">{p.prenom}</td>
                <td className="border p-2">{p.classe}</td>
                <td className="border p-2">
                  {p.type === "inscription"
                    ? "Inscription"
                    : (p.mois ? p.mois.charAt(0).toUpperCase() + p.mois.slice(1) : "")}
                </td>
                <td className="border p-2">
                  {p.situation === 'Payé' ? `${p.montant} FCFA` : <span className="text-red-600 font-semibold">Non payé</span>}
                </td>
                <td className="border p-2">{p.situation}</td>
              </tr>
            ))}
            <tr className="bg-gray-200 font-bold">
              <td className="border p-2" colSpan={4}>Total</td>
              <td className="border p-2">{totalMontant} FCFA</td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Paiements;