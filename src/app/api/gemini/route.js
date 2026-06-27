import { askGemini } from '@/utils/gemini';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Falta el prompt" }, { status: 400 });
    }

    // Usamos la función general
    const text = await askGemini(prompt);

    return NextResponse.json({ text });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}