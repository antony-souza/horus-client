'use client'

import { useState } from 'react';
import { SearchProduct } from '../../service/searchProduct';
import { RegisterProduct } from '../../service/registerProduct';

type CardOptions = 'search' | 'registerProduct' | 'newValueProduct' | 'reports' | 'charts' | 'manageUsers';

export function CardAdmin() {

  const [selectedOption, setSelectedOption] = useState<CardOptions | null>(null);

  const CardClick = (option: CardOptions) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center pt-32 pb-10">
      <div className="flex flex-wrap justify-center gap-4">

        <div
          onClick={() => CardClick('search')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="font-bold">Consultar Estoque</span>
        </div>

        <div
          onClick={() => CardClick('registerProduct')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="font-bold">Registrar Produto</span>
        </div>

        <div
          onClick={() => CardClick('newValueProduct')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-bold">Enviar Lote</span>
        </div>

        <div
          onClick={() => CardClick('reports')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gerar Relatórios</span>
        </div>

        <div
          onClick={() => CardClick('charts')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gráficos</span>
        </div>

        <div
          onClick={() => CardClick('manageUsers')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gerenciar Empresas</span>
        </div>
        
      </div>
      <div className="mt-10">
        {selectedOption === 'search' && <SearchProduct />}
        {selectedOption === 'registerProduct' && <RegisterProduct />}
        {selectedOption === 'newValueProduct' && <RegisterProduct />}
      </div>
    </div>
  );
}
