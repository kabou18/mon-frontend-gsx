import React, { useState } from 'react';

const ConfirmPasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password === 'admin123') {
      setPassword('');
      setError('');
      onConfirm(); // Le parent doit fermer le modal après succès
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border p-2 rounded mb-2"
          autoFocus
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 rounded">Annuler</button>
          <button onClick={handleConfirm} className="bg-blue-600 text-white px-3 py-1 rounded">Valider</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordModal;