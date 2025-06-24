import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import TabelaListagem from '../Components/TabelaListagem';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });
api.interceptors.request.use(async (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
        config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function HomePage() {
    const navigate = useNavigate();

    // Estados para os dados do dashboard
    const [stats, setStats] = useState({});
    const [produtosAmostra, setProdutosAmostra] = useState([]);
    const [fornecedoresAmostra, setFornecedoresAmostra] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            // Busca os dados de estatísticas, produtos e fornecedores em paralelo
            const [statsRes, produtosRes, fornecedoresRes] = await Promise.all([
                api.get('/dashboard-stats/'),
                api.get('/produtos/'),
                api.get('/fornecedores/')
            ]);
            
             setStats(statsRes.data || {}); 
            
            setProdutosAmostra(produtosRes.data.slice(0, 5));
            setFornecedoresAmostra(fornecedoresRes.data.slice(0, 5));

        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column', // Organiza o layout em coluna (Header em cima, Sidebar abaixo)
        height: '100vh',
      },
      contentWrapper: {
        display: 'flex',
        flex: 1,
        marginTop: '70px', // Compensa a altura do Header
      },
      sidebar: {
        width: '250px',
        backgroundColor: '#f9f9f9',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      },
      mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f5f5f5',
      },
      mainArea: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      },
    };

  if (loading) return <div>Carregando dashboard...</div>;

    return (
        <div style={styles.container}>
            <Header />
            <div style={{...styles.contentWrapper, marginLeft: '250px'}}>
                <Sidebar currentPage="dashboard"/>
                <main style={styles.mainContent}>
                    <div style={styles.mainArea}>
                        {/* Coluna principal com as listas */}
                        <div>
                            <div style={styles.card}>
                                <h3>Produtos Recentes</h3>
                                <TabelaListagem 
                                    colunas={[
                                        { chave: 'nome', nome: 'Nome' },
                                        { chave: 'tipo_de_madeira_nome', nome: 'Tipo' },
                                    ]}
                                    dados={produtosAmostra}
                                />
                            </div>
                            <div style={{ ...styles.card, marginTop: '20px' }}>
                                <h3>Fornecedores Recentes</h3>
                                <TabelaListagem
                                    colunas={[
                                        { chave: 'nome', nome: 'Nome' },
                                        { chave: 'email', nome: 'Email' },
                                    ]}
                                    dados={fornecedoresAmostra}
                                />
                            </div>
                        </div>

                        {/* Widgets de estatísticas */}
                        <div>
                            <div style={styles.card}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📦</div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{stats.total_produtos_em_estoque || 0} produtos em estoque</div>
                            </div>
                            <div style={{ ...styles.card, marginTop: '20px' }}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>👥</div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{stats.total_fornecedores || 0} fornecedores</div>
                            </div>
                            <div style={{ ...styles.card, marginTop: '20px' }}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    {/* Formata o valor para o padrão monetário brasileiro */}
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


