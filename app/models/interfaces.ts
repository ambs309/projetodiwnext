export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    addToCart: (product: { id: number; title: string; price: number; image: string }) => void;
  }
  
  export interface Tecnologias {
    title: string;
    image: string;
    description: string;
    rating: number;
  }
