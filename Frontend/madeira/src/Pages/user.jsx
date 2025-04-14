import React, { useState } from "react";
import { FaUserCircle, FaTrashAlt } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const usuarioAtual = {
  nome: "João Silva",
  email: "joao.silva@example.com",
  cargo: "Administrador",
};

const usuariosMock = [
  { nome: "Maria Oliveira", email: "maria@example.com", cargo: "Operador" },
  { nome: "Carlos Souza", email: "carlos@example.com", cargo: "Gerente" },
  { nome: "Ana Paula", email: "ana@example.com", cargo: "Supervisor" },
];

export default function UsuariosPage() {
  const [perfil, setPerfil] = useState(usuarioAtual);
  const [isEditing, setIsEditing] = useState(false);
  const [usuarios, setUsuarios] = useState(usuariosMock);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      alert("Informações salvas com sucesso!");
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsuarios((prev) => prev.filter((_, i) => i !== index));
    }
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
      marginTop: "70px",
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
      padding: "40px",
      backgroundColor: "#f5f5f5",
    },
    card: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "40px",
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
    button: {
      padding: "10px 20px",
      backgroundColor: isEditing ? "#28a745" : "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    deleteButton: {
      color: "#dc3545",
      background: "none",
      border: "none",
      cursor: "pointer",
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
          <Sidebar currentPage="usuarios" />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* User Profile Section */}
          <div style={styles.card}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
              Perfil do Usuário
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
              <FaUserCircle size={80} style={{ color: "#6c757d" }} />
              <div style={{ display: "grid", gap: "10px" }}>
                <input
                  type="text"
                  name="nome"
                  value={perfil.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                  style={styles.input}
                  disabled={!isEditing}
                />
                <input
                  type="email"
                  name="email"
                  value={perfil.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={styles.input}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  name="cargo"
                  value={perfil.cargo}
                  onChange={handleChange}
                  placeholder="Cargo"
                  style={styles.input}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <button onClick={toggleEdit} style={styles.button}>
              {isEditing ? "Salvar" : "Editar"}
            </button>
          </div>

          {/* Registered Users Section */}
          <div style={styles.card}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
              Usuários Cadastrados
            </h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Nome</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Cargo</th>
                  {perfil.cargo === "Administrador" && (
                    <th style={styles.tableHeader}>Ações</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{user.nome}</td>
                    <td style={styles.tableCell}>{user.email}</td>
                    <td style={styles.tableCell}>{user.cargo}</td>
                    {perfil.cargo === "Administrador" && (
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => handleDelete(index)}
                          style={styles.deleteButton}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    )}
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
