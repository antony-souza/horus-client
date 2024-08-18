'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import { pathNavigator } from '@/app/pages/redirect/pathRole';

interface DecodedToken {
    id: string;
    role: string;
    companyId: string;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setfailMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3003/auth', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Falha na auth!');
            }
            
            localStorage.setItem('token', data.token); 

            //Decodificar o token para extrair as informações necessárias, tipo id,companyid,role
            const decoded: DecodedToken = jwtDecode(data.token);

            console.log('Token decodificado:', decoded);

            switch (decoded.role) {
                case "ADMIN":
                    router.push(pathNavigator.admin());
                    break;
                case "MANAGER":
                    router.push(pathNavigator.manager());
                    break;
                default:
                    console.error('Role não reconhecida:', decoded.role);
                    break;
            }
            setSuccessMessage('Login feito com sucesso!');
            setTimeout(() => setSuccessMessage(''), 10000); 
        } catch (error) {
            console.error('Erro ao fazer auth:', error);

            setfailMessage
            ('Falha ao fazer login. Tente Novamente! Se a falha continuar entre em contato com o suporte!');
            setTimeout(() => setfailMessage(''), 10000);
        }
    };

    return (
        <main className="min-h-screen flex items-start justify-center">
            <form 
                onSubmit={handleSubmit} 
                className=" bg-slate-600 p-8 rounded-lg shadow-md w-96 z-10 mt-44"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-white" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Digite seu email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="password">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Digite sua senha"
                    />
                </div>
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-700 transition duration-200"
                    >
                        Entrar
                    </button>
            </form>

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

        </main>
    );
}
