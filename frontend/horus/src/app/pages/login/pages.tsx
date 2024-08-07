import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3002/auth', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Falha na auth!');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);
            console.log('Login feito!', data);
        } catch (error) {
            console.error('Error ao fazer auth:', error);
        }
    };

    return (
        <main className="min-h-screen flex items-start justify-center bg-gray-300 relative">
            <div className="flex-grow flex items-center justify-center">
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white p-8 rounded-lg shadow-md w-96 z-10 mt-56"
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
                    <div className='flex flex-col gap-3'>
                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-700 transition duration-200"
                    >
                        Entrar
                    </button>
                    <button className='text-gray-400 cursor-pointer'>Esqueci email ou senha</button>
                    </div>
                   
                </form>
            </div>
        </main>
    );
}