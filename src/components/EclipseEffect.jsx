"use client";
import React, { useState } from 'react';
import '../css/EclipseEffect.css';

// Importamos diccionarios (asegúrate de que las rutas sean correctas)
import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';

export default function EclipseEffect({ lang }) {
  const t = lang === 'en' ? en : es;
  
  // Iniciamos en 100% para mostrar la totalidad dorada de inicio
  const [coverage, setCoverage] = useState(100); 

  // Ajustado para un sol de 110px
const moonOffset = ((100 - coverage) / 100) * -155;

  return (
    <section className="eclipse-section">
      <h2 className="eclipse-title">
        {lang === 'es' ? 'Simulador de Ocultación' : 'Totality Simulator'}
      </h2>

      <div className="eclipse-container">
        {/* El Sol estático de fondo */}
        <div className="sun-body"></div>

        {/* La Luna se desplaza según el estado */}
        <div 
          className="moon-body" 
          style={{ transform: `translateX(${moonOffset}px)` }}
        ></div>
      </div>

      <div className="eclipse-percentage">
        {lang === 'es' ? 'COBERTURA:' : 'DARKNESS:'} {coverage}% 
        {coverage === 100 && ' 🌑'}
      </div>

      <input 
        type="range" 
        className="eclipse-slider"
        min="0" 
        max="100" 
        value={coverage} 
        onChange={(e) => setCoverage(Number(e.target.value))}
      />
    </section>
  );
}