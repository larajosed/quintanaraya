"use client";
import React, { useState, useEffect } from 'react';
import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';
import '../css/ComingSoon.css';

export default function ComingSoon({ lang }) {
  const t = (lang === 'en' ? en : es).coming_soon;
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
          <h1 className="main-title gradient-text">{t.title}</h1>
          <p className="description">
            {t.description}
          </p>
          <div className="countdown-section">
            <div className="countdown-grid">
              <div className="time-box">
                <div className="time-number">{timeLeft.days}</div>
                <div className="time-label">{t.days}</div>
              </div>
              <div className="time-box">
                <div className="time-number">{timeLeft.hours}</div>
                <div className="time-label">{t.hours}</div>
              </div>
              <div className="time-box">
                <div className="time-number">{timeLeft.minutes}</div>
                <div className="time-label">{t.minutes}</div>
              </div>
              <div className="time-box">
                <div className="time-number">{timeLeft.seconds}</div>
                <div className="time-label">{t.seconds}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-column registration-closed-column">
          <div className="form-title center-title">
            <span>{t.closed_title}</span>
          </div>
          <p className="description closed-description">
            {t.closed_description}
          </p>
        </div>
      </main>
    </div>
  );
}