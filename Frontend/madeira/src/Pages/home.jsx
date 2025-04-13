import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import TabelaListagem from '../Components/TabelaListagem';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para controlar a visibilidade da Sidebar

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column', // Organiza o layout em coluna (Header em cima, Sidebar abaixo)
      height: '100vh',
    },
    contentWrapper: {
      display: 'flex',
      flex: 1,
      marginTop: '70px', // Compensa a altura do Header
    },
    sidebar: {
      width: '250px',
      padding: '30px',
      backgroundColor: '#f9f9f9',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    mainArea: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header />

      {/* Sidebar e Conteúdo Principal */}
      <div style={styles.contentWrapper}>
        {/* Sidebar */}
        {isSidebarOpen && (
          <div style={styles.sidebar}>
            <Sidebar />
          </div>
        )}

        {/* Conteúdo Principal */}
        <div style={styles.mainContent}>
          <div style={styles.mainArea}>
            {/* Coluna principal */}
            <div>
              {/* Produtos em Estoque */}
              <div style={styles.card}>
                <h3>Produtos em Estoque</h3>
                <TabelaListagem />
              </div>

              {/* Lista de Fornecedores */}
              <div style={{ ...styles.card, marginTop: '20px' }}>
                <h3>Lista de Fornecedores</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Nome</th>
                      <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Jairo</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>jairo@catolicasc.com</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Muhamed</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>muhamed@catolicasc.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Widgets */}
            <div>
              <div style={styles.card}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📦</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>134 produtos em estoque</div>
              </div>
              <div style={{ ...styles.card, marginTop: '20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>20 fornecedores</div>
              </div>
              <div style={{ ...styles.card, marginTop: '20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>R$ 20.247,10 em estoque</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;