import React from 'react';

const NotFound = () => {
    const styles = {
        container: {
            textAlign: 'center',
            marginTop: '50px',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            fontSize: '3rem',
            color: '#ff4d4d',
        },
        message: {
            fontSize: '1.5rem',
            color: '#333',
        },
        link: {
            marginTop: '20px',
            display: 'inline-block',
            textDecoration: 'none',
            color: '#007bff',
            fontSize: '1.2rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 - Página no encontrada</h1>
            <p style={styles.message}>Lo sentimos, la página que buscas no existe.</p>
            <a href="/" style={styles.link}>Volver al inicio</a>
        </div>
    );
};

export default NotFound;
