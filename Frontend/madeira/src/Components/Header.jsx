import React from 'react';

const Header = ({ isSidebarOpen }) => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#fff',
      color: '#333',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: '0',
      left: isSidebarOpen ? '250px' : '0', // Ajusta dinamicamente com base no estado da Sidebar
      right: '0',
      zIndex: '1000',
      transition: 'left 0.3s ease', // Animação suave ao abrir/fechar a Sidebar
    },
    headerLeft: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>Controle de Estoque</div>
      <div style={styles.headerRight}>
        <div>Bem-vindo, USER</div>
      </div>
    </header>
  );
};

export default Header;