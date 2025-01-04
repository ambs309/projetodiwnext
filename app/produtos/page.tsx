'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '@/app/models/interfaces';
import Card from "@/components/Card/card";
import SearchBar from '@/components/SearchBar/searchbar';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Produtos() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [search, data]);

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
          <Card key={produto.id} {...produto} />
        ))}
      </div>
    </div>
  );
}

