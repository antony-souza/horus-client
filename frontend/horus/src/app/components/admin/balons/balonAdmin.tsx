'use client'

import { useState } from 'react';
import {SearchProduct } from '../../optionsBalons/searchProduct';
import { RegisterProduct } from '../../optionsBalons/registerProduct';

type BalloonOption = 'search' | 'registerProduct' | 'edit' | 'manage' | 'report' | 'charts';

export function BalonOptionAdmin() {

  const [selectedOption, setSelectedOption] = useState<BalloonOption | null>(null);

  const BallonClick = (option: BalloonOption) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center pt-32 pb-10">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Primeira linha */}
        <div
          onClick={() => BallonClick('search')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="font-bold">Consultar Estoque</span>
        </div>
        <div
          onClick={() => BallonClick('registerProduct')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="font-bold">Registrar Produto</span>
        </div>
        <div
          onClick={() => BallonClick('edit')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">edit</span>
          <span className="font-bold">Editar Produto</span>
        </div>
        {/* Segunda linha */}
        <div
          onClick={() => BallonClick('manage')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gerenciar Usuários</span>
        </div>
        <div
          onClick={() => BallonClick('report')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gerar Relatórios</span>
        </div>
        <div
          onClick={() => BallonClick('charts')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gráficos</span>
        </div>
      </div>
      <div className="mt-10">
        {selectedOption === 'search' && <SearchProduct />}
        {selectedOption === 'registerProduct' && <RegisterProduct />}
      </div>
    </div>
  );
}
