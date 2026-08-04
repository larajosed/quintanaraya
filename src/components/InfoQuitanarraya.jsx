"use client";
import React, { useState } from 'react';
import Gallery from './Gallery'; 
import { astroPhotos, parkingPhotos, quintanarrayaPhotos, accessPhotos } from '../data/GalleryData';
import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';
import '../css/InfoQuitanarraya.css';

export default function InfoQuintanarraya({ lang }) {
  const t = (lang === 'en' ? en : es).info_quintanarraya;
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper para obtener una única imagen de forma segura (soporta string u objeto con .url)
  const getSingleImage = (photosArray) => {
    if (!photosArray || photosArray.length === 0) return '';
    return typeof photosArray[0] === 'string' ? photosArray[0] : (photosArray[0].url || '');
  };

  const astroImg = getSingleImage(astroPhotos);
  const accessImg = getSingleImage(typeof accessPhotos !== 'undefined' ? accessPhotos : quintanarrayaPhotos);

  return (
    <section className="obs-container">
      <div className="obs-inner">
        
        {/* SECCIÓN 2: ECLIPSE */}
        <div className="obs-header">
          <h2 className="obs-title">{t.eclipse.title}</h2>
        </div>

        <div className="obs-image-wrapper obs-mt-30">
          <h3 className="obs-card-title obs-card-subtitle">
            {lang === 'en' ? 'Activity Program' : 'Programa de Actividades'}
          </h3>
          <img 
            src="/images/Cartel.jpg" 
            alt="Programa de Actividades Eclipse Quintanarraya" 
            className="obs-single-image obs-clickable-image"
            onClick={() => setSelectedImage({ src: "/images/Cartel.jpg", alt: "Programa de Actividades" })}
          />
        </div>

        <div className="obs-header-container obs-header-eclipse">
          <p className="obs-subtitle obs-mb-20">
            {t.eclipse.text1}
          </p>
          
          <h3 className="obs-card-title obs-card-subtitle">
            {t.eclipse.subtitle}
          </h3>
          
          <p className="obs-subtitle obs-italic obs-mb-20">
            {t.eclipse.mapCaption}
          </p>

          <p className="obs-subtitle obs-mb-20">
            {t.eclipse.text2}
          </p>

          <p className="obs-subtitle obs-bold obs-mb-15">
            {t.eclipse.efemeridesTitle}
          </p>

          <ul className="obs-list">
            <li>{t.eclipse.item1}</li>
            <li>{t.eclipse.item2}</li>
            <li>{t.eclipse.item3}</li>
            <li>{t.eclipse.item4}</li>
            <li>{t.eclipse.item5}</li>
            <li>{t.eclipse.item6}</li>
          </ul>
        </div>

        <Gallery photos={quintanarrayaPhotos} />

        {/* SECCIÓN 3: ZONA DE OBSERVACIÓN */}
        <div className="obs-header">
          <h2 className="obs-title">{t.informacion.title}</h2>
        </div>
        
        {astroImg && (
          <div className="obs-image-wrapper">
            <img 
              src={astroImg} 
              alt={t.informacion.title} 
              className="obs-single-image obs-clickable-image" 
              onClick={() => setSelectedImage({ src: astroImg, alt: t.informacion.title })}
            />
          </div>
        )}

        <div className="obs-header-container">
          <p className="obs-subtitle">{t.informacion.descripcion}</p>
          <p className="obs-subtitle">{t.informacion.acceso}</p>
          <p className="obs-subtitle">{t.informacion.distancia}</p>
          <p className="obs-subtitle">{t.informacion.acceso_vehiculos}</p>
          <p className="obs-subtitle">{t.informacion.descarga_detalle}</p>
          <p className="obs-subtitle">{t.informacion.horarios_acceso}</p>
          
          <div className="obs-info-box">
            {t.informacion.aviso}
          </div>
        </div>

        {/* SECCIÓN 4: ACCESO A QUINTANARRAYA */}
        <div className="obs-header obs-mt-80">
          <h2 className="obs-title">{t.acceso.title}</h2>
        </div>

        {accessImg && (
          <div className="obs-image-wrapper">
            <img 
              src={accessImg} 
              alt={t.acceso.title} 
              className="obs-single-image obs-clickable-image" 
              onClick={() => setSelectedImage({ src: accessImg, alt: t.acceso.title })}
            />
          </div>
        )}

        <div className="obs-header-container">
          <p className="obs-subtitle">{t.acceso.text1}</p>
          <p className="obs-subtitle">{t.acceso.text2}</p>
        </div>

        {/* SECCIÓN 5: ZONA APARCAMIENTO Y ACAMPADA */}
        <div className="obs-header obs-mt-80">
          <h2 className="obs-title">{t.informacion.parking_title}</h2>
        </div>
        
        <Gallery photos={parkingPhotos} />
        
        <div className="obs-header-container obs-mt-30">
          <p className="obs-subtitle">
            {t.informacion.parking_text}
          </p>
        </div>

        {/* SECCIÓN 6: SERVICIOS */}
        <div className="obs-header obs-mt-80">
          <h2 className="obs-title">{t.servicios.title}</h2>
        </div>

        <div className="obs-header-container">
          <p className="obs-subtitle obs-mb-30">
            {t.servicios.text}
          </p>

          <div className="obs-grid obs-services-grid">
            <div className="obs-card obs-service-card">
              <span className="obs-icon">🚑</span>
              <strong className="obs-card-title">{lang === 'en' ? "Ambulance" : "Ambulancia"}</strong>
            </div>
            <div className="obs-card obs-service-card">
              <span className="obs-icon">🚻</span>
              <strong className="obs-card-title">{lang === 'en' ? "Chemical Toilets" : "Baños químicos"}</strong>
            </div>
            <div className="obs-card obs-service-card">
              <span className="obs-icon">🍻</span>
              <strong className="obs-card-title">{lang === 'en' ? "Bar & Drinks" : "Barra de bar"}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="obs-lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="obs-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="obs-lightbox-close" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="obs-lightbox-image" 
            />
          </div>
        </div>
      )}
    </section>
  );
}