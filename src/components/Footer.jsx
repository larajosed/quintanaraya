"use client";
import React from 'react';
import es from '../dictionaries/es.json';
import en from '../dictionaries/en.json';
import '../css/Footer.css';

export default function Footer({ lang }) {
  const dict = lang === 'en' ? en : es;
  const t = dict.footer || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-center">
        <div>
          © {currentYear} {t.copyright || "Todos los derechos reservados."}
        </div>
        <div className="footer-small-text">
          {t.powered_by || "Desarrollado por"}{" "}
          <a 
            href="https://larajosed.github.io/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {t.webDeveloper || "José Lara"}
          </a>
        </div>
      </div>
    </footer>
  );
}