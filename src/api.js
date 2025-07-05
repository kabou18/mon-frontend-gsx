const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getEleves(classe = '') {
  try {
    const url = classe ? `${API_URL}/eleves?classe=${encodeURIComponent(classe)}` : `${API_URL}/eleves`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la récupération des élèves :', err);
    return [];
  }
}

export async function addEleve(nom, classe) {
  try {
    const res = await fetch(`${API_URL}/eleves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, classe }),
    });
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'élève :', err);
  }
}

export async function deleteEleve(id) {
  try {
    const res = await fetch(`${API_URL}/eleves/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'élève :', err);
  }
}

export async function getPaiements() {
  try {
    const res = await fetch(`${API_URL}/paiements`);
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la récupération des paiements :', err);
    return [];
  }
}

export async function addPaiement(eleve_id, montant, mois) {
  try {
    const res = await fetch(`${API_URL}/paiements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eleve_id, montant, mois }),
    });
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de l\'ajout du paiement :', err);
  }
}

export async function getStats() {
  try {
    const res = await fetch(`${API_URL}/stats`);
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la récupération des statistiques :', err);
    return {};
  }
}

export async function getClasses() {
  try {
    const res = await fetch(`${API_URL}/classes`);
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la récupération des classes :', err);
    return [];
  }
}

