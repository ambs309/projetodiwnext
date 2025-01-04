'use client';

import React from 'react';
import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import Card from "@/components/Card/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Produtos() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data.map((produto) => (
        <Card key={produto.id} {...produto} />
      ))}
    </div>
  );
}
