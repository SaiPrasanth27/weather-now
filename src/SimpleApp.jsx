import React from 'react';

function SimpleApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Weather Now
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          App is loading successfully!
        </p>
        <p style={{ fontSize: '1rem', marginTop: '1rem' }}>
          If you see this, the deployment is working.
        </p>
      </div>
    </div>
  );
}

export default SimpleApp;