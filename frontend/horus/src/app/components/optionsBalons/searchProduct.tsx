'use client';

import { useState } from 'react';

export function SearchProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
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

  
    const queryString = Object.entries(searchParams)//Converte o input em um array de pares de key=value
      .filter(([_, value]) => value) // Filtra inputs vazios
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) //Mapeia o key,value do input preenchido e converte em key=value
      //encodeURIComponent garante que os valores sejam passados corretamente para a url
      .join('&');//Faz a separação de filtros com o caractere

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3003/product/search?${queryString}`, {
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
      console.log('Success:', data);

      setProducts(data.products);
      setSuccessMessage('Produtos encontrados!');
      setTimeout(() => setSuccessMessage(''), 10000);

    } catch (error) {
      console.error('Error:', error);
      setFailMessage('Falha na consulta!');
      setTimeout(() => setFailMessage(''), 10000);
    }
  };

  return (
    <form className="mt-10 p-4 border mx-auto rounded shadow-lg bg-white" onSubmit={handleSearch}>
      <div className="flex gap-2 items-center mb-5 pb-2 justify-center">
        <span className="material-symbols-outlined">search</span>
        <h2 className="text-xl font-bold">Buscar Produto</h2>
      </div>

      <input
        type="text"
        name="name"
        placeholder="Nome do Produto"
        value={searchParams.name}
        onChange={handleInputChange}
        className="p-2 border rounded w-full mb-4"
      />

      <input
        type="date"
        name="expirationDate"
        placeholder="Data de Validade"
        value={searchParams.expirationDate}
        onChange={handleInputChange}
        className="p-2 border rounded w-full mb-4"
      />

      <input
        type="text"
        name="user"
        placeholder="Nome do Funcionário"
        value={searchParams.user}
        onChange={handleInputChange}
        className="p-2 border rounded w-full mb-4"
      />

      <input
        type="text"
        name="company"
        placeholder="Nome da Empresa"
        value={searchParams.company}
        onChange={handleInputChange}
        className="p-2 border rounded w-full mb-4"
      />

      <button
        className="w-30 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
      >
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

      {/* Mostra a tabela de produtos */}
      {products.length > 0 && (
        <div className="mt-4 p-4 border rounded bg-gray-100 overflow-x-auto">
          <h3 className="text-lg font-bold mb-4">Produtos Encontrados:</h3>
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2 text-left">Nome</th>
                <th className="border-b-2 p-2 text-left">Quantidade</th>
                <th className="border-b-2 p-2 text-left">Embalagem</th>
                <th className="border-b-2 p-2 text-left">Validade</th>
                <th className="border-b-2 p-2 text-left">Funcionário</th>
                <th className="border-b-2 p-2 text-left">Empresa</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{product.name}</td>
                  <td className="border-b p-2">{product.quantity}</td>
                  <td className="border-b p-2">{product.packaging}</td>
                  <td className="border-b p-2">{new Date(product.expirationDate).toLocaleDateString()}</td>
                  <td className="border-b p-2">{product.user}</td>
                  <td className="border-b p-2">{product.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </form>
  );
}
