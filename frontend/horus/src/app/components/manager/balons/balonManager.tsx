export function BalonOptionManager() {
    return (
      <div className="flex justify-center pt-32 pb-10"> {/* Ajuste o padding-top para compensar o header fixo */}
        <div className="flex flex-col items-center space-y-4 text-xl">
          <div className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2">
            <span className="material-symbols-outlined">search</span>
            <span className="font-bold">Consultar Estoque</span>
          </div>
          <div className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2">
            <span className="material-symbols-outlined">add</span>
            <span className="font-bold">Registrar Produto</span>
          </div>
          <div className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2">
            <span className="material-symbols-outlined">edit</span>
            <span className="font-bold">Editar Produto</span>
          </div>
          <div className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2">
            <span className="material-symbols-outlined">shield_person</span>
            <span className="font-bold">Gerenciar Funcionários</span>
          </div>
          <div className="w-72 h-40 bg-cyan-500 rounded flex items-center justify-center shadow-lg text-white space-x-2">
            <span className="material-symbols-outlined">shield_person</span>
            <span className="font-bold">Relatórios</span>
          </div>
        </div>
      </div>
    );
  }
  