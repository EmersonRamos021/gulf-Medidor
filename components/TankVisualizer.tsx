
import React from 'react';

interface TankVisualizerProps {
  percentage: number;
}

const TankVisualizer: React.FC<TankVisualizerProps> = ({ percentage }) => {
  const safePercentage = Math.min(100, Math.max(0, percentage));
  
  return (
    <div className="relative w-full h-64 flex flex-col items-center justify-center mb-8">
      {/* Tank body outline */}
      <div className="relative w-40 h-60 border-4 border-gray-400 rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
        {/* Fuel liquid */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-orange-500 transition-all duration-500 ease-in-out flex flex-col justify-start"
          style={{ height: `${safePercentage}%` }}
        >
          {/* Surface effect */}
          <div className="w-full h-1 bg-orange-400 opacity-50 shadow-[0_-4px_8px_rgba(249,115,22,0.5)]"></div>
          
          {/* Bubbles animation simulation */}
          {safePercentage > 0 && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="w-full h-full bg-gradient-to-t from-orange-700 to-transparent"></div>
            </div>
          )}
        </div>
        
        {/* Measurement markers */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 px-2 pointer-events-none">
          {[100, 75, 50, 25, 0].map((marker) => (
            <div key={marker} className="flex items-center space-x-2">
              <div className="w-4 h-[1px] bg-gray-400"></div>
              <span className="text-[10px] text-gray-400 font-mono">{marker}%</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative base */}
      <div className="w-48 h-4 bg-gray-400 rounded-full -mt-1 shadow-md"></div>
      
      {/* Label */}
      <div className="mt-4 text-center">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Nível do Tanque</span>
      </div>
    </div>
  );
};

export default TankVisualizer;
