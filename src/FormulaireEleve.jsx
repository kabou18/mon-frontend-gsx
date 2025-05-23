import { useState } from "react";
import { ajouterEleve } from "./api";

export default function FormulaireEleve({ onAjout }) {
  const [nom, setNom] = useState("");
  const [classe, setClasse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ajouterEleve(nom, classe);
      setNom("");
      setClasse("");
      onAjout(); // recharge la liste des élèves
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Ajouter un élève</h3>
      <input
        type="text"
        placeholder="Nom de l’élève"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Classe (ex: CP, CE1...)"
        value={classe}
        onChange={(e) => setClasse(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
    </form>
  );
}
