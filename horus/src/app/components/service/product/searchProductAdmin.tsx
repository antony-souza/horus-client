'use client';

import { useState } from 'react';
import moment from 'moment';

export function SearchForProductAsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    code: '',
    name: '',
    expirationDate: '',
    user: '',
    company: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const SearchEmpty = Object.values(searchParams).every((value) => !value.trim());
    
    if (SearchEmpty) {
      setFailMessage('Por favor, preencha pelo menos um campo de busca.');
      setTimeout(() => setFailMessage(''), 10000);
      return;
    }

    const queryString = Object.entries(searchParams)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3003/product/admin/search?${queryString}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da rede');
      }

      const data = await response.json();
      setProducts(data.products);

      setFailMessage(
        data.products.length === 0
          ? data.message || 'Nenhum Produto Encontrado!'
          : ''
      );

      setSuccessMessage(data.products.length > 0 ? 'Produtos Encontrados!' : '');

      setTimeout(() => setFailMessage(''), 10000);
      setTimeout(() => setSuccessMessage(''), 10000);
    } catch (error) {
      setFailMessage('Provavelmente precisa fazer login novamente!');
      setTimeout(() => setFailMessage(''), 10000);
    }
  };

  return (
    <div className=" max-w-5xl mx-auto p-6">
      <form className="mt-5 p-6 border rounded shadow-lg bg-white" onSubmit={handleSearch}>
        <div className="flex gap-2 items-center mb-5 pb-2 justify-center">
          <span className="material-symbols-outlined">search</span>
          <h2 className="text-xl font-bold">Buscar Produto</h2>
        </div>

        <label>Número do Produto:</label>
        <input
          type="number"
          name="code"
          placeholder="Número do Produto"
          value={searchParams.code}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
        />

        <label>Nome:</label>
        <input
          type="text"
          name="name"
          placeholder="Nome do Produto"
          value={searchParams.name}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
        />
        
        {/* <label>Validade:</label>
        <input
          type="date"
          name="expirationDate"
          placeholder="Data de Validade"
          value={searchParams.expirationDate}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
        /> */}

        <label>Funcionário:</label>
        <input
          type="text"
          name="user"
          placeholder="Nome do Funcionário"
          value={searchParams.user}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
        />
        
        <label>Empresa:</label>
        <input
          type="text"
          name="company"
          placeholder="Nome da Empresa"
          value={searchParams.company}
          onChange={handleInputChange}
          className="p-2 border rounded w-full mb-4"
        />

        <button className="w-30 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200">
          Buscar
        </button>

        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
            {successMessage}
          </div>
        )}
        {failMessage && (
          <div className="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded shadow-lg z-50">
            {failMessage}
          </div>
        )}
      </form>

      {products.length > 0 && (
        <div className="mt-8 p-6 border rounded bg-gray-100 overflow-x-auto">
          <h3 className="text-2xl font-bold mb-4">Produtos Encontrados:</h3>
          <table className="w-full text-lg divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Número</th>
                <th className="p-4 text-left whitespace-nowrap">Nome</th>
                <th className="p-4 text-left whitespace-nowrap">Quantidade</th>
                <th className="p-4 text-left whitespace-nowrap">Embalagem</th>
                <th className="p-4 text-left whitespace-nowrap">Validade</th>
                <th className="p-4 text-left whitespace-nowrap">Atualização</th>
                <th className="p-4 text-left whitespace-nowrap">Funcionário</th>
                <th className="p-4 text-left whitespace-nowrap">Empresa</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="p-4 whitespace-nowrap">{product.code}</td>
                  <td className="p-4 whitespace-nowrap">{product.name}</td>
                  <td className="p-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="p-4 whitespace-nowrap">{product.packaging}</td>
                  <td className="p-4 whitespace-nowrap">{moment.utc(product.expirationDate).format('DD-MM-YYYY')}</td>
                  <td className="p-4 whitespace-nowrap">{moment.utc(product.updatedAt).format('DD-MM-YYYY')}</td>
                  <td className="p-4 whitespace-nowrap">{product.user}</td>
                  <td className="p-4 whitespace-nowrap">{product.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
