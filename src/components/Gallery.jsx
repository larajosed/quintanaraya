"use client";
import React, { useState, useEffect, useRef } from 'react';
import '../css/Gallery.css';

export default function Gallery({ photos, title, desc }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const scrollRef = useRef(null);

  // Verificamos si debemos mostrar las flechas (si hay más de 4 fotos)
  const showArrows = photos.length > 4;

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth / 2 : clientWidth / 2,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') nextPhoto(e);
      if (e.key === 'ArrowLeft') prevPhoto(e);
    };
    if (selectedIndex !== null) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="gallery-container">
      {(title || desc) && (
        <div className="gallery-header">
          {title && <h2 className="obs-title">{title}</h2>}
          {desc && <p className="obs-desc">{desc}</p>}
        </div>
      )}

      <div className="gallery-wrapper">
        {/* Solo renderizamos las flechas si showArrows es true */}
        {showArrows && (
          <button className="nav-arrow left" onClick={() => scroll('left')}>❮</button>
        )}
        
        <div className="gallery-grid" ref={scrollRef}>
          {photos.map((photo, i) => (
            <div key={i} className="gallery-card" onClick={() => setSelectedIndex(i)}>
              <img src={photo.url} alt={`Imagen ${i + 1}`} />
            </div>
          ))}
        </div>

        {showArrows && (
          <button className="nav-arrow right" onClick={() => scroll('right')}>❯</button>
        )}
      </div>

      <div className={`modal-overlay ${selectedIndex !== null ? 'open' : ''}`} onClick={() => setSelectedIndex(null)}>
        {selectedIndex !== null && (
          <div className="modal-slider" onClick={(e) => e.stopPropagation()}>
            <button className="nav-btn prev" onClick={prevPhoto}>❮</button>
            <img src={photos[selectedIndex].url} alt="Ampliada" />
            <button className="nav-btn next" onClick={nextPhoto}>❯</button>
            <button className="close-btn" onClick={() => setSelectedIndex(null)}>✕</button>
          </div>
        )}
      </div>
    </section>
  );
}