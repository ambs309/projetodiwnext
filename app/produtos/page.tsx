'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import Card from '@/components/Card/card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Produtos() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  const [cart, setCart] = useState<Product[]>([]);

  // Função para adicionar itens ao carrinho
  const addItemToCart = (product: Product) => {
    setCart((prevCart) => {
      // Verificar se o produto já está no carrinho
      if (prevCart.some((item) => item.id === product.id)) {
        return prevCart; // Se já existir, não adiciona novamente
      }
      return [...prevCart, product];
    });
  };

  // Função para remover itens do carrinho
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar os produtos.</div>;
  }

  if (!data || !Array.isArray(data)) {
    return <div>Ocorreu um erro: dados inválidos.</div>;
  }

  return (
    <div>
      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.map((produto) => (
          <Card key={produto.id} {...produto} addItemToCart={addItemToCart} />
        ))}
      </div>

      {/* Carrinho */}
      <div className="mt-8 p-4 border-t">
        <h2 className="text-xl font-bold">Produtos Selecionados</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Nenhum produto selecionado.</p>
        ) : (
          <div>
            <p className="font-semibold">Custo total: {cart.reduce((total, item) => total + item.price, 0).toFixed(2)} €</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {cart.map((item) => (
                <div key={item.id} className="p-4 border rounded shadow">
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.price.toFixed(2)} €</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Remover do Carrinho
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
