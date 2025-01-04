import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://deisishop.pythonanywhere.com/');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao carregar produtos' }, { status: 500 });
  }
}
