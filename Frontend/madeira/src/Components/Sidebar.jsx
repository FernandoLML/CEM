import React from 'react';
import { FaTachometerAlt, FaBox, FaExchangeAlt, FaUsers, FaFileAlt, FaSearch } from 'react-icons/fa';

const Sidebar = () => {
  const styles = {
    sidebar: {
      width: '200px',
      marginleft: '10px',
      height: '900px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      position: 'left', // Fixa a sidebar na lateral esquerda
      top: '10px',
      left: 'px',
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 12px',
      marginBottom: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      color: '#333',
      textDecoration: 'none',
      fontSize: '16px',
    },
    active: {
      backgroundColor: '#007BFF',
      color: '#fff',
    },
    menuItemHover: {
      backgroundColor: '#e6e6e6',
    },
    icon: {
      marginRight: '10px',
      fontSize: '18px',
    },
  };

  return (
    <aside style={styles.sidebar}>
      <div style={{ ...styles.menuItem, ...styles.active }}>
        <FaTachometerAlt style={styles.icon} />
        Dashboard
      </div>
      <div style={styles.menuItem}>
        <FaBox style={styles.icon} />
        Produtos
      </div>
      <div style={styles.menuItem}>
        <FaExchangeAlt style={styles.icon} />
        Movimentações
      </div>
      <div style={styles.menuItem}>
        <FaUsers style={styles.icon} />
        Usuários
      </div>
      <div style={styles.menuItem}>
        <FaFileAlt style={styles.icon} />
        Relatórios
      </div>
      <div style={styles.menuItem}>
        <FaSearch style={styles.icon} />
        Consulta
      </div>
    </aside>
  );
};

export default Sidebar;