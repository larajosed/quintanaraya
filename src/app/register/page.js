"use client"; // Asegúrate de que esto sea un Client Component
import React, { useState } from 'react'; // Importa useState
import ComingSoon from '@/components/ComingSoon';
import EclipseEffect from '@/components/EclipseEffect';
import InfoQuitanarraya from '@/components/InfoQuitanarraya';
import Navbar from '@/components/Navbar';

export default function PaginaRegistro() {
  // 1. Define el estado aquí
  const [lang, setLang] = useState('es'); 

  return (
    <main> 
      {/* 2. Pásale el estado y la función al Navbar */}
      <Navbar lang={lang} setLang={setLang} /> 
      
      {/* 3. Pásale el estado al resto de componentes  <EclipseEffect lang={lang} />*/}
      <ComingSoon lang={lang} />    
      <InfoQuitanarraya lang={lang} /> 
    </main>
  );
}