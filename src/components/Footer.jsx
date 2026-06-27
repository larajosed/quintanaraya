import React from 'react';
import '../css/Footer.css';
import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';

export default function Footer({ lang }) {
  const t = lang === 'en' ? en : es;

  return (
    <footer className="coming-footer">
      <p>{t.footer.project}</p>
      <p className="coords">{t.footer.coords}</p>
    </footer>
  );
}