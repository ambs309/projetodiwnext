'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import Card from '@/components/Card/card';
import SearchBar from '@/components/SearchBar/searchbar';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CartItem extends Product {
  quantity: number;
}

export default function Produtos() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  const addItemToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const buy = () => {
    fetch('/api/deisishop/buy', {
      method: 'POST',
      body: JSON.stringify({
        products: cart.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
        name: 'Nome do Cliente', // Substitua pelo nome real
        student: false,
        coupon: '', // Caso tenha cupons
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        console.log('Compra realizada com sucesso:', response);
        setCart([]); // Limpa o carrinho
      })
      .catch((error) => {
        console.error('Erro ao realizar a compra:', error);
      });
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
      {/* Barra de Pesquisa */}
      <SearchBar onSearch={(query) => setSearch(query)} />

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredData.map((produto) => (
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
            <p className="font-semibold">
              Custo total: {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {cart.map((item) => (
                <div key={item.id} className="p-4 border rounded shadow">
                  <h3 className="font-bold">{item.title}</h3>
                  <p>
                    {item.price.toFixed(2)} € x {item.quantity} ={' '}
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Remover 1 Unidade
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={buy}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
