import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const relatoriosMock = [
  { mes: "01/2025" },
  { mes: "02/2025" },
  { mes: "03/2025" },
];

export default function RelatoriosPage() {
  const [formato, setFormato] = useState("pdf");

  const handleDownload = (mes) => {
    const extension = formato === "excel" ? "xlsx" : "pdf";
    const filename = `relatorio-${mes.replace("/", "-")}.${extension}`;
    alert(`Simulando download: ${filename}`);
    // Aqui você pode substituir pelo real endpoint de download, ex:
    // window.location.href = `/api/relatorio/download/${mes}?format=${formato}`;
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
    card: {
      backgroundColor: "#fff",
      padding: "20px", // Reduced padding to make the card narrower
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      cursor: "pointer",
      transition: "box-shadow 0.3s ease",
    },
    cardHover: {
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    cardIcon: {
      backgroundColor: "#f0f0f0",
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      marginBottom: "10px",
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
          <Sidebar currentPage="relatorios" />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Main Card */}
          <div style={styles.card}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
              Relatórios
            </h1>

            {/* Formato Selector */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>Formato:</label>
              <select
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                style={styles.select}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel (.xlsx)</option>
              </select>
            </div>

            {/* Relatórios Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", // Reduced min width for smaller cards
                gap: "15px",
              }}
            >
              {relatoriosMock.map((r, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.card,
                    padding: "10px", // Reduced padding for smaller cards
                    boxShadow: "none", // Removed shadow for nested cards
                    backgroundColor: "#f8f9fa",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  onClick={() => handleDownload(r.mes)}
                >
                  <div style={styles.cardIcon}>
                    <FaFileAlt size={24} /> {/* Reduced icon size */}
                  </div>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Relatório {r.mes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
