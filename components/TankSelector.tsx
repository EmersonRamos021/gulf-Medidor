
import React from 'react';
import { TankType } from '../types';

interface TankSelectorProps {
  currentType: TankType;
  onSelect: (type: TankType) => void;
}

const TankSelector: React.FC<TankSelectorProps> = ({ currentType, onSelect }) => {
  return (
    <div className="flex p-1 bg-gray-200 rounded-xl mb-6 shadow-inner max-w-sm mx-auto">
      <button
        onClick={() => onSelect(TankType.TANK_30K)}
        className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
          currentType === TankType.TANK_30K
            ? 'bg-white text-orange-600 shadow-md transform scale-100'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Tanque 30.000L
      </button>
      <button
        onClick={() => onSelect(TankType.TANK_15K)}
        className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
          currentType === TankType.TANK_15K
            ? 'bg-white text-orange-600 shadow-md transform scale-100'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Tanque 15.000L
      </button>
    </div>
  );
};

export default TankSelector;
