"use client";
import React, { useState, useEffect } from 'react';
import '../css/ComingSoon.css';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-08-12T20:28:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coming-soon-container">
      <main className="coming-main">
        <div className="info-column">
          <h1 className="main-title gradient-text">Eclipse Total Quintanarraya</h1>
          <p className="description">
            Con el fin de gestionar lo mejor posible el acceso y la gestión de los asistentes a la zona de observación del eclipse, necesitamos que te registres tú y los que vengan contigo a Quintanarraya.
            Sin inscripción no habrá acceso a la zona de observación, parking y zona de acampada.
            Una vez realices la inscripción recibirás un mail con los datos enviados e información del día 12 de Agosto en Quintanarraya.
          </p>
          <div className="countdown-section">
            <div className="countdown-grid">
              <div className="time-box"><div className="time-number">{timeLeft.days}</div><div className="time-label">DÍAS</div></div>
              <div className="time-box"><div className="time-number">{timeLeft.hours}</div><div className="time-label">HORAS</div></div>
              <div className="time-box"><div className="time-number">{timeLeft.minutes}</div><div className="time-label">MINUTOS</div></div>
              <div className="time-box"><div className="time-number">{timeLeft.seconds}</div><div className="time-label">SEGUNDOS</div></div>
            </div>
          </div>
        </div>

        <div className="form-column registration-closed-column">
          <div className="form-title center-title">
            <span>¡Aforo Completado!</span>
          </div>
          <p className="description closed-description">Muchas gracias por el interés mostrado. Se ha alcanzado el límite máximo de aforo previsto y ya no se admiten más inscripciones.
          </p>
        </div>
      </main>
    </div>
  );
}