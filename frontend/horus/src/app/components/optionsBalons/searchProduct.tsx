'use client'

export function SearchProduct() {
  return (
    <div className="mt-10 p-4 border rounded shadow-lg bg-white">
      <div className="flex gap-2 items-center mb-5 pb-2">
        <span className="material-symbols-outlined">search</span>
        <h2 className="text-xl font-bold">Consultar Estoque</h2>
      </div>
      <label>Nome do Produto:</label>
      <input
        type="text"
        placeholder="Digite sua busca..."
        className="p-2 border rounded w-full mb-4"
      />
      <button className="w-30 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200">
        Consultar
      </button>
    </div>
  );
}
