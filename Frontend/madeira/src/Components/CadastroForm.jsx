import React from 'react';

const CadastroForm = () => {
  const styles = {
    cadastro: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '20px auto',
      maxWidth: '800px',
    },
    grid: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '20px',
    },
    colEsq: {
      flex: '1',
    },
    colDir: {
      flex: '1',
    },
    field: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    select: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    fornecedorContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    btnAdicionar: {
      padding: '10px 15px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s ease',
    },
    btnAdicionarHover: {
      backgroundColor: '#0056b3',
    },
    dimensoes: {
      display: 'flex',
      gap: '10px',
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    btnCadastrarContainer: {
      textAlign: 'center',
      marginTop: '20px',
    },
    btnCadastrar: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    btnCadastrarHover: {
      backgroundColor: '#218838',
    },
  };

  return (
    <section style={styles.cadastro}>
      <div style={styles.grid}>
        {/* Coluna Esquerda */}
        <div style={styles.colEsq}>
          <div style={styles.field}>
            <label htmlFor="nome" style={styles.label}>
              Nome
            </label>
            <input type="text" id="nome" placeholder="Nome" style={styles.input} />
          </div>
          <div style={styles.field}>
            <label htmlFor="tipoMadeira" style={styles.label}>
              Tipo de Madeira
            </label>
            <select id="tipoMadeira" style={styles.select}>
              <option value="cedro">Cedro</option>
              <option value="pinus">Pinus</option>
              <option value="carvalho">Carvalho</option>
            </select>
          </div>
          <div style={styles.field}>
            <label htmlFor="fornecedor" style={styles.label}>
              Fornecedor
            </label>
            <div style={styles.fornecedorContainer}>
              <select id="fornecedor" style={styles.select}>
                <option value="madeirasXYZ">Madeiras XYZ</option>
                <option value="outraEmpresa">Outra Empresa</option>
              </select>
              <button
                type="button"
                style={styles.btnAdicionar}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.btnAdicionarHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.btnAdicionar.backgroundColor)}
              >
                + Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div style={styles.colDir}>
          <div style={{ ...styles.field, ...styles.dimensoes }}>
            <label style={styles.label}>Dimensões</label>
            <input type="text" placeholder="Altura" style={styles.input} />
            <input type="text" placeholder="Largura" style={styles.input} />
            <input type="text" placeholder="Comprimento" style={styles.input} />
          </div>
          <div style={styles.field}>
            <label htmlFor="preco" style={styles.label}>
              Preço
            </label>
            <div style={styles.priceContainer}>
              <span>R$</span>
              <input type="number" id="preco" placeholder="Preço" style={styles.input} />
            </div>
          </div>
          <div style={styles.field}>
            <label htmlFor="condicao" style={styles.label}>
              Condição
            </label>
            <select id="condicao" style={styles.select}>
              <option value="novo">Novo</option>
              <option value="usado">Usado</option>
            </select>
          </div>
        </div>
      </div>
      <div style={styles.btnCadastrarContainer}>
        <button
          style={styles.btnCadastrar}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.btnCadastrarHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.btnCadastrar.backgroundColor)}
        >
          Cadastrar
        </button>
      </div>
    </section>
  );
};

export default CadastroForm;