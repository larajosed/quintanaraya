"use client";
import React from 'react';
import '../css/InfoQuitanarraya.css';

export default function InfoQuintanarraya({ lang }) {
  const data = {
    es: {
      geografia: {
        title: "POR QUÉ QUINTANARRAYA",
        cards: [
          { icon: "", title: "ALTITUD (948M)", desc: "Reducción de capas de atmósfera densa.", img: "/images/mountain.jpg" },
          { icon: "", title: "CIELO OSCURO", desc: "Cero contaminación lumínica.", img: "/images/sky.jpg" },
          { icon: "", title: "2M 10S TOTALIDAD", desc: "Sombra umbral estable y duradera.", img: "/images/eclipse.jpg" }
        ]
      },
      experiencia: {
        title: "NUESTRA PROPUESTA",
        servicios: [
          { icon: "", title: "Seguridad", desc: "Gafas homologadas gratuitas.", img: "/images/telescopio.jpg" },
          { icon: "", title: "Divulgación", desc: "Narración experta y recursos.", img: "/images/sky.jpg" },
          { icon: "", title: "Cultura", desc: "Actuaciones en directo.", img: "/images/Quintanarraya.jpg" },
          { icon: "", title: "Logística", desc: "Seguridad y ambulancia.", img: "/images/galaxia.jpg" }
        ]
      }
    }
  };

  const content = data[lang] || data['es'];

  return (
    <section className="obs-container">
      <div className="obs-inner">
        
        {/* Sección 1: Geografía */}
        <div className="obs-header">
          <h2 className="obs-title">{content.geografia.title}</h2>
        </div>
        <div className="obs-grid-geografia">
          {content.geografia.cards.map((card, i) => (
            <div 
              key={i} 
              className="obs-card" 
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div className="obs-icon">{card.icon}</div>
              <h3 className="obs-card-title">{card.title}</h3>
              <p className="obs-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Sección 2: Experiencia */}
        <div className="obs-header" style={{ marginTop: '40px' }}>
          <h2 className="obs-title">{content.experiencia.title}</h2>
        </div>
        <div className="obs-grid">
          {content.experiencia.servicios.map((s, i) => (
            <div 
              key={i} 
              className="obs-card" 
              style={{ backgroundImage: `url(${s.img})` }}
            >
              <div className="obs-icon">{s.icon}</div>
              <h3 className="obs-card-title">{s.title}</h3>
              <p className="obs-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}