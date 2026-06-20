"use client";
import React from 'react';
import '../css/Navbar.css';

import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';

export default function Navbar({ lang, setLang }) {
  // Detecta el diccionario correcto según el estado 'lang'
  const t = lang === 'en' ? en : es;

  return (
    <nav className="cosmic-navbar">
      {/* LOGO */}
      <div className="nav-logo-group">
        <div className="nav-radar-circle">
          <div className="nav-radar-dot"></div>
        </div>
        <div className="nav-logo-text">
          <span className="nav-logo-main">QUINTANARRAYA</span>
          <span className="nav-logo-sub">ECLIPSE</span>
        </div>
      </div>

      {/* ENLACES CENTRALES */}
      <ul className="nav-links-list">
        <li>
          <span className="nav-link-item link-active">
            {t.navbar?.nav?.inicio || 'INICIO'}
          </span>
        </li>
        {['zonas', 'galeria', 'porque', 'astropass'].map((key) => {
          const fallbacks = {
            zonas: 'ZONAS DE OBSERVACIÓN',
            galeria: 'GALERÍA CÓSMICA',
            porque: 'POR QUÉ QUINTANARRAYA',
            astropass: 'ASTRO-PASS'
          };
          return (
            <li key={key}>
              <span className="nav-link-item">
                {t.navbar?.nav?.[key] || fallbacks[key]}
              </span>
            </li>
          );
        })}
      </ul>

      {/* BOTONES DE IDIOMA CON LLAMADA A SETLANG */}
      <div className="nav-lang-box">
        <button 
          onClick={() => setLang('es')}
          className={`nav-lang-btn ${lang === 'es' ? 'btn-active' : 'btn-inactive'}`}
        >
          ES
        </button>
        <span className="nav-lang-divider">|</span>
        <button 
          onClick={() => setLang('en')}
          className={`nav-lang-btn ${lang === 'en' ? 'btn-active' : 'btn-inactive'}`}
        >
          EN
        </button>
      </div>
    </nav>
  );
}