"use client";
import React, { useState, useEffect } from 'react';
import '../css/Gallery.css';

export default function Gallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Lógica para cerrar el modal al presionar la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    
    // Solo añadimos el listener si hay una foto seleccionada
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section className="gallery-container">
      <div className="gallery-header">
        <h2 className="obs-title">EXPOSICIÓN FOTOGRÁFICA DE LA CORONA</h2>
        <p className="obs-desc">Instantáneas capturadas por astrónomos colaboradores.</p>
      </div>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div 
            key={i} 
            className="gallery-card" 
            onClick={() => setSelectedPhoto(photo.url)}
            role="button"
            aria-label="Expandir imagen"
          >
            <img src={photo.url} alt={`Astrofotografía ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Modal siempre en el DOM, controlado por la clase CSS 'open' */}
      <div 
        className={`modal-overlay ${selectedPhoto ? 'open' : ''}`} 
        onClick={() => setSelectedPhoto(null)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {selectedPhoto && (
            <>
              <img src={selectedPhoto} alt="Vista ampliada" />
              <button 
                className="close-btn" 
                onClick={() => setSelectedPhoto(null)}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}