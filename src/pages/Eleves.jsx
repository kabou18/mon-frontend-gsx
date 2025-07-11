import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import AjouterPaiementModal from '../components/AjouterPaiementModal';

const Eleves = () => {
  const [eleves, setEleves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedEleve, setSelectedEleve] = useState(null);
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [classeFiltre, setClasseFiltre] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/eleves')
      .then(response => {
        console.log("Données reçues du backend :", response.data);
        setEleves(response.data);
      })
      .catch(error => {
        console.error('Erreur de chargement des élèves :', error);
        setError('Impossible de charger les données des élèves. Veuillez réessayer.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      setDeletingId(id);
      try {
        await api.delete(`/eleves/${id}`);
        setEleves(prevEleves => prevEleves.filter(eleve => eleve._id !== id));
      } catch (err) {
        console.error('Erreur lors de la suppression de l\'élève:', err);
        alert('Une erreur est survenue lors de la suppression.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleAjouterPaiementClick = (eleve) => {
    setSelectedEleve(eleve);
    setShowPaiementModal(true);
  };

  const handleClosePaiementModal = () => {
    setShowPaiementModal(false);
    setSelectedEleve(null);
  };

  if (loading) {
    return <div className="p-4 text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Élèves</h1>
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
            .map(eleve => (
            <tr key={eleve._id}>
              <td className="py-2 px-4 border">{eleve._id}</td>
              <td className="py-2 px-4 border">{eleve.nom}</td>
              <td className="py-2 px-4 border">{eleve.prenom}</td>
              <td className="py-2 px-4 border">{eleve.classe}</td>
              <td className="py-2 px-4 border">
                <Link to={`/eleves/modifier/${eleve._id}`} className="text-blue-500">Modifier</Link>
              </td>
              <td className="py-2 px-4 border">
                <button 
                  onClick={() => handleDelete(eleve._id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded disabled:opacity-50"
                  disabled={deletingId === eleve._id}
                >
                  {deletingId === eleve._id ? 'Suppression...' : 'Supprimer'}
                </button>
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