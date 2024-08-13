"use client"

import { pathNavigator } from "@/app/pages/redirect/pathRole";
import { useRouter } from "next/navigation";

export default function HeaderHome() {
    const router = useRouter();
    
    const logout = ()=>{
        localStorage.removeItem('token');
        router.push(pathNavigator.login())
    }

    return (
      <div className="w-full fixed top-0 left-0 z-50 shadow-md">
        <div className="flex justify-between bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 items-center">
            <div 
                className="flex cursor-pointer text-white pl-8"
                onClick={logout}
            >
              <span className="material-symbols-outlined">logout</span>
              <h1>Sair</h1>
            </div>
            <img
            src="/horus.png"
            alt="Your Image"
            className="w-24 h-24 object-cover"
          />
            <div className="flex cursor-pointer text-white pr-8">
              <span className="material-symbols-outlined">account_box</span>
              <h1>Perfil</h1>
            </div>
        </div>
      </div>
    );
  }
  