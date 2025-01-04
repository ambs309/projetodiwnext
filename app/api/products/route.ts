import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://deisishop.pythonanywhere.com/products/');
    const data = await response.json();

    // Verificar se `data` já é um array ou se precisa ser extraído
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Dados inválidos da API' }, { status: 500 });
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json({ error: 'Erro ao carregar produtos' }, { status: 500 });
  }
}

