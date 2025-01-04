'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/app/models/interfaces';

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('produtos-selecionados');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('produtos-selecionados', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart">
      <h2>Meu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.title}</h3>
            <p>Preço: {item.price.toFixed(2)} €</p>
            <button onClick={() => removeFromCart(item.id)} className="remove-button">
              Remover
            </button>
          </div>
        ))
      )}
    </div>
  );
}
