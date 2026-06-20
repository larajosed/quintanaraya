"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ComingSoon from '../components/ComingSoon';

export default function Home() {
  // El estado global del idioma ('es' o 'en')
  const [lang, setLang] = useState('es');

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      {/* El Navbar recibe setLang para poder CAMBIAR el idioma */}
      <Navbar lang={lang} setLang={setLang} />
      
      {/* ComingSoon (y los futuros componentes) solo reciben lang para LEER el idioma */}
      <ComingSoon lang={lang} />
    </main>
  );
}