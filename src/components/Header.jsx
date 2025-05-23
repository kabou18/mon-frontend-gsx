import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 flex items-center justify-between border-b-4 border-red-600 shadow-md">
      <img src="/logo.jpg" alt="Logo école" className="h-12 w-12 object-contain rounded bg-white p-1 shadow" />
      <h1 className="text-2xl font-bold tracking-wide">Groupe Scolaire les eXperts</h1>
    </header>
  );
};

export default Header;
