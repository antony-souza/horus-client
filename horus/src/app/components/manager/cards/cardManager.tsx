'use client'

import { useState } from 'react';
import { RegisterProduct } from '../../service/product/registerProduct';
import { SearchForProductAsManager } from '../../service/product/searchProductManager';
import { RemoveBatchProducts } from '../../service/product/removeBatchProduct';

type CardOptions = 'search' | 'registerProduct' | 'SendBatchProducts' | 'RemoveBatchProducts' | 'charts' | 'manageEmployees';

export function CardManager() {

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
          onClick={() => CardClick('SendBatchProducts')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-bold">Enviar Lote</span>
        </div>

        <div
          onClick={() => CardClick('RemoveBatchProducts')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-bold">Retirar Mercadoria</span>
        </div>

        <div
          onClick={() => CardClick('charts')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Relatórios</span>
        </div>

        <div
          onClick={() => CardClick('manageEmployees')}
          className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">shield_person</span>
          <span className="font-bold">Gerenciar Funcionários</span>
        </div>

      </div>
      <div className="mt-10">
        {selectedOption === 'search' && <SearchForProductAsManager />}
        {selectedOption === 'registerProduct' && <RegisterProduct />}
        {selectedOption === 'RemoveBatchProducts' && <RemoveBatchProducts />}
      </div>
    </div>
  );
}
