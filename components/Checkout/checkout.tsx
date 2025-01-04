'use client';

import React, { useState } from 'react';

export default function Checkout() {
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [isStudent, setIsStudent] = useState(false);

  const handleCheckout = async () => {
    const cartItems = JSON.parse(localStorage.getItem('produtos-selecionados') || '[]');
    const products = cartItems.map((item: any) => item.id);

    const body = { products, coupon, address, student: isStudent };

    const response = await fetch('/api/deisishop/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Compra realizada:', data);
      localStorage.setItem('produtos-selecionados', JSON.stringify([]));
    } else {
      console.error('Erro ao finalizar a compra');
    }
  };

  return (
    <div className="checkout">
      <h2>Finalizar Compra</h2>
      <input
        type="text"
        placeholder="Digite sua morada"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Cupão de desconto"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="input"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
          Estudante
        </label>
      </div>
      <button onClick={handleCheckout} className="checkout-button">
        Comprar
      </button>
    </div>
  );
}
