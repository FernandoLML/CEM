import React, { useState, useEffect } from "react";
import { FaUserCircle, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";


const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});


api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // O backend agora espera 'Token <seu_token>' no cabeçalho Authorization
    if (userData && userData.token) {
      config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function UsuariosPage() {

  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    id: "",
    nome: "",
    email: "",
    nivel_acesso: ""
  });
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carrega dados do usuário atual e lista de usuários
  useEffect(() => {
        const carregarDados = async () => {
            // Verifica se há dados de usuário no localStorage
            const storedUserData = JSON.parse(localStorage.getItem('userData'));
            if (!storedUserData || !storedUserData.token) {
                alert("Sessão inválida. Por favor, faça o login novamente.");
                navigate('/login');
                return;
            }

            try {
                // Faz as duas requisições em paralelo para mais eficiência
                const [responsePerfil, responseUsuarios] = await Promise.all([
                    api.get('/usuarios/me/'), // Endpoint seguro para pegar o usuário logado
                    api.get('/usuarios/')     // Endpoint para pegar a lista de todos os usuários
                ]);
                
                setPerfil(responsePerfil.data);
                // Filtra a lista para não mostrar o próprio usuário logado
                setUsuarios(responseUsuarios.data.filter(user => user.id_usuario !== responsePerfil.data.id_usuario));

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                   alert("Sessão expirada ou não autorizada. Faça o login novamente.");
                   navigate('/login');
                } else {
                   alert("Ocorreu um erro ao carregar os dados da página.");
                }
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, [navigate]); // Adicionado navigate ao array de dependências

  const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil((prev) => ({ ...prev, [name]: value }));
    };

  const toggleEdit = async () => {
        if (isEditing) {
            try {
                const updateData = { nome: perfil.nome, email: perfil.email };
                // Usamos PATCH para atualização parcial e o ID correto (id_usuario)
                await api.patch(`/usuarios/${perfil.id_usuario}/`, updateData);
                alert("Informações salvas com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar:", error.response?.data || error.message);
                alert("Erro ao salvar alterações.");
            }
        }
        setIsEditing(!isEditing);
    };

  const handleDelete = async (idParaDeletar) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                // URL de exclusão corrigida e ID correto
                await api.delete(`/usuarios/${idParaDeletar}/`);
                setUsuarios(usuarios.filter(user => user.id_usuario !== idParaDeletar));
                alert("Usuário excluído com sucesso");
            } catch (error) {
                console.error("Erro ao excluir:", error.response?.data || error.message);
                alert("Erro ao excluir usuário. Apenas administradores podem executar esta ação.");
            }
        }
    };

  // Função para traduzir nível de acesso para cargo exibido
  const getCargo = (nivelAcesso) => {
    const cargos = {
      'admin': 'Administrador',
      'gerente': 'Gerente',
      'usuario': 'Operador'
    };
    return cargos[nivelAcesso] || nivelAcesso;
  };

  /* 
   * ESTILOS - MANTIDOS EXATAMENTE IGUAIS CÓDIGO ORIGINAL
   */
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
    loading: {
      textAlign: "center",
      padding: "20px",
      fontSize: "18px"
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.contentWrapper}>
          <div style={styles.sidebar}>
            <Sidebar currentPage="usuarios" />
          </div>
          <div style={styles.mainContent}>
            <div style={styles.loading}>Carregando dados...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header />
      
      <div style={styles.contentWrapper}>
        <div style={styles.sidebar}>
          <Sidebar currentPage="usuarios" />
        </div>

        <div style={styles.mainContent}>
          {/* Seção de Perfil */}
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
                  value={perfil.nome || ''}
                  onChange={handleChange}
                  placeholder="Nome"
                  style={styles.input}
                  disabled={!isEditing}
                />
                <input
                  type="email"
                  name="email"
                  value={perfil.email || ''}
                  onChange={handleChange}
                  placeholder="Email"
                  style={styles.input}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  value={getCargo(perfil.nivel_acesso) || ''}
                  style={styles.input}
                  disabled
                />
              </div>
            </div>
            <button onClick={toggleEdit} style={styles.button}>
              {isEditing ? "Salvar" : "Editar"}
            </button>
          </div>

          {/* Seção de Usuários Cadastrados */}
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
                  {perfil.nivel_acesso === "admin" && (
                    <th style={styles.tableHeader}>Ações</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id_usuario}>
                    <td style={styles.tableCell}>{user.nome}</td>
                    <td style={styles.tableCell}>{user.email}</td>
                    <td style={styles.tableCell}>{getCargo(user.nivel_acesso)}</td>
                    {perfil.nivel_acesso === "admin" && (
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => handleDelete(user.id_usuario)}
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