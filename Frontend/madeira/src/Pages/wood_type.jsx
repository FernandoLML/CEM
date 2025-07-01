import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TabelaListagem from '../Components/TabelaListagem';
import CadastroForm from '../Components/CadastroForm';
import { useNavigate } from 'react-router-dom';

// Instância e Interceptor do Axios (reutilizados)
const api = axios.create({ baseURL: 'http://localhost:8000/api' });
api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function WoodTypePage() {
    const navigate = useNavigate();

    // Estados para a lista de tipos de madeira e para o formulário
    const [tiposMadeira, setTiposMadeira] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para buscar os dados da API
    const fetchData = async () => {
        try {
            const response = await api.get('/tipos-madeira/');
            setTiposMadeira(response.data);
        } catch (error) {
            console.error("Erro ao buscar tipos de madeira:", error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
               alert("Sessão expirada. Faça o login novamente.");
               navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Busca os dados iniciais quando a página carrega
     useEffect(() => {
        // A função agora é declarada aqui dentro
        const fetchData = async () => {
            try {
                const response = await api.get('/tipos-madeira/');
                setTiposMadeira(response.data);
            } catch (error) {
                console.error("Erro ao buscar tipos de madeira:", error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                   alert("Sessão expirada. Faça o login novamente.");
                   navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        // E chamada logo em seguida
        fetchData();
        
    // A dependência 'navigate' pode ser mantida, pois vem de um hook, 
    // mas para buscar dados apenas uma vez, você pode até mesmo deixar o array vazio [].
    }, [navigate]);

    // Função para lidar com o cadastro e edição
    const handleCadastro = async (data) => {
        try {
            if (isEditing) {
                await api.patch(`/tipos-madeira/${editingId}/`, data);
                alert('Tipo de madeira atualizado com sucesso!');
            } else {
                await api.post('/tipos-madeira/', data);
                alert('Tipo de madeira cadastrado com sucesso!');
            }
            setIsEditing(false);
            setFormData({});
            setEditingId(null);
            fetchData();
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            alert(`Erro ao salvar tipo de madeira: ${errorMsg}`);
        }
    };

    // Preenche o formulário para edição
    const handleEdit = (tipoMadeira) => {
        setFormData(tipoMadeira);
        setIsEditing(true);
        setEditingId(tipoMadeira.id);
        window.scrollTo(0, 0); 
    };

    // Deleta um tipo de madeira
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            try {
                await api.delete(`/tipos-madeira/${id}/`);
                alert('Tipo de madeira excluído com sucesso.');
                fetchData();
            } catch (error) {
                alert('Erro ao excluir. Verifique se este tipo de madeira não está associado a algum produto.');
            }
        }
    };

    // Configurações da tabela e do formulário
    const colunasTabela = [
        { chave: 'id', nome: 'ID' },
        { chave: 'nome', nome: 'Nome' },
        { chave: 'descricao', nome: 'Descrição' },
    ];

    const camposFormulario = [
        { nome: 'nome', label: 'Nome do Tipo de Madeira', tipo: 'text', placeholder: 'Ex: Pinus' },
        { nome: 'descricao', label: 'Descrição', tipo: 'text', placeholder: 'Madeira de reflorestamento, clara e macia' },
    ];
    
    // Estilos para o layout
    const styles = {
        mainContent: { flex: 1, padding: "20px", backgroundColor: "#f5f5f5" },
        card: { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginBottom: "20px" },
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar currentPage="tipos-madeira" />
            <div style={{ flex: 1, marginLeft: '250px' }}>
                <Header />
                <main style={{ marginTop: '70px', padding: '20px', backgroundColor: '#f5f5f5' }}>
                    <div style={styles.card}>
                        <h1 style={{ marginBottom: '20px' }}>
                            {isEditing ? "Editar Tipo de Madeira" : "Cadastro de Tipos de Madeira"}
                        </h1>
                        <CadastroForm
                            campos={camposFormulario}
                            onSubmit={handleCadastro}
                            initialData={formData}
                            isEditing={isEditing}
                        />
                    </div>
                    <div style={styles.card}>
                        <h2 style={{ marginBottom: '20px' }}>Tipos de Madeira Cadastrados</h2>
                        <TabelaListagem
                            colunas={colunasTabela}
                            dados={tiposMadeira}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}