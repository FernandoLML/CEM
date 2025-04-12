import React from 'react';

const TabelaListagem = () => {
  const styles = {
    listagem: {
      margin: '20px ',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '900px',
    },
    tabela: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#007BFF',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
      fontWeight: 'bold',
      borderBottom: '2px solid #0056b3',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      textAlign: 'left',
    },
    trHover: {
      backgroundColor: '#f1f1f1',
    },
    actionBtn: {
      padding: '5px 10px',
      margin: '0 5px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s ease',
    },
    edit: {
      backgroundColor: '#ffc107',
      color: '#fff',
    },
    editHover: {
      backgroundColor: '#e0a800',
    },
    delete: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    deleteHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <section style={styles.listagem}>
      <table style={styles.tabela}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Tipo de Madeira</th>
            <th style={styles.th}>Fornecedor</th>
            <th style={styles.th}>Dimensões</th>
            <th style={styles.th}>Preço</th>
            <th style={styles.th}>Estoque Atual</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            <td style={styles.td}>Mesa</td>
            <td style={styles.td}>Cedro</td>
            <td style={styles.td}>Madeiras XYZ</td>
            <td style={styles.td}>80x120x50</td>
            <td style={styles.td}>R$ 300,00</td>
            <td style={styles.td}>5 unid.</td>
            <td style={styles.td}>
              <button
                style={styles.actionBtn}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.editHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.edit.backgroundColor)}
              >
                ✏️
              </button>
              <button
                style={styles.actionBtn}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.deleteHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.delete.backgroundColor)}
              >
                🗑️
              </button>
            </td>
          </tr>
          {/* Adicione outras linhas conforme necessário */}
        </tbody>
      </table>
    </section>
  );
};

export default TabelaListagem;