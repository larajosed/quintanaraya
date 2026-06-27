import { GoogleGenAI } from '@google/genai';

// Inicializamos el cliente una sola vez para todo el proyecto
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

/**
 * Función global para generar texto con Gemini 2.5 Flash
 * @param {string} prompt - Las instrucciones para la IA
 */
export async function askGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error en el servicio global de Gemini:", error);
    throw new Error("No se pudo obtener respuesta de la IA");
  }
}