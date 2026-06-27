"use client";
import React, { useState, useEffect } from 'react';
import '../css/ComingSoon.css';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = useState(false);

  //const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfO00dw4Koc61_p6EITFOYL7-XnHci5gAeKToatsPmvFs3vLVbERBEYOrxW1gi2rzX/exec";
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
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
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch(GOOGLE_SCRIPT_URL, { 
        method: 'POST', 
        body: formData, 
        mode: 'no-cors' 
      });
      setShowModal(true);
      form.reset();
    } catch (error) {
      alert("Hubo un error al enviar.");
    }
  };

  return (
    <div className="coming-soon-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡INSCRIPCIÓN RECIBIDA!</h3>
            <p>Gracias por registrarte para el eclipse en Quintanarraya.</p>
            <button onClick={() => setShowModal(false)} className="submit-btn">CERRAR</button>
          </div>
        </div>
      )}

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

        <div className="form-column">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-group"><label>Nombre y Apellidos*</label><input type="text" name="name" required /></div>
            <div className="input-group-row">
              <div className="input-group"><label>DNI*</label><input type="text" name="dni" required /></div>
              <div className="input-group"><label>Edad*</label><input type="number" name="age" required /></div>
            </div>
            <div className="input-group"><label>Mail de Contacto*</label><input type="email" name="email" required /></div>
            <div className="input-group"><label>Número de Acompañantes y DNIs*</label><textarea name="guests" rows="2" required></textarea></div>
            <div className="input-group-row">
              <div className="input-group">
                <label>Zona acampada*</label>
                <select name="camping" required>
                  <option value="Tienda">Tienda</option>
                  <option value="Caravana">Caravana</option>
                  <option value="Otras">Otras</option>
                </select>
              </div>
              <div className="input-group"><label>Nº personas acampada*</label><input type="number" name="campingPax" required /></div>
            </div>
            <div className="input-group-row">
              <div className="input-group"><label>Parking (Sí/No)*</label><input type="text" name="parking" required /></div>
              <div className="input-group"><label>Matrícula*</label><input type="text" name="plate" required /></div>
            </div>
            <div className="input-group"><label>Comentarios</label><textarea name="comments" rows="3"></textarea></div>
            <button type="submit" className="submit-btn">REGISTRARME</button>
          </form>
        </div>
      </main>
    </div>
  );
}