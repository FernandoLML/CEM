import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TabelaListagem from '../Components/TabelaListagem';
import CadastroForm from '../Components/CadastroForm';
import { useNavigate } from 'react-router-dom';

// Instância do Axios para se comunicar com o backend
const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function ProductPage() {
    const navigate = useNavigate();

    // --- 1. GERENCIAMENTO DE ESTADO ---
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [tiposMadeira, setTiposMadeira] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- 2. FUNÇÃO PARA BUSCAR DADOS ---
    const fetchData = async () => {
        try {
            const [produtosRes, fornecedoresRes, tiposMadeiraRes] = await Promise.all([
                api.get('/produtos/'),
                api.get('/fornecedores/'),
                api.get('/tipos-madeira/')
            ]);
            setProdutos(produtosRes.data);
            setFornecedores(fornecedoresRes.data);
            setTiposMadeira(tiposMadeiraRes.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
               alert("Sessão expirada. Faça o login novamente.");
               navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    // --- 3. FUNÇÕES DE AÇÃO (HANDLERS) ---
    const handleCadastro = async (data) => {
        const payload = { ...data }; // Clona os dados para não modificar o estado original
        try {
            if (isEditing) {
                await api.patch(`/produtos/${editingId}/`, payload);
                alert('Produto atualizado com sucesso!');
            } else {
                await api.post('/produtos/', payload);
                alert('Produto cadastrado com sucesso!');
            }
            // Limpa o formulário e recarrega os dados da tabela
            setIsEditing(false);
            setFormData({});
            setEditingId(null);
            fetchData(); // Atualiza a lista de produtos sem recarregar a página
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            console.error('Erro ao salvar produto:', errorMsg);
            alert(`Erro ao salvar produto: ${errorMsg}`);
        }
    };

    const handleEdit = (produto) => {
        setFormData({
            nome: produto.nome,
            dimensoes_comprimento: produto.dimensoes_comprimento,
            dimensoes_largura: produto.dimensoes_largura,
            utilizacao: produto.utilizacao,
            fornecedor: produto.fornecedor,
            tipo_de_madeira: produto.tipo_de_madeira
        });
        setIsEditing(true);
        setEditingId(produto.id);
        window.scrollTo(0, 0); 
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await api.delete(`/produtos/${id}/`);
                alert('Produto excluído com sucesso.');
                fetchData(); // Atualiza a lista de produtos
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto. Verifique se ele não está em uso.');
            }
        }
    };

    // --- 4. CONFIGURAÇÃO DINÂMICA DO FORMULÁRIO E TABELA ---
    const colunasTabela = [
        // ... (mantido como antes)
        { chave: 'id', nome: 'ID' },
        { chave: 'nome', nome: 'Nome do Produto' },
        { chave: 'dimensoes_comprimento', nome: 'Comprimento (m)' },
        { chave: 'dimensoes_largura', nome: 'Largura (m)' },
        { chave: 'fornecedor_nome', nome: 'Fornecedor' },
        { chave: 'tipo_de_madeira_nome', nome: 'Tipo de Madeira' },
    ];

    const camposFormulario = [
        // ... (mantido como antes, agora dinâmico)
        { nome: 'nome', label: 'Nome do Produto', tipo: 'text' },
        { nome: 'dimensoes_comprimento', label: 'Comprimento (metros)', tipo: 'number' },
        { nome: 'dimensoes_largura', label: 'Largura (metros)', tipo: 'number' },
        { nome: 'utilizacao', label: 'Utilização', tipo: 'text' },
        { 
            nome: 'fornecedor', 
            label: 'Fornecedor', 
            tipo: 'select', 
            opcoes: fornecedores.map(f => ({ valor: f.id, texto: f.nome })) 
        },
        { 
            nome: 'tipo_de_madeira', 
            label: 'Tipo de Madeira', 
            tipo: 'select',
            opcoes: tiposMadeira.map(t => ({ valor: t.id, texto: t.nome })) 
        },
    ];
    
    // Estilos para o layout principal (semelhante ao user.jsx)
    const styles = {
        mainContent: {
            flex: 1,
            padding: "20px",
            backgroundColor: "#f5f5f5",
            marginTop: "70px", // Espaço para o Header fixo
        },
        card: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
        },
    };


    if (loading) return <div>Carregando...</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar currentPage="produtos" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '250px' }}>
                <Header />
                <main style={styles.mainContent}>
                    <div style={styles.card}>
                        <h1 style={{ marginBottom: '20px' }}>
                            {isEditing ? "Editar Produto" : "Cadastro de Produtos"}
                        </h1>
                        <CadastroForm
                            campos={camposFormulario}
                            onSubmit={handleCadastro}
                            initialData={formData}
                            isEditing={isEditing}
                        />
                    </div>
                    <div style={styles.card}>
                        <h2 style={{ marginBottom: '20px' }}>Produtos Cadastrados</h2>
                        <TabelaListagem
                            colunas={colunasTabela}
                            dados={produtos}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}