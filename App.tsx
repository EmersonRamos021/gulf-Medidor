
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import TankSelector from './components/TankSelector';
import TankVisualizer from './components/TankVisualizer';
import History from './components/History';
import { TankType, MeasurementRecord } from './types';
import { DATA_30K, DATA_15K } from './constants';

const App: React.FC = () => {
  const [tankType, setTankType] = useState<TankType>(TankType.TANK_30K);
  const [cmInput, setCmInput] = useState<string>('');
  const [liters, setLiters] = useState<number>(0);
  const [history, setHistory] = useState<MeasurementRecord[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [bgImgError, setBgImgError] = useState(false);

  // URL estável do logotipo da Gulf
  const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Gulf_Oil_logo.svg/512px-Gulf_Oil_logo.svg.png";

  // Maximum values for normalization
  const maxLiters = tankType === TankType.TANK_30K ? 31309 : 15621;
  const maxCm = 254;

  const calculateLiters = useCallback((val: string, type: TankType) => {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) return 0;
    
    const clampedNum = Math.min(num, maxCm);
    const data = type === TankType.TANK_30K ? DATA_30K : DATA_15K;
    const base = Math.floor(clampedNum / 10) * 10;
    const unit = Math.floor(clampedNum % 10);
    
    const row = data.rows[base];
    if (!row) return 0;
    
    const result = row[unit] || 0;

    const decimals = clampedNum % 1;
    if (decimals > 0 && unit < 9) {
      const nextVal = row[unit + 1];
      if (nextVal !== undefined) {
        return result + (nextVal - result) * decimals;
      }
    } else if (decimals > 0 && unit === 9 && base + 10 <= 250) {
       const nextVal = data.rows[base + 10]?.[0];
       if (nextVal !== undefined) {
         return result + (nextVal - result) * decimals;
       }
    }

    return result;
  }, []);

  useEffect(() => {
    const res = calculateLiters(cmInput, tankType);
    setLiters(Math.round(res));
  }, [cmInput, tankType, calculateLiters]);

  const handleAddHistory = () => {
    if (liters > 0) {
      const newRecord: MeasurementRecord = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        cm: parseFloat(cmInput),
        liters,
        tankType
      };
      setHistory(prev => [newRecord, ...prev.slice(0, 9)]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${liters} L`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const percentage = useMemo(() => {
    return (liters / maxLiters) * 100;
  }, [liters, maxLiters]);

  return (
    <div className="min-h-screen pb-12 bg-gray-50 text-gray-800">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Visualizer */}
          <section className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 order-2 lg:order-1">
            <TankVisualizer percentage={percentage} />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
                <p className="text-xs text-orange-400 font-bold uppercase mb-1 tracking-wider">Capacidade</p>
                <p className="text-xl font-bold text-orange-800">{maxLiters.toLocaleString('pt-BR')} L</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                <p className="text-xs text-blue-400 font-bold uppercase mb-1 tracking-wider">Status</p>
                <p className="text-xl font-bold text-blue-800">{Math.round(percentage)}%</p>
              </div>
            </div>
          </section>

          {/* Right Column: Controls */}
          <section className="space-y-6 order-1 lg:order-2">
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <i className="fas fa-calculator mr-2 text-orange-600"></i>
                  Cálculo de Volume
                </h2>
                <div className="w-8 h-8 opacity-40 flex items-center justify-center">
                  {!bgImgError ? (
                    <img 
                      src={logoUrl} 
                      alt="Gulf Icon" 
                      className="grayscale contrast-200" 
                      onError={() => setBgImgError(true)}
                    />
                  ) : (
                    <i className="fas fa-gas-pump grayscale"></i>
                  )}
                </div>
              </div>

              <TankSelector currentType={tankType} onSelect={setTankType} />

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wider">
                    Medida na Régua (cm)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={cmInput}
                      onChange={(e) => setCmInput(e.target.value)}
                      placeholder="Ex: 156"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 text-3xl font-bold focus:border-orange-500 focus:bg-white transition-all outline-none text-orange-600 shadow-inner"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xl italic">
                      CM
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-blue-900 rounded-2xl p-6 text-white shadow-lg transform hover:scale-[1.01] transition-transform relative overflow-hidden min-h-[140px] flex flex-col justify-center">
                  {/* Background logo effect */}
                  {!bgImgError && (
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-15 rotate-12 pointer-events-none">
                      <img src={logoUrl} alt="Gulf Background" className="invert brightness-0" />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-90">Total em Litros</span>
                    <button 
                      onClick={copyToClipboard}
                      className="text-white hover:text-orange-200 transition-colors p-2 -mr-2 -mt-2 bg-white bg-opacity-10 rounded-full"
                      title="Copiar resultado"
                    >
                      <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                  </div>
                  <div className="flex items-baseline space-x-2 relative z-10">
                    <span className="text-5xl md:text-6xl font-black tabular-nums">{liters.toLocaleString('pt-BR')}</span>
                    <span className="text-xl font-bold opacity-80">L</span>
                  </div>
                  {cmInput && (
                    <p className="mt-4 text-[10px] uppercase font-bold tracking-tighter opacity-70 relative z-10">
                      Cálculo para Tanque de {tankType}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleAddHistory}
                  disabled={!cmInput || liters === 0}
                  className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <i className="fas fa-save"></i>
                  <span>Salvar no Histórico</span>
                </button>
              </div>
            </div>

            <History 
              records={history} 
              onClear={() => setHistory([])} 
            />
            
            {/* Quick Note Card */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-start space-x-3 shadow-sm">
              <i className="fas fa-shield-halved text-blue-600 mt-1"></i>
              <p className="text-xs text-blue-900 leading-relaxed font-medium">
                <strong>Ferramenta Oficial Gulf:</strong> Desenvolvida para Emerson Mota Ramos. Utilize este medidor para conferência precisa de estoque no Posto Gulf de Manilha.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      {/* Sticky footer for mobile quick actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden flex space-x-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
        <button 
          onClick={() => { setCmInput(''); setLiters(0); }}
          className="flex-1 bg-gray-100 text-gray-500 font-bold py-4 rounded-xl active:bg-gray-200 transition-colors"
        >
          Limpar
        </button>
        <button 
          onClick={handleAddHistory}
          disabled={!cmInput || liters === 0}
          className="flex-[2] bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all disabled:opacity-50"
        >
          Gravar Histórico
        </button>
      </div>
    </div>
  );
};

export default App;
