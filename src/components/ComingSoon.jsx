"use client";
import React, { useState, useEffect } from 'react';
import '../css/ComingSoon.css';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = useState(false);
  const [needsParking, setNeedsParking] = useState(false);
  
  // Nuevos estados para campos condicionales
  const [needsCamping, setNeedsCamping] = useState(false);
  const [hasGuests, setHasGuests] = useState(false);
  const [guestCount, setGuestCount] = useState(0);

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
    const data = Object.fromEntries(formData.entries());

    if (!data.plate) data.plate = ""; 

    try {
      await fetch(GOOGLE_SCRIPT_URL, { 
        method: 'POST', 
        body: JSON.stringify(data), 
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
      });
      setShowModal(true);
      form.reset();
      setNeedsParking(false);
      setNeedsCamping(false);
      setHasGuests(false);
      setGuestCount(0);
    } catch (error) {
      alert("Hubo un error al enviar.");
    }
  };

  // Función para renderizar campos dinámicos de acompañantes
  const renderGuestFields = () => {
    return Array.from({ length: guestCount }).map((_, index) => (
      <div key={index} className="guest-fields" style={{ border: '1px solid #ddd', padding: '10px', marginTop: '10px', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.9em', fontWeight: 'bold' }}>Acompañante {index + 1}</p>
        <div className="input-group"><input type="text" name={`guestName${index}`} placeholder="Nombre y Apellidos" required /></div>
        <div className="input-group"><input type="text" name={`guestDni${index}`} placeholder="DNI" required /></div>
        <div className="input-group"><input type="number" name={`guestAge${index}`} placeholder="Edad" required /></div>
      </div>
    ));
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

            {/* Acompañantes Condicionales */}
            <div className="input-group">
              <label>¿Llevas acompañantes?*</label>
              <select onChange={(e) => setHasGuests(e.target.value === "Sí")} required defaultValue="">
                <option value="" disabled>Selecciona...</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            {hasGuests && (
              <div className="input-group">
                <label>Nº de acompañantes*</label>
                <input type="number" min="1" max="10" onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)} required />
                {renderGuestFields()}
              </div>
            )}

            {/* Acampada Condicional */}
            <div className="input-group">
              <label>¿Deseas acampar?*</label>
              <select onChange={(e) => setNeedsCamping(e.target.value === "Sí")} required defaultValue="">
                <option value="" disabled>Selecciona...</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            {needsCamping && (
              <div className="input-group-row">
                <div className="input-group">
                  <label>Tipo de acampada*</label>
                  <select name="camping" required>
                    <option value="Tienda">Tienda</option>
                    <option value="Caravana">Caravana</option>
                    <option value="Otras">Otras</option>
                  </select>
                </div>
                <div className="input-group"><label>Nº personas acampada*</label><input type="number" name="campingPax" required /></div>
              </div>
            )}

            <div className="input-group-row">
              <div className="input-group">
                <label>Parking</label>
                <select name="parking" required onChange={(e) => setNeedsParking(e.target.value === "Sí")} defaultValue="">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              {needsParking && (
                <div className="input-group">
                  <label>Matrícula*</label>
                  <input type="text" name="plate" placeholder="Ej: 1234 ABC" required />
                </div>
              )}
            </div>

            <div className="input-group"><label>Comentarios</label><textarea name="comments" rows="3"></textarea></div>
            <button type="submit" className="submit-btn">REGISTRARME</button>
          </form>
        </div>
      </main>
    </div>
  );
}