import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import TabelaListagem from '../Components/TabelaListagem';
import { useNavigate } from 'react-router-dom';

// Instância do Axios para se comunicar com o backend
const api = axios.create({ baseURL: 'http://localhost:8000/api' });

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
        config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function HomePage() {
    const navigate = useNavigate();

    // --- ESTADOS CORRIGIDOS ---
    // Agora temos estados para cada tipo de dado que o dashboard recebe
    const [stats, setStats] = useState({});
    const [topProdutos, setTopProdutos] = useState([]);
    const [fornecedoresRecentes, setFornecedoresRecentes] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- FUNÇÃO DE BUSCA DE DADOS CORRIGIDA ---
    const fetchData = useCallback(async () => {
        try {
            // Agora fazemos apenas UMA chamada para o endpoint do dashboard
            const response = await api.get('/dashboard-stats/');
            
            // Preenchemos os estados com os dados recebidos do backend
            setStats(response.data.stats || {}); 
            setTopProdutos(response.data.top_produtos || []);
            setFornecedoresRecentes(response.data.fornecedores_recentes || []);

        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça o login novamente.");
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // O useEffect agora depende da função fetchData otimizada
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Estilos para o layout
    const styles = {
        mainContent: { flex: 1, marginLeft: '250px' },
        pageContent: { marginTop: '70px', padding: '20px', backgroundColor: '#f5f5f5' },
        mainArea: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
        card: { backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' },
        widgetContent: { fontSize: '16px', fontWeight: 'bold', marginTop: '10px' },
        widgetIcon: { fontSize: '40px', marginBottom: '10px' },
    };

    if (loading) return <div>Carregando dashboard...</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Header />
            <Sidebar currentPage="dashboard"/>
            <div style={styles.mainContent}>
                <main style={styles.pageContent}>
                    <div style={styles.mainArea}>
                        {/* Coluna principal com as listas */}
                        <div>
                            {/* --- TABELA DE TOP PRODUTOS --- */}
                            <div style={styles.card}>
                                <h3>Produtos Mais Movimentados</h3>
                                <TabelaListagem 
                                    // --- CORREÇÃO AQUI ---
                                    colunas={[
                                        { chave: 'nome', nome: 'Nome' },
                                        // Trocamos 'quantidade_em_estoque' por 'num_movimentacoes'
                                        { chave: 'num_movimentacoes', nome: 'Nº de Movimentações' },
                                        { chave: 'fornecedor_nome', nome: 'Fornecedor' },
                                    ]}
                                    dados={topProdutos}
                                />
                            </div>

                            {/* --- TABELA DE FORNECEDORES RECENTES --- */}
                            <div style={{ ...styles.card, marginTop: '20px' }}>
                                <h3>Fornecedores Recentes</h3>
                                <TabelaListagem
                                    colunas={[
                                        { chave: 'nome', nome: 'Nome' },
                                        { chave: 'email', nome: 'Email' },
                                    ]}
                                    dados={fornecedoresRecentes}
                                />
                            </div>
                        </div>

                        {/* Widgets de estatísticas */}
                        <div>
                            <div style={styles.card}>
                                <div style={styles.widgetIcon}>📦</div>
                                <div style={styles.widgetContent}>{stats.total_produtos_em_estoque || 0} produtos em estoque</div>
                            </div>
                            <div style={{ ...styles.card, marginTop: '20px' }}>
                                <div style={styles.widgetIcon}>👥</div>
                                <div style={styles.widgetContent}>{stats.total_fornecedores || 0} fornecedores</div>
                            </div>
                            <div style={{ ...styles.card, marginTop: '20px' }}>
                                <div style={styles.widgetIcon}>💰</div>
                                <div style={styles.widgetContent}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.valor_total_estoque || 0)} em estoque
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}