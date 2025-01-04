import React from 'react';
import styles from './Card.module.css';
import { Product } from '@/app/models/interfaces';

interface CardProps extends Product {
  addToCart: (product: { id: number; title: string; price: number; image: string }) => void;
}

export default function Card({ id, title, price, description, image, rating, addToCart }: CardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <article className={styles.image}>
        <img src={image} alt={title} />
      </article>
      <article className={styles.product}>
        <p className={styles.price}>{price.toFixed(2)} €</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.rating}>
          {rating.rate} ⭐ ({rating.count} avaliações)
        </p>
        <button onClick={() => addToCart({ id, title, price, image })}>
          + Adicionar ao Cesto
        </button>
      </article>
    </div>
  );
}
