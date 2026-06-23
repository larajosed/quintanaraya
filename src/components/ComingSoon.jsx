"use client";
import React, { useState, useEffect } from 'react';
import '../css/ComingSoon.css';

import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';

export default function ComingSoon({ lang }) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [showSuccess, setShowSuccess] = useState(false);
  const t = lang === 'en' ? en : es;

  useEffect(() => {
    const targetDate = new Date('August 12, 2026 20:28:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference < 0) return;
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
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxfO00dw4Koc61_p6EITFOYL7-XnHci5gAeKToatsPmvFs3vLVbERBEYOrxW1gi2rzX/exec";

    fetch(googleScriptUrl, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(() => {
        setShowSuccess(true);
        form.reset();
        setTimeout(() => setShowSuccess(false), 4000);
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <div className="coming-soon-container">
      <div className="bg-glow"></div>
      <main className="coming-main">
        <div className="info-column">
          <div className="badge"><span className="badge-pulse"></span>{t.meta.badge}</div>
          <div className="text-group">
            <h1 className="main-title">{t.info.title1} <br /><span className="gradient-text">{t.info.titleGlow}</span></h1>
            <p className="description">{t.info.description}</p>
          </div>
          <div className="countdown-section">
            <div className="countdown-grid">
              <div className="time-box"><span className="time-number">{timeLeft.days}</span><span className="time-label">{t.info.days}</span></div>
              <div className="time-box"><span className="time-number">{timeLeft.hours}</span><span className="time-label">{t.info.hours}</span></div>
              <div className="time-box"><span className="time-number">{timeLeft.minutes}</span><span className="time-label">{t.info.minutes}</span></div>
              <div className="time-box"><span className="time-number">{timeLeft.seconds}</span><span className="time-label">{t.info.seconds}</span></div>
            </div>
          </div>
          <div className="eclipse-info-box">
            <h4>Eclipse Total en Quintanarraya</h4>
            <p>La totalidad comienza a las <strong>20:28</strong>. Se recomienda buscar un horizonte despejado hacia el oeste.</p>
          </div>
        </div>

        <div className="form-column">
          <h2 className="form-title">{t.form.title}</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-group-row">
              <div className="input-group"><label>Nombre</label><input type="text" name="name" required /></div>
              <div className="input-group"><label>Apellidos</label><input type="text" name="lastname" required /></div>
            </div>
            <div className="input-group-row">
              <div className="input-group"><label>Edad</label><input type="number" name="age" required /></div>
              <div className="input-group"><label>Teléfono</label><input type="tel" name="phone" required /></div>
            </div>
            <div className="input-group-row">
              <div className="input-group"><label>¿De dónde viene?</label><input type="text" name="origin" required /></div>
              <div className="input-group"><label>¿Dónde se aloja?</label><input type="text" name="lodging" required /></div>
            </div>
            <div className="input-group"><label>Email</label><input type="email" name="email" required /></div>
            <div className="input-group"><label>Número de acompañantes</label><input type="number" name="numGuests" min="0" /></div>
            <div className="input-group"><label>Nombres de los acompañantes</label><textarea name="guestsNames" rows="2"></textarea></div>
            <div className="checkbox-group">
              <label><input type="checkbox" name="parking" /> Parking</label>
              <label><input type="checkbox" name="camping" /> Acampada</label>
              <label><input type="checkbox" name="equipment" /> Equipo astronómico</label>
            </div>
            <div className="input-group"><label>Detalles del equipo</label><textarea name="equipmentDetails" rows="2"></textarea></div>
            <button type="submit" className="submit-btn">{t.form.button}</button>
          </form>
        </div>
      </main>
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal">
            <div className="toast-icon">✓</div>
            <h3>¡Solicitud enviada!</h3>
            <p>{t.meta.alertSuccess}</p>
          </div>
        </div>
      )}
    </div>
  );
}