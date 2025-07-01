import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TabelaListagem from '../Components/TabelaListagem';
import CadastroForm from '../Components/CadastroForm';
import { useNavigate } from 'react-router-dom';

// Instância do Axios com a URL base da sua API
const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function SupplierPage() {
    const navigate = useNavigate();

    // Estados para a lista de fornecedores e para o formulário
    const [fornecedores, setFornecedores] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função centralizada para buscar os dados da API
    const fetchData = async () => {
        // Não precisa de setLoading(true) aqui, pois o useEffect já controla o loading inicial
        try {
            const response = await api.get('/fornecedores/');
            setFornecedores(response.data);
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
               alert("Sessão expirada. Faça o login novamente.");
               navigate('/login');
            }
        } finally {
            // Garante que o loading termine mesmo se a busca for chamada de novo
            setLoading(false);
        }
    };

    // Busca os dados iniciais quando a página carrega
    useEffect(() => {
        fetchData();
    }, []); // O array de dependências pode ficar vazio

    // Função para lidar com o cadastro e edição de fornecedores
    const handleCadastro = async (data) => {
        try {
            if (isEditing) {
                await api.patch(`/fornecedores/${editingId}/`, data);
                alert('Fornecedor atualizado com sucesso!');
            } else {
                await api.post('/fornecedores/', data);
                alert('Fornecedor cadastrado com sucesso!');
            }
            setIsEditing(false);
            setFormData({}); // Limpa os dados do formulário
            setEditingId(null);
            fetchData(); // Atualiza a tabela com os dados mais recentes
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            console.error('Erro ao salvar fornecedor:', errorMsg);
            alert(`Erro ao salvar fornecedor: ${errorMsg}`);
        }
    };

    // Preenche o formulário para edição
    const handleEdit = (fornecedor) => {
        // Passa o objeto inteiro do fornecedor para o formulário
        setFormData(fornecedor); 
        setIsEditing(true); 
        setEditingId(fornecedor.id); 
        window.scrollTo(0, 0); 
    };

    // Deleta um fornecedor
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
            try {
                await api.delete(`/fornecedores/${id}/`);
                alert('Fornecedor excluído com sucesso.');
                fetchData(); // Atualiza a tabela
            } catch (error) {
                console.error('Erro ao excluir fornecedor:', error);
                alert('Erro ao excluir fornecedor. Verifique se ele não está associado a algum produto.');
            }
        }
    };

    // Configurações da tabela e do formulário
    const colunasTabela = [
        { chave: 'id', nome: 'ID' },
        { chave: 'nome', nome: 'Nome do Fornecedor' },
        { chave: 'email', nome: 'Email' },
        { chave: 'telefone', nome: 'Telefone' },
        { chave: 'endereco', nome: 'Endereço' },
    ];

    const camposFormulario = [
        { nome: 'nome', label: 'Nome do Fornecedor', tipo: 'text' },
        { nome: 'email', label: 'Email', tipo: 'email' },
        { nome: 'telefone', label: 'Telefone', tipo: 'text' },
        { nome: 'endereco', label: 'Endereço', tipo: 'text' }
    ];
    
    // Estilos para o layout principal
    const styles = {
        mainContainer: {
            display: 'flex', // Alinha a Sidebar e o conteúdo lado a lado
        },
        contentWrapper: {
            flex: 1, // Faz o conteúdo principal ocupar o espaço restante
            marginLeft: '250px', // <<< CORREÇÃO DE LAYOUT 1: Empurra o conteúdo para dar espaço à Sidebar
        },
        main: {
            padding: '20px',
            marginTop: '70px', // <<< CORREÇÃO DE LAYOUT 2: Empurra o conteúdo para baixo do Header
            backgroundColor: '#f5f5f5', // Fundo da página
        },
        card: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // <<< CORREÇÃO DE LAYOUT 3: Adiciona a aparência de "card"
        },
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div style={styles.mainContainer}>
            <Sidebar currentPage="fornecedores" />
            <div style={styles.contentWrapper}>
                <Header />
                <main style={styles.main}>
                    <div style={styles.card}>
                        <h1 style={{ marginBottom: '20px' }}>
                            {isEditing ? "Editar Fornecedor" : "Cadastro de Fornecedores"}
                        </h1>
                        <CadastroForm
                            campos={camposFormulario}
                            onSubmit={handleCadastro}
                            initialData={formData}
                            isEditing={isEditing}
                        />
                    </div>
                    <div style={styles.card}>
                        <h2 style={{ marginBottom: '20px' }}>Fornecedores Cadastrados</h2>
                        <TabelaListagem
                            colunas={colunasTabela}
                            dados={fornecedores}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}