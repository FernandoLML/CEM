import React, { useState, useEffect, useCallback } from 'react'; // Importa useCallback
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TabelaListagem from '../Components/TabelaListagem';
import CadastroForm from '../Components/CadastroForm';



const formatarData = (dataISO) => {
    if (!dataISO) return ''; // Retorna vazio se a data for nula
    const data = new Date(dataISO);
    // toLocaleString com 'pt-BR' já formata para DD/MM/AAAA, HH:mm:ss
    return data.toLocaleString('pt-BR');
};


// Instância e Interceptor do Axios (reutilizados)
const api = axios.create({ baseURL: 'http://localhost:8000/api' });
api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function MovementPage() {
    
    // Estados para o histórico, produtos (para o dropdown) e loading
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

     const [formData, setFormData] = useState({});
    // Função para buscar os dados da API, otimizada com useCallback
    // --- CORREÇÃO: Função fetchData declarada com useCallback ---
    // A função agora é declarada no escopo principal do componente,
    // tornando-a acessível para todos.
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [movRes, prodRes] = await Promise.all([
                api.get('/movimentacoes-estoque/'),
                api.get('/produtos/')
            ]);

            // --- 2. APLICA A FORMATAÇÃO ANTES DE SALVAR NO ESTADO ---
            // Usamos .map() para criar um novo array com a data já formatada
            const movimentacoesFormatadas = movRes.data.map(mov => ({
                ...mov, // Mantém todos os dados originais da movimentação
                data_movimentacao: formatarData(mov.data_movimentacao) // Sobrescreve apenas o campo da data com a versão formatada
            }));

            setMovimentacoes(movimentacoesFormatadas);
            setProdutos(prodRes.data);
        } catch (error) {
            // ... (seu tratamento de erro)
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]); // A dependência agora é a própria função fetchData

    // Função para registrar uma nova movimentação
    // Função para registrar uma nova movimentação (agora funciona)
    const handleCadastro = async (dadosDoFormulario) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            alert('Usuário não identificado. Faça o login.');
            return;
        }

        const payload = { 
            ...dadosDoFormulario, 
            usuario: userData.id,
            // Validações para garantir que os valores são enviados corretamente
            quantidade: parseInt(dadosDoFormulario.quantidade, 10) || 0,
            produto: parseInt(dadosDoFormulario.produto, 10) || null
        };
        
        // Impede o envio se um produto não for selecionado
        if (!payload.produto) {
            alert("Por favor, selecione um produto.");
            return;
        }

        try {
            await api.post('/movimentacoes-estoque/', payload);
            alert('Movimentação registrada com sucesso!');
            fetchData(); // Atualiza a tabela
            setFormData({}); // Limpa o formulário após o sucesso
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            alert(`Erro ao registrar movimentação: ${errorMsg}`);
        }
    };

    // Configurações da tabela e do formulário
    const colunasTabela = [
        { chave: 'id', nome: 'ID Mov.' },
        { chave: 'produto_nome', nome: 'Produto' },
        { chave: 'tipo_movimentacao', nome: 'Tipo' },
        { chave: 'quantidade', nome: 'Quantidade' },
        { chave: 'data_movimentacao', nome: 'Data' }, // O backend já formata a data
        { chave: 'usuario_email', nome: 'Registrado por' },
        { chave: 'observacoes', nome: 'Observações' },
    ];

    const camposFormulario = [
        { nome: 'produto', label: 'Produto', tipo: 'select', opcoes: produtos.map(p => ({ valor: p.id, texto: p.nome })) },
        { 
            nome: 'tipo_movimentacao', label: 'Tipo de Movimentação', tipo: 'select',
            opcoes: [ 
                { valor: 'ENTRADA', texto: 'Entrada' }, 
                { valor: 'SAIDA', texto: 'Saída' },
                { valor: 'AJUSTE', texto: 'Ajuste' }
            ]
        },
        { nome: 'quantidade', label: 'Quantidade', tipo: 'number', placeholder: 'Ex: 10' },
        { nome: 'observacoes', label: 'Observações (Opcional)', tipo: 'text' },
    ];
    
    // Estilos para o layout
    const styles = {
        mainContainer: {
            display: 'flex',
        },
        contentWrapper: {
            flex: 1,
            marginLeft: '250px',
        },
        main: {
            padding: '20px',
            marginTop: '70px',
            backgroundColor: '#f5f5f5',
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
        <div style={styles.mainContainer}>
            <Sidebar currentPage="movimentacoes" />
            <div style={styles.contentWrapper}>
                <Header />
                <main style={styles.main}>
                    <div style={styles.card}>
                        <h1 style={{ marginBottom: '20px' }}>Registrar Movimentação de Estoque</h1>
                        <CadastroForm 
                            campos={camposFormulario} 
                            onSubmit={handleCadastro}
                            initialData={formData}
                        />
                    </div>
                    <div style={styles.card}>
                        <h2 style={{ marginBottom: '20px' }}>Histórico de Movimentações</h2>
                        <TabelaListagem
                            colunas={colunasTabela}
                            dados={movimentacoes}
                            // Não teremos edição/exclusão de movimentações por padrão
                            onEdit={null}
                            onDelete={null}
                            // Prop especial para a lógica de cores
                            rowStyleRule={{
                                chave: 'tipo_movimentacao', // Campo a ser verificado
                                cores: {
                                    'ENTRADA': { backgroundColor: '#e5ffe5' }, // Verde suave para entrada
                                    'SAIDA':   { backgroundColor: '#e5f2ff' }, // Azul suave para saída
                                    'AJUSTE':  { backgroundColor: '#fffbe5' }, // Amarelo suave para ajuste
                                }
                            }}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}