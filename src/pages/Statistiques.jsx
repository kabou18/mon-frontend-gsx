import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Statistiques = () => {
  const [statistiques, setStatistiques] = useState({});

  useEffect(() => {
    api.get('/statistiques')
      .then(res => setStatistiques(res.data))
      .catch(err => console.error("Erreur de chargement des statistiques :", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Statistiques</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold">Nombre total d'élèves</h2>
          <p className="text-3xl">{statistiques.totalEleves || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
           <h2 className="text-xl font-semibold">Total des paiements</h2>
           <p className="text-3xl">{statistiques.totalGlobal || 0} FCFA</p>
           <p className="text-sm text-gray-600">Nombre d’opérations : {statistiques.totalPaiements || 0}</p>
           <div className="text-xs text-gray-500 mt-2">
             <div>Inscriptions : {statistiques.totalInscriptions || 0} FCFA</div>
             <div>Mensualités : {statistiques.totalMensualites || 0} FCFA</div>
           </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-xl font-semibold">Élèves par classe</h2>
          <ul className="list-disc list-inside">
            {statistiques.parClasse && Object.entries(statistiques.parClasse).map(([classe, count]) => (
              <li key={classe}>{classe} : {count}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-xl font-semibold">Paiements manquants</h2>
          <p className="text-3xl">{statistiques.impayes || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistiques;
