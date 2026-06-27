
import React from 'react';
import Navbar from '../components/Navbar';
import '../css/globals.css'; // Assuming you have a global CSS file for basic resets

const TempNavbarTest = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#333' }}>
      <Navbar />
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Contenido de prueba</h1>
    </div>
  );
};

export default TempNavbarTest;
