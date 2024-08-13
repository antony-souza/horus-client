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

            // Decodificar o token para extrair as informações necessárias
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

        } catch (error) {
            console.error('Erro ao fazer auth:', error);
        }
    };

    return (
        <main className="min-h-screen flex items-start justify-center bg-gray-300">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-lg shadow-md w-96 z-10 mt-44"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
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
        </main>
    );
}
