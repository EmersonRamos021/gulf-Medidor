
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  // URL estável do logotipo da Gulf (versão PNG de alta qualidade do Wikimedia)
  const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Gulf_Oil_logo.svg/512px-Gulf_Oil_logo.svg.png";

  return (
    <header className="bg-orange-600 text-white shadow-lg py-4 px-6 mb-8 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-1 rounded-full shadow-inner overflow-hidden flex items-center justify-center w-14 h-14 md:w-16 md:h-16 flex-shrink-0 border-2 border-blue-900">
            {!imgError ? (
              <img 
                src={logoUrl}
                alt="Logo Gulf" 
                className="w-full h-auto object-contain p-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <i className="fas fa-gas-pump text-orange-600 text-2xl"></i>
            )}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none">Medidor de Combustível</h1>
            <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 mt-1 font-semibold">Posto Gulf de Manilha</p>
          </div>
        </div>
        <div className="text-sm font-medium opacity-95 text-left md:text-right flex flex-col justify-center border-l-2 border-orange-400 border-opacity-30 pl-4 md:border-l-0 md:pl-0">
          <p className="font-bold text-base md:text-lg leading-tight uppercase">Posto Gulf de Manilha</p>
          <p className="text-xs opacity-90 font-mono">CNPJ: 30.533.905/0001-98</p>
          <div className="mt-1 pt-1 border-t border-orange-400 border-opacity-30">
            <p className="text-[10px] opacity-80 italic">Desenvolvido por: Emerson Mota Ramos</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
