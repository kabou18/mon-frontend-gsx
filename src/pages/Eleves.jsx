import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmPasswordModal from '../components/ConfirmPasswordModal';
import AjouterPaiementModal from '../components/AjouterPaiementModal';

const Eleves = () => {
  const [eleves, setEleves] = useState([]);
  const [selectedEleve, setSelectedEleve] = useState(null);
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [classeFiltre, setClasseFiltre] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/eleves')
      .then(response => setEleves(response.data))
      .catch(error => console.error('Erreur de chargement des élèves :', error));
  }, []);

  const handleAjouterPaiementClick = (eleve) => {
    setSelectedEleve(eleve);
    setShowPaiementModal(true);
  };

  const handleClosePaiementModal = () => {
    setShowPaiementModal(false);
    setSelectedEleve(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Élèves</h1>
      {/* Champ de filtre par classe */}
      <div className="mb-4">
        <label htmlFor="classeFiltre" className="mr-2 font-semibold">Filtrer par classe :</label>
        <select
          id="classeFiltre"
          value={classeFiltre}
          onChange={e => setClasseFiltre(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Toutes les classes</option>
          {[...new Set(eleves.map(e => e.classe))].filter(Boolean).map(classe => (
            <option key={classe} value={classe}>{classe}</option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nom</th>
            <th className="py-2 px-4 border">Prénom</th>
            <th className="py-2 px-4 border">Classe</th>
            <th className="py-2 px-4 border">Modifier</th>
            <th className="py-2 px-4 border">Supprimer</th>
            <th className="py-2 px-4 border">Ajouter Paiement</th>
          </tr>
        </thead>
        <tbody>
          {eleves
            .filter(eleve => !classeFiltre || eleve.classe === classeFiltre)
            .map((eleve, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{eleve.identifiant}</td>
              <td className="py-2 px-4 border">{eleve.nom}</td>
              <td className="py-2 px-4 border">{eleve.prenom}</td>
              <td className="py-2 px-4 border">{eleve.classe}</td>
              <td className="py-2 px-4 border">
                <Link to={`/eleves/modifier/${eleve._id}`} className="text-blue-500">Modifier</Link>
              </td>
              <td className="py-2 px-4 border">
                <Link to={`/eleves/supprimer/${eleve._id}`} className="text-red-500">Supprimer</Link>
              </td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                  onClick={() => handleAjouterPaiementClick(eleve)}
                >
                  Ajouter un paiement
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPaiementModal && selectedEleve && (
        <AjouterPaiementModal
          eleve={selectedEleve}
          onClose={handleClosePaiementModal}
        />
      )}
    </div>
  );
};

export default Eleves;