import React from 'react';

const moisList = [
  'Septembre', 'Octobre', 'Novembre', 'Décembre',
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'
];

const PaiementMoisButtons = ({ selectedMois, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {moisList.map((mois) => (
        <button
          key={mois}
          onClick={() => onSelect(mois)}
          className={`px-3 py-1 rounded ${
            selectedMois === mois
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {mois}
        </button>
      ))}
    </div>
  );
};

export default PaiementMoisButtons;
