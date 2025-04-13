import React, { useState, createContext, useContext } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

// Create the context
const ProdutoContext = createContext(null);

export const useProdutoContext = () => {
  const context = useContext(ProdutoContext);
  if (!context) {
    throw new Error("useProdutoContext must be used within a ProdutosProvider");
  }
  return context;
};

// Define the provider component
const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = (produto) => {
    setProdutos((prev) => [...prev, produto]);
  };

  const atualizarProduto = (index, produtoAtualizado) => {
    setProdutos((prev) => prev.map((p, i) => (i === index ? produtoAtualizado : p)));
  };

  const removerProduto = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProdutos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <ProdutoContext.Provider value={{ produtos, adicionarProduto, atualizarProduto, removerProduto }}>
      {children}
    </ProdutoContext.Provider>
  );
};

const ProdutosPage = () => {
  const { produtos, adicionarProduto, atualizarProduto, removerProduto } = useProdutoContext();

  const [form, setForm] = useState({
    nome: "",
    tipoMadeira: "",
    fornecedor: "",
    preco: "",
    condicao: "",
    altura: "",
    largura: "",
    comprimento: "",
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [filtro, setFiltro] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const emptyField = Object.entries(form).find(([, value]) => value.trim() === "");
    if (emptyField) {
      alert("Preencha todos os campos antes de cadastrar.");
      return;
    }

    if (modoEdicao && indiceEditando !== null) {
      atualizarProduto(indiceEditando, form);
      setModoEdicao(false);
      setIndiceEditando(null);
    } else {
      adicionarProduto(form);
      alert("Produto cadastrado com sucesso (simulação).");
    }

    setForm({
      nome: "",
      tipoMadeira: "",
      fornecedor: "",
      preco: "",
      condicao: "",
      altura: "",
      largura: "",
      comprimento: "",
    });
  };

  const handleEditar = (index) => {
    setForm(produtos[index]);
    setModoEdicao(true);
    setIndiceEditando(index);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    contentWrapper: {
      display: "flex",
      flex: 1,
      marginTop: "70px", // Compensates for the fixed header height
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#f8f9fa",
      height: "100%",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      overflowY: "auto",
    },
    mainContent: {
      flex: 1,
      padding: "40px", // Increased padding for better spacing
      backgroundColor: "#f5f5f5",
    },
    section: {
      marginBottom: "40px", // Adds spacing between sections
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)", // 4 columns for the form fields
      gap: "30px", // Increased gap between fields
      marginBottom: "30px", // Added spacing below the form
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    tableWrapper: {
      marginTop: "40px", // Added spacing above the table
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "#fff",
      textAlign: "left",
      padding: "10px",
    },
    tableCell: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    card: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header />

      {/* Sidebar and Main Content */}
      <div style={styles.contentWrapper}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <Sidebar currentPage="produtos" />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Cadastro Section */}
          <div style={{ ...styles.card, ...styles.section }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              {modoEdicao ? "Editar Produto" : "Cadastrar Produto"}
            </h1>

            <div style={{ margin: "20px 0" }}>
              <input
                placeholder="Buscar por nome, madeira ou fornecedor"
                style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "100%", maxWidth: "400px" }}
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>

            <div style={{ ...styles.formGrid, marginRight: "20px" }}>
              <input
                placeholder="Nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                style={styles.input}
              />
              <select
                name="tipoMadeira"
                value={form.tipoMadeira}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Tipo de Madeira</option>
                <option value="Pinus">Pinus</option>
                <option value="Eucalipto">Eucalipto</option>
                <option value="Outros">Outros</option>
              </select>
              <input
                placeholder="Fornecedor"
                name="fornecedor"
                value={form.fornecedor}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                placeholder="Preço"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                placeholder="Condição"
                name="condicao"
                value={form.condicao}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                placeholder="Altura"
                name="altura"
                value={form.altura}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                placeholder="Largura"
                name="largura"
                value={form.largura}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                placeholder="Comprimento"
                name="comprimento"
                value={form.comprimento}
                onChange={handleChange}
                style={styles.input}
              />
              <div style={{ gridColumn: "span 4", textAlign: "center", marginTop: "20px" }}>
                <button onClick={handleSubmit} style={styles.button}>
                  {modoEdicao ? "Salvar Alterações" : "Cadastrar"}
                </button>
              </div>
            </div>
          </div>

          {/* Lista Section */}
          <div style={{ ...styles.card, ...styles.section }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Lista de Produtos</h2>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Nome</th>
                    <th style={styles.tableHeader}>Tipo de madeira</th>
                    <th style={styles.tableHeader}>Fornecedor</th>
                    <th style={styles.tableHeader}>Dimensões</th>
                    <th style={styles.tableHeader}>Preço</th>
                    <th style={styles.tableHeader}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{item.nome}</td>
                      <td style={styles.tableCell}>{item.tipoMadeira}</td>
                      <td style={styles.tableCell}>{item.fornecedor}</td>
                      <td style={styles.tableCell}>{`${item.altura}x${item.largura}x${item.comprimento}`}</td>
                      <td style={styles.tableCell}>{item.preco}</td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => handleEditar(index)}
                          style={{ ...styles.button, marginRight: "10px" }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => removerProduto(index)}
                          style={{ ...styles.button, backgroundColor: "#dc3545" }}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProdutosPageWrapper = () => (
  <ProdutosProvider>
    <ProdutosPage />
  </ProdutosProvider>
);

export default ProdutosPageWrapper;