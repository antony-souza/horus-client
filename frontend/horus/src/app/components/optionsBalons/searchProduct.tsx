'use client';

import { useState } from 'react';

export function SearchProduct() {
  const [name, setName] = useState('');
  const [products, setProducts] = useState<any[]>([]); 
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`http://localhost:3003/product/search?name=${encodeURIComponent(name)}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (!data || !data.products) {
        throw new Error('Resposta da API inválida');
      }
  
      if (data.products.length === 0) {
        setSuccessMessage('Nenhum produto encontrado.');
        setFailMessage('Nenhum produto encontrado!');
        setTimeout(() => setFailMessage(''), 10000);
      } else {
        setProducts(data.products); // Atualiza o estado com o array de produtos
        setSuccessMessage('Produtos encontrados!');
      }
      
      setTimeout(() => setSuccessMessage(''), 10000);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <form className="mt-10 p-6 border max-w-4xl mx-auto rounded-lg shadow-lg bg-white w-full" onSubmit={Submit}>
      <div className="flex gap-2 items-center mb-5 pb-2 justify-center">
        <span className="material-symbols-outlined">search</span>
        <h2 className="text-xl font-bold">Consultar Estoque</h2>
      </div>
      <label>Nome do Produto:</label>
      <input
        required
        type="text"
        placeholder="Digite sua busca..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
      >
        Consultar
      </button>

      {/* Exibe a mensagem de sucesso ou falha */}
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

      {/* Renderiza a tabela com rolagem horizontal */}
      {products.length > 0 ? (
        <div className="mt-6 p-4 border rounded bg-gray-100 overflow-x-auto">
          <h3 className="text-lg font-bold mb-4">Produtos Encontrados:</h3>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2 text-left">Nome</th>
                <th className="border-b-2 p-2 text-left">Quantidade</th>
                <th className="border-b-2 p-2 text-left">Embalagem</th>
                <th className="border-b-2 p-2 text-left">Validade</th>
                <th className="border-b-2 p-2 text-left">Funcionário</th>
                <th className="border-b-2 p-2 text-left">Empresa</th>
                {/* Adicione mais cabeçalhos conforme necessário */}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{product.name || 'N/A'}</td>
                  <td className="border-b p-2">{product.quantity || 'N/A'}</td>
                  <td className="border-b p-2">{product.packaging || 'N/A'}</td>
                  <td className="border-b p-2">{product.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="border-b p-2">{product.user || 'N/A'}</td>
                  <td className="border-b p-2">{product.company || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-center">Nenhum produto encontrado.</p>
      )}
    </form>
  );
}
