"use client";
import React, { useState, useEffect } from 'react';
import '../css/ComingSoon.css';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    // Fecha objetivo: Eclipse del 12 de Agosto de 2026
    const targetDate = new Date('August 12, 2026 20:28:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d < 10 ? '0' + d : String(d),
        hours: h < 10 ? '0' + h : String(h),
        minutes: m < 10 ? '0' + m : String(m),
        seconds: s < 10 ? '0' + s : String(s)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Función para procesar el envío de datos directamente a Google Sheets
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // REEMPLAZA ESTA URL CON TU ENLACE GENERADO EN GOOGLE APPS SCRIPT
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycby-pe0x5KdhT6fi67ctjA-KCD_SO1T_hV8yZ8-qYmqCMY3kWeoyb93XO1E-rMdX91x4/exec";

    fetch(googleScriptUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Evita restricciones CORS al enviar de forma estática
    })
    .then(() => {
      alert("¡Astro-Pass Generado con éxito! Ya estás registrado.");
      form.reset(); // Limpia los inputs del formulario automáticamente
    })
    .catch(error => console.error('Error al registrar los datos:', error));
  };

  return (
    <div className="coming-soon-container">
      {/* Efecto de resplandor del eclipse en el fondo */}
      <div className="bg-glow"></div>

      {/* HEADER */}
      <header className="coming-header">
        <div className="logo-area">
          <div className="radar-icon">
            <div className="radar-center"></div>
          </div>
          <div>
            <span className="logo-title">QUINTANARAYA</span>
            <span className="logo-subtitle">ECLIPSE</span>
          </div>
        </div>
        <div className="lang-selector">
          <span className="lang-active">ES</span>
          <span className="lang-divider">|</span>
          <span className="lang-inactive">EN</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="coming-main">
        
        {/* COLUMNA IZQUIERDA: Info e hilos del evento */}
        <div className="info-column">
          <div className="badge">
            <span className="badge-pulse"></span>
            Eclipse • 12 Agosto 2026
          </div>
          
          <div className="text-group">
            <h1 className="main-title">
              El epicentro de la <br />
              <span className="gradient-text">oscuridad total</span>
            </h1>
            <p className="description">
              Estamos diseñando el portal interactivo de observación definitivo. Prepárate para vivir los 2 minutos y 10 segundos de ocultación absoluta en uno de los enclaves más limpios de Europa.
            </p>
          </div>

          {/* CUENTA ATRÁS */}
          <div className="countdown-section">
            <span className="countdown-label">Tiempo restante para la totalidad</span>
            <div className="countdown-grid">
              <div className="time-box">
                <span className="time-number">{timeLeft.days}</span>
                <span className="time-label">Días</span>
              </div>
              <div className="time-box">
                <span className="time-number">{timeLeft.hours}</span>
                <span className="time-label">Horas</span>
              </div>
              <div className="time-box">
                <span className="time-number">{timeLeft.minutes}</span>
                <span className="time-label">Minutos</span>
              </div>
              <div className="time-box">
                <span className="time-number">{timeLeft.seconds}</span>
                <span className="time-label">Segundos</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario de Registro */}
        <div className="form-column">
          <div className="form-header">
            <div className="form-indicator"></div>
            <h2 className="form-title">Registro y Gestión de Aforo</h2>
          </div>
          <p className="form-description">
            Inscríbete de forma gratuita para reservar tu espacio. El control de aforo garantiza espacio suficiente para telescopios y equipos fotográficos.
          </p>

        <form onSubmit={handleSubmit} className="registration-form">
  
  <div className="input-group-row">
    <div className="input-group">
      <label htmlFor="name">Nombre *</label>
      <input type="text" id="name" name="name" required placeholder="e.g. Sandra" />
    </div>
    <div className="input-group">
      <label htmlFor="lastname">Apellido *</label>
      <input type="text" id="lastname" name="lastname" required placeholder="e.g. Silva" />
    </div>
  </div>

  <div className="input-group">
    <label htmlFor="phone">Número de Teléfono *</label>
    <input type="tel" id="phone" name="phone" required placeholder="e.g. +34 600 000 000" />
  </div>

  <div className="input-group">
    <label htmlFor="email">Email de Contacto *</label>
    <input type="email" id="email" name="email" required placeholder="sandra@ejemplo.com" />
  </div>

  <div className="input-group">
    <label htmlFor="origin">¿De dónde vienes? (Ciudad / País) *</label>
    <input type="text" id="origin" name="origin" required placeholder="e.g. Madrid, España" />
  </div>

  <div className="input-group-row">
    <div className="input-group">
      <label htmlFor="guests">Nº de Personas *</label>
      <input type="number" id="guests" name="guests" min="1" required placeholder="1" />
    </div>
    <div className="input-group">
      <label htmlFor="vehicles">Nº de Vehículos *</label>
      <input type="number" id="vehicles" name="vehicles" min="0" required placeholder="1" />
    </div>
  </div>

  <button type="submit" className="submit-btn">
    Generar Astro-Pass Personalizado
  </button>
</form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="coming-footer">
        <p>Asociación de Amigos de la Astronomía • Proyecto Científico de Divulgación • 2026</p>
        <p className="coords">COORDENADAS EXACTAS: LATITUD: 41.79° N • LONGITUD: 3.34° W • ALTITUD OFICIAL: 948 M</p>
      </footer>
    </div>
  );
}