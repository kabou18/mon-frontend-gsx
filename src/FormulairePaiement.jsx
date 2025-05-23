import { useState } from "react";
import { ajouterPaiement } from "./api";

export default function FormulairePaiement({ eleves, onAjout }) {
  const [eleveId, setEleveId] = useState("");
  const [montant, setMontant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ajouterPaiement(eleveId, montant);
      setEleveId("");
      setMontant("");
      onAjout(); // recharge les données
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Enregistrer un paiement</h3>
      <select
        value={eleveId}
        onChange={(e) => setEleveId(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Sélectionnez un élève</option>
        {eleves.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nom} – {e.classe}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Montant (€)"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </form>
  );
}
