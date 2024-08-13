'use client'

import { useState } from "react";

export function RegisterProduct() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [packaging, setPackaging] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            name: name,
            quantity: Number(quantity),
            packaging: packaging,
            expirationDate: expirationDate + "T00:00:00.000Z"
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3003/product/create', {
                method: "POST",
                mode: "cors",
                headers: { 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            
            setName('');
            setQuantity('');
            setPackaging('');
            setExpirationDate('');

            // Mostrar mensagem de sucesso
            setSuccessMessage('Produto criado com sucesso!');
            setTimeout(() => setSuccessMessage(''), 10000); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="relative">
            <form className="mt-10 p-4 border rounded shadow-lg bg-white" onSubmit={Submit}>
                <div className="flex gap-2 justify-center">
                    <span className="material-symbols-outlined">add</span>
                    <h2 className="text-xl font-bold mb-4">Registrar Produto</h2>
                </div>
                <label htmlFor="product-name">Nome do Produto:</label>
                <input
                    id="product-name"
                    type="text"
                    placeholder="Nome do produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded w-full mb-4"
                />
                <label htmlFor="product-quantity">Quantidade:</label>
                <input
                    id="product-quantity"
                    type="number"
                    placeholder="Quantidade"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="p-2 border rounded w-full mb-4"
                />
                <label htmlFor="product-packaging">Tipo(Pacote/Fardo):</label>
                <select
                    id="product-packaging"
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="p-2 border rounded w-full mb-4"
                >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="pacote">Pacote</option>
                    <option value="fardo">Fardo</option>
                </select>
                <label htmlFor="product-expiration">Validade:</label>
                <input
                    id="product-expiration"
                    type="date"
                    placeholder="Data de validade"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="p-2 border rounded w-full mb-4"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
                >
                    Registrar
                </button>
            </form>

            {successMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
                    {successMessage}
                </div>
            )}
        </div>
    );
}
