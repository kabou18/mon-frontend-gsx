// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardStats from '../components/DashboardStats';
import ActionButtons from '../components/ActionButtons';

const Dashboard = () => {
 const [stats, setStats] = useState({
  totalEleves: 0,
  totalPaiements: 0,
  totalMontant: 0,
  parClasse: {},
  impayes: 0
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/statistiques');
      setStats(response.data);
    } catch (error) {
      console.error('Erreur de récupération des statistiques:', error);
    }
  };

  fetchStats();
}, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de Bord</h1>
      <ActionButtons />
      <DashboardStats stats={stats} />
    </div>
  );
};

export default Dashboard;
