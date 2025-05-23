import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white text-sm p-4 mt-8 flex items-center justify-between border-t-4 border-red-600">
      <img src="/logo.jpg" alt="Logo école" className="h-8 w-8 object-contain rounded bg-white p-0.5 shadow" />
      <span>&copy; {new Date().getFullYear()} Groupe Scolaire les eXperts. Tous droits réservés.</span>
    </footer>
  );
};

export default Footer;
