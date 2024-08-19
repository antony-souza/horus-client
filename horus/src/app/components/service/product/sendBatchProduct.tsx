'use client'

import { useState } from "react";

export function SendBatchProducts() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [packaging, setPackaging] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            name: name,
            quantity: Number(quantity),
            packaging: packaging,
            expirationDate: expirationDate + "T00:00:00.000Z"
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3003/product/sendbatch', {
                method: "PUT",
                mode: "cors",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Lote enviado com sucesso!');
                setFailMessage('');
                setName('');
                setQuantity('');
                setPackaging('');
                setExpirationDate('');
            } else {
                setFailMessage(data.message || 'Erro ao enviar o lote. Por favor, tente novamente.');
                setSuccessMessage('');
            }

            setTimeout(() => {
                setSuccessMessage('');
                setFailMessage('');
            }, 10000);

        } catch (error) {
            console.error('Error:', error);

            setFailMessage('Erro ao criar o lote. Por favor, tente novamente.');
            setSuccessMessage('');
            setTimeout(() => setFailMessage(''), 10000); 
        }
    };

    return (
        <>
            <div className="relative">
                <form className="mt-10 p-6 max-w-lg mx-auto border rounded shadow-lg bg-white" onSubmit={submit}>
                    <div className="flex gap-2 justify-center items-center mb-5">
                        <span className="material-symbols-outlined">local_shipping</span>
                        <h2 className="text-xl font-bold">Enviar Lote</h2>
                    </div>

                    <label htmlFor="product-name">Nome do Produto:</label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Nome do produto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full mb-4"
                        required
                    />
                    <label htmlFor="product-quantity">Quantidade:</label>
                    <input
                        id="product-quantity"
                        type="number"
                        placeholder="Quantidade"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="p-2 border rounded w-full mb-4" 
                        required
                    />
                    <label htmlFor="product-packaging">Tipo:</label>
                    <select
                        id="product-packaging"
                        value={packaging}
                        onChange={(e) => setPackaging(e.target.value)}
                        className="p-2 border rounded w-full mb-4"
                        required
                    >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="PACOTE">PACOTES</option>
                        <option value="KG">FARDOS</option>
                        <option value="CAIXAS">CAIXAS</option>
                        <option value="KG">KG</option>
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
                        className="w-30 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
                    >
                        Registrar
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
            </div>
        </>
    );
}
