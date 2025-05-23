import React from 'react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total des Inscriptions</h3>
        <p className="text-xl">{stats.totalInscriptions || 0} CFA</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total des Mensualités</h3>
        <p className="text-xl">{stats.totalMensualites || 0} CFA</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Global</h3>
        <p className="text-xl">{stats.totalGlobal || 0} CFA</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Effectif Total</h3>
        <p className="text-xl">{stats.totalEleves || 0} élèves</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Nombre d'Opérations</h3>
        <p className="text-xl">{stats.totalPaiements || 0}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Impayés</h3>
        <p className="text-xl">{stats.impayes || 0}</p>
      </div>
    </div>
  );
};

export default DashboardStats;