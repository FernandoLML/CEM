import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const produtosMock = [
  { nome: "Caibro", tipo: "Eucalipto", fornecedor: "Madeiras Z", condicao: "Novo", preco: "50.00" },
  { nome: "Prancha", tipo: "Pinus", fornecedor: "Próprio", condicao: "Usado", preco: "25.50" },
  { nome: "Sarrafo", tipo: "Eucalipto", fornecedor: "Madeiras Y", condicao: "Novo", preco: "10.00" },
  { nome: "Caixaria", tipo: "Eucalipto", fornecedor: "Madeiras Z", condicao: "Novo", preco: "18.75" },
];

export default function ConsultaProdutosPage() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("nome");

  const produtosFiltrados = produtosMock.filter((p) => {
    const valor = p[filtro]?.toString().toLowerCase();
    return valor?.includes(busca.toLowerCase());
  });

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
    card: {
      backgroundColor: "#fff",
      padding: "30px", // Increased padding for better spacing inside the card
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "40px", // Adds spacing between cards
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
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
      maxWidth: "400px",
    },
    select: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
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
          <Sidebar currentPage="consulta" />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Search Section */}
          <div style={styles.card}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
              Consulta de Produtos
            </h1>

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Buscar produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={styles.input}
              />

              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                style={styles.select}
              >
                <option value="nome">Nome</option>
                <option value="tipo">Tipo de madeira</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="condicao">Condição</option>
                <option value="preco">Preço</option>
              </select>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Nome</th>
                  <th style={styles.tableHeader}>Tipo</th>
                  <th style={styles.tableHeader}>Fornecedor</th>
                  <th style={styles.tableHeader}>Condição</th>
                  <th style={styles.tableHeader}>Preço</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  produtosFiltrados.map((p, i) => (
                    <tr key={i}>
                      <td style={styles.tableCell}>{p.nome}</td>
                      <td style={styles.tableCell}>{p.tipo}</td>
                      <td style={styles.tableCell}>{p.fornecedor}</td>
                      <td style={styles.tableCell}>{p.condicao}</td>
                      <td style={styles.tableCell}>R$ {p.preco}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
