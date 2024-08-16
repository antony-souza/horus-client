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

    //Converte(object.values()) o valor do input em array com todas as informações e verifica todos(every()) os valores se
    //estão vazios
    const SearchEmpty = Object.values(searchParams).every((value) => !value.trim());
    
    if (SearchEmpty) {
      setFailMessage('Por favor, preencha pelo menos um campo de busca.');
      setTimeout(() => setFailMessage(''), 10000);
      return; // Vai parar a requisição se não passar nada nos inputs
    }

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

      setFailMessage(
        data.products.length === 0 ||data.products.length === ''
          ?data.message|| 'Nenhum Produto Encontrado!'
          :setSuccessMessage('Produtos Encontrados!')
      )

      setTimeout(() => setFailMessage(''), 10000);
      setTimeout(() => setSuccessMessage(''), 10000);


    } catch (error) {
      console.error('Error:', error);
      setFailMessage('Provavelmente precisa fazer login novamente!');
      setTimeout(() => setFailMessage(''), 10000);
    }
  };

  return (
    <form className="mt-10 p-4 border mx-auto rounded shadow-lg bg-white" onSubmit={handleSearch}>
      <div className="flex gap-2 items-center mb-5 pb-2 justify-center">
        <span className="material-symbols-outlined">search</span>
        <h2 className="text-xl font-bold">Buscar Produto</h2>
      </div>

      <label>Nome:</label>
      <input
        type="text"
        name="name"
        placeholder="Nome do Produto"
        value={searchParams.name}
        onChange={handleInputChange}
        className="p-2 border rounded w-full mb-4"
      />
      
      <label>Validade:</label>
      <input
        type="date"
        name="expirationDate"
        placeholder="Data de Validade"
        value={searchParams.expirationDate}
        onChange={handleInputChange}
        className="p-2 border rounded w-full mb-4"
      />

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
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="p-2 text-left">Nome</th>
          <th className="p-2 text-left">Quantidade</th>
          <th className="p-2 text-left">Embalagem</th>
          <th className="p-2 text-left">Validade</th>
          <th className="p-2 text-left">Funcionário</th>
          <th className="p-2 text-left">Empresa</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product, index) => (
          <tr key={index}>
            <td className="p-2">{product.name}</td>
            <td className="p-2">{product.quantity}</td>
            <td className="p-2">{product.packaging}</td>
            <td className="p-2">{new Date(product.expirationDate).toLocaleDateString()}</td>
            <td className="p-2">{product.user}</td>
            <td className="p-2">{product.company}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </form>
  );
}
