"use client";
import '../css/globals.css'; 
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ComingSoon from '../components/ComingSoon';
import EclipseEffect from '../components/EclipseEffect';
import Footer from '../components/Footer';
import InfoQuitanaraya from '../components/InfoQuitanaraya';
import { astroPhotos } from '../data/GalleryData';
import Gallery from '../components/Gallery';

export default function Home() {
  // El estado global del idioma ('es' o 'en')
  const [lang, setLang] = useState('es');

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
      {/* El Navbar recibe setLang para poder CAMBIAR el idioma */}
      <Navbar lang={lang} setLang={setLang} />
     
      {/* ComingSoon (y los futuros componentes) solo reciben lang para LEER el idioma */}
      <ComingSoon lang={lang} />
       <EclipseEffect lang={lang} />
       <Gallery photos={astroPhotos} />
      <InfoQuitanaraya lang={lang} />
       <Footer lang={lang} />
    </main>
  );
}