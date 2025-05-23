// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Eleves from './pages/Eleves';
import AjouterEleve from './pages/AjouterEleve';
import Paiements from './pages/Paiements';
import Statistiques from './pages/Statistiques';
import ModifierEleve from './pages/ModifierEleve';
import SupprimerEleve from './pages/SupprimerEleve';
import Connexion from './pages/Connexion';
import Navigation from './components/Navigation';
import Header from './components/Header';
import AjouterPaiement from './pages/AjouterPaiement';


import { useLocation, Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const location = useLocation();
  const isConnected = localStorage.getItem('connecte') === 'true';
  if (!isConnected && location.pathname !== '/connexion') {
    return <Navigate to="/connexion" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Navigation />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/connexion" element={<Connexion />} />
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/eleves" element={<Eleves />} />
                    <Route path="/eleves/ajouter" element={<AjouterEleve />} />
                    <Route path="/eleves/modifier/:id" element={<ModifierEleve />} />
                    <Route path="/eleves/supprimer/:id" element={<SupprimerEleve />} />
                    <Route path="/paiements" element={<Paiements />} />
                    <Route path="/statistiques" element={<Statistiques />} />
                    <Route path="/ajouterPaiement" element={<AjouterPaiement />} />
                  </Routes>
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
