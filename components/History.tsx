
import React from 'react';
import { MeasurementRecord } from '../types';

interface HistoryProps {
  records: MeasurementRecord[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ records, onClear }) => {
  if (records.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Histórico Recente</h3>
        <button 
          onClick={onClear}
          className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider"
        >
          Limpar Tudo
        </button>
      </div>
      <div className="space-y-3">
        {records.map((record) => (
          <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="font-bold text-gray-700">{record.tankType}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-sm font-medium text-gray-500">{record.cm} cm</span>
              <i className="fas fa-arrow-right text-[10px] text-gray-300"></i>
              <span className="text-lg font-bold text-orange-600">{record.liters.toLocaleString('pt-BR')} L</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
