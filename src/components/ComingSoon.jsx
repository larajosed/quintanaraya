"use client";
import React, { useState, useEffect } from 'react';
import '../css/ComingSoon.css';

// Importamos los dos diccionarios locales
import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';

export default function ComingSoon() {
  const [lang, setLang] = useState('es');
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  // Selección dinámica del diccionario basado en el estado
  const t = lang === 'es' ? es : en;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const googleScriptUrl = "https://script.google.com/macros/s/AKfycby-pe0x5KdhT6fi67ctjA-KCD_SO1T_hV8yZ8-qYmqCMY3kWeoyb93XO1E-rMdX91x4/exec";

    fetch(googleScriptUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
      alert(t.meta.alertSuccess); // Alerta traducida
      form.reset();
    })
    .catch(error => console.error(t.meta.alertError, error)); // Error traducido
  };

  return (
    <div className="coming-soon-container">
      <div className="bg-glow"></div>

      {/* HEADER CON SELECTOR INTERACTIVO */}
      <header className="coming-header">
        <div className="logo-area">
          <div className="radar-icon">
            <div className="radar-center"></div>
          </div>
          <div>
            <span className="logo-title">{t.header.title}</span>
            <span className="logo-subtitle">{t.header.subtitle}</span>
          </div>
        </div>
        <div className="lang-selector">
          <span 
            className={lang === 'es' ? 'lang-active' : 'lang-inactive'}
            onClick={() => setLang('es')}
            style={{ cursor: 'pointer' }}
          >
            ES
          </span>
          <span className="lang-divider">|</span>
          <span 
            className={lang === 'en' ? 'lang-active' : 'lang-inactive'}
            onClick={() => setLang('en')}
            style={{ cursor: 'pointer' }}
          >
            EN
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="coming-main">
        
        {/* COLUMNA IZQUIERDA: Info e hilos del evento */}
        <div className="info-column">
          <div className="badge">
            <span className="badge-pulse"></span>
            {t.meta.badge}
          </div>
          
          <div className="text-group">
            <h1 className="main-title">
              {t.info.title1} <br />
              <span className="gradient-text">{t.info.titleGlow}</span>
            </h1>
            <p className="description">{t.info.description}</p>
          </div>

          {/* CUENTA ATRÁS */}
          <div className="countdown-section">
            <span className="countdown-label">{t.info.countdownLabel}</span>
            <div className="countdown-grid">
              <div className="time-box">
                <span className="time-number">{timeLeft.days}</span>
                <span className="time-label">{t.info.days}</span>
              </div>
              <div className="time-box">
                <span className="time-number">{timeLeft.hours}</span>
                <span className="time-label">{t.info.hours}</span>
              </div>
              <div className="time-box">
                <span className="time-number">{timeLeft.minutes}</span>
                <span className="time-label">{t.info.minutes}</span>
              </div>
              <div className="time-box">
                <span className="time-number">{timeLeft.seconds}</span>
                <span className="time-label">{t.info.seconds}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario de Registro */}
        <div className="form-column">
          <div className="form-header">
            <div className="form-indicator"></div>
            <h2 className="form-title">{t.form.title}</h2>
          </div>
          <p className="form-description">{t.form.description}</p>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-group-row">
              <div className="input-group">
                <label htmlFor="name">{t.form.name}</label>
                <input type="text" id="name" name="name" required placeholder="e.g. Sandra" />
              </div>
              <div className="input-group">
                <label htmlFor="lastname">{t.form.lastname}</label>
                <input type="text" id="lastname" name="lastname" required placeholder="e.g. Silva" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phone">{t.form.phone}</label>
              <input type="tel" id="phone" name="phone" required placeholder="e.g. +34 600 000 000" />
            </div>

            <div className="input-group">
              <label htmlFor="email">{t.form.email}</label>
              <input type="email" id="email" name="email" required placeholder="sandra@ejemplo.com" />
            </div>

            <div className="input-group">
              <label htmlFor="origin">{t.form.origin}</label>
              <input type="text" id="origin" name="origin" required placeholder="e.g. Madrid, España" />
            </div>

            <div className="input-group-row">
              <div className="input-group">
                <label htmlFor="guests">{t.form.guests}</label>
                <input type="number" id="guests" name="guests" min="1" required placeholder="1" />
              </div>
              <div className="input-group">
                <label htmlFor="vehicles">{t.form.vehicles}</label>
                <input type="number" id="vehicles" name="vehicles" min="0" required placeholder="1" />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              {t.form.button}
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="coming-footer">
        <p>{t.footer.project}</p>
        <p className="coords">{t.footer.coords}</p>
      </footer>
    </div>
  );
}