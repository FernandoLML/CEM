import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaExchangeAlt, 
  FaUsers, 
  FaFileAlt, 
  FaSearch, 
  FaPeopleArrows, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { TbWood } from "react-icons/tb";

const Sidebar = ({ currentPage }) => {
  const navigate = useNavigate();

  const styles = {
    sidebar: {
      width: '200px',
      marginLeft: '10px',
      height: '900px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: '60px',
      left: '0',
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
    linkStyle: {
      padding: '10px 20px',
      display: 'block',
      textDecoration: 'none',
      color: '#000',
    },
    activeLinkStyle: {
      padding: '10px 20px',
      display: 'block',
      textDecoration: 'none',
      color: '#007bff',
      fontWeight: 'bold',
    },
    logoutButton: {
      marginTop: 'auto', // Places the logout button at the bottom
      padding: '10px 12px',
      display: 'flex',
      alignItems: 'center',
      color: '#ff4444',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    logoutButtonHover: {
      backgroundColor: '#ffe6e6',
    },
  };

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('usuario');

    // Redirect to the login page
    navigate('/login');

    // Reload the page to clear any application state
    window.location.reload();
  };

  return (
    <aside style={styles.sidebar}>
      {/* Existing Links */}
      <Link
        to="/home"
        style={currentPage === 'dashboard' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'dashboard' ? styles.active : {}) }}>
          <FaTachometerAlt style={styles.icon} />
          Dashboard
        </div>
      </Link>
      <Link
        to="/produtos"
        style={currentPage === 'produtos' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'produtos' ? styles.active : {}) }}>
          <FaBox style={styles.icon} />
          Produtos
        </div>
      </Link>
      <Link
        to="/movimentacoes"
        style={currentPage === 'movimentacoes' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'movimentacoes' ? styles.active : {}) }}>
          <FaExchangeAlt style={styles.icon} />
          Movimentações
        </div>
      </Link>
      <Link
        to="/usuarios"
        style={currentPage === 'usuarios' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'usuarios' ? styles.active : {}) }}>
          <FaUsers style={styles.icon} />
          Usuários
        </div>
      </Link>
      <Link
        to="/relatorios"
        style={currentPage === 'relatorios' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'relatorios' ? styles.active : {}) }}>
          <FaFileAlt style={styles.icon} />
          Relatórios
        </div>
      </Link>
      <Link
        to="/consulta"
        style={currentPage === 'consulta' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'consulta' ? styles.active : {}) }}>
          <FaSearch style={styles.icon} />
          Consulta
        </div>
      </Link>
      <Link
        to="/fornecedores"
        style={currentPage === 'fornecedores' ? styles.activeLinkStyle : styles.linkStyle}
      >
        <div style={{ ...styles.menuItem, ...(currentPage === 'fornecedores' ? styles.active : {}) }}>
          <FaPeopleArrows style={styles.icon} />
          Fornecedores
        </div>
      </Link>
      <Link 
        to="/tipos-madeira" 
        style={currentPage === 'tipos-madeira' ? styles.activeLinkStyle : styles.linkStyle}
        >
          <div style={{ ...styles.menuItem, ...(currentPage === 'tipos-madeira' ? styles.active : {}) }}>
          <TbWood style={styles.icon} />
          Madeiras
          </div>
      </Link>

      {/* Logout Button */}
      <div
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.logoutButtonHover.backgroundColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <FaSignOutAlt style={styles.icon} />
        Sair
      </div>
    </aside>
  );
};

export default Sidebar;