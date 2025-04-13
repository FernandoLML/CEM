import React, { useState, createContext, useContext } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const FornecedorContext = createContext(null);

export const useFornecedorContext = () => {
  const context = useContext(FornecedorContext);
  if (!context) throw new Error("useFornecedorContext must be used within FornecedorProvider");
  return context;
};

const FornecedorProvider = ({ children }) => {
  const [fornecedores, setFornecedores] = useState([]);

  const adicionarFornecedor = (f) => setFornecedores((prev) => [...prev, f]);
  const atualizarFornecedor = (index, f) => setFornecedores((prev) => prev.map((item, i) => (i === index ? f : item)));
  const removerFornecedor = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      setFornecedores((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <FornecedorContext.Provider value={{ fornecedores, adicionarFornecedor, atualizarFornecedor, removerFornecedor }}>
      {children}
    </FornecedorContext.Provider>
  );
};

const FornecedorPage = () => {
  const { fornecedores, adicionarFornecedor, atualizarFornecedor, removerFornecedor } = useFornecedorContext();

  const [form, setForm] = useState({ nome: "", telefone: "", email: "" });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const empty = Object.values(form).some((v) => v.trim() === "");
    if (empty) return alert("Preencha todos os campos.");

    if (modoEdicao) {
      atualizarFornecedor(indiceEditando, form);
      setModoEdicao(false);
      setIndiceEditando(null);
    } else {
      adicionarFornecedor(form);
    }
    setForm({ nome: "", telefone: "", email: "" });
  };

  const handleEditar = (index) => {
    setForm(fornecedores[index]);
    setModoEdicao(true);
    setIndiceEditando(index);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1, marginTop: "70px" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            backgroundColor: "#f8f9fa",
            height: "100%",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
          }}
        >
          <Sidebar currentPage="fornecedores" />
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            backgroundColor: "#f5f5f5",
          }}
        >
          {/* Cadastro Section */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "40px",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              {modoEdicao ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <input
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
              <input
                name="telefone"
                placeholder="Telefone"
                value={form.telefone}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
              <input
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {modoEdicao ? "Salvar" : "Cadastrar"}
              </button>
            </div>
          </div>

          {/* Lista Section */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
              Lista de Fornecedores
            </h2>
            <div style={{ marginTop: "20px" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Nome
                    </th>
                    <th
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Telefone
                    </th>
                    <th
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fornecedores.map((f, i) => (
                    <tr key={i}>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {f.nome}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {f.telefone}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {f.email}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <button
                          onClick={() => handleEditar(i)}
                          style={{
                            color: "#007bff",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => removerFornecedor(i)}
                          style={{
                            color: "#dc3545",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
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

const FornecedorPageWrapper = () => (
  <FornecedorProvider>
    <FornecedorPage />
  </FornecedorProvider>
);

export default FornecedorPageWrapper;
