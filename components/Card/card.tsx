import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/models/interfaces';

interface CardProps extends Product {
  addItemToCart: (product: Product) => void;
}

export default function Card({ id, title, price, category, description, image, rating, addItemToCart }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition duration-300">
      <div className="relative h-56">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <p className="text-gray-800 font-semibold mt-2">{price.toFixed(2)} €</p>
        <div className="text-yellow-500 mt-2">
          {rating.rate} ⭐ ({rating.count} avaliações)
        </div>
      </div>
      <div className="p-4">
        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          onClick={() => addItemToCart({ id, title, price, category, description, image, rating })}
        >
          + Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
