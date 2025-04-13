import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const movimentacoes = [
  { nome: "Caibro", tipo_madeira: "Eucalipto", fornecedor: "Madeiras Z", dimensoes: "80x120x40", natureza: "Entrada", quantidade: 5 },
  { nome: "Caixaria", tipo_madeira: "Eucalipto", fornecedor: "Madeiras Z", dimensoes: "80x120x40", natureza: "Entrada", quantidade: 5 },
  { nome: "Caibro", tipo_madeira: "Eucalipto", fornecedor: "Madeiras Z", dimensoes: "80x120x40", natureza: "Saída", quantidade: 5 },
  { nome: "Sarrafo", tipo_madeira: "Pinus", fornecedor: "Madeiras X", dimensoes: "20x10x400", natureza: "Saída", quantidade: 30 },
  { nome: "Prancha", tipo_madeira: "Pinus", fornecedor: "Próprio", dimensoes: "20x30x200", natureza: "Saída", quantidade: 2 },
  { nome: "Serragem", tipo_madeira: "", fornecedor: "", dimensoes: "80x120x40", natureza: "Saída", quantidade: 20 },
];

export default function MovimentacaoPage() {
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
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <Header />

      {/* Sidebar and Main Content */}
      <div style={styles.contentWrapper}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <Sidebar currentPage="movimentacoes" />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Movimentação Section */}
          <div style={styles.card}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
              Movimentação
            </h1>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Nome</th>
                  <th style={styles.tableHeader}>Tipo de madeira</th>
                  <th style={styles.tableHeader}>Fornecedor</th>
                  <th style={styles.tableHeader}>Dimensões</th>
                  <th style={styles.tableHeader}>Natureza</th>
                  <th style={styles.tableHeader}>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoes.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: item.natureza === "Saída" ? "#ffe5e5" : "#e5ffe5",
                    }}
                  >
                    <td style={styles.tableCell}>{item.nome}</td>
                    <td style={styles.tableCell}>{item.tipo_madeira || "—"}</td>
                    <td style={styles.tableCell}>{item.fornecedor || "—"}</td>
                    <td style={styles.tableCell}>{item.dimensoes}</td>
                    <td style={{ ...styles.tableCell, fontWeight: "bold" }}>{item.natureza}</td>
                    <td style={{...styles.tableCell, textAlign: "center"}}>{item.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
