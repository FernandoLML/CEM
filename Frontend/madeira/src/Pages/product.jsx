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
      padding: "60px",
      backgroundColor: "#f5f5f5",
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            <input placeholder="Nome" name="nome" value={form.nome} onChange={handleChange} />
            <select name="tipoMadeira" value={form.tipoMadeira} onChange={handleChange}>
              <option value="">Tipo de Madeira</option>
              <option value="Pinus">Pinus</option>
              <option value="Eucalipto">Eucalipto</option>
              <option value="Outros">Outros</option>
            </select>
            <input placeholder="Fornecedor" name="fornecedor" value={form.fornecedor} onChange={handleChange} />
            <input placeholder="Preço" name="preco" value={form.preco} onChange={handleChange} />
            <input placeholder="Condição" name="condicao" value={form.condicao} onChange={handleChange} />
            <input placeholder="Altura" name="altura" value={form.altura} onChange={handleChange} />
            <input placeholder="Largura" name="largura" value={form.largura} onChange={handleChange} />
            <input placeholder="Comprimento" name="comprimento" value={form.comprimento} onChange={handleChange} />
            <div style={{ gridColumn: "span 4" }}>
              <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                {modoEdicao ? "Salvar Alterações" : "Cadastrar"}
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "40px" }}>Lista de Produtos</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo de madeira</th>
                <th>Fornecedor</th>
                <th>Dimensões</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.tipoMadeira}</td>
                  <td>{item.fornecedor}</td>
                  <td>{`${item.altura}x${item.largura}x${item.comprimento}`}</td>
                  <td>{item.preco}</td>
                  <td>
                    <button onClick={() => handleEditar(index)}>Editar</button>
                    <button onClick={() => removerProduto(index)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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