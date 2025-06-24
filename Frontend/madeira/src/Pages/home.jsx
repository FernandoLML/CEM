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
    const [topProdutos, setTopProdutos] = useState([]);
    const [fornecedoresRecentes, setFornecedoresRecentes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            // --- CORREÇÃO: Chamamos a URL correta do dashboard ---
            const response = await api.get('/dashboard-stats/');
            
            setStats(response.data.stats || {}); 
            setTopProdutos(response.data.top_produtos || []);
            setFornecedoresRecentes(response.data.fornecedores_recentes || []);
        } catch (error) {
            // ...
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                            <div style={styles.card}>
                                <h3>Produtos Mais Movimentados</h3>
                                <TabelaListagem 
                                    colunas={[
                                        { chave: 'nome', nome: 'Nome' },
                                        { chave: 'tipo_de_madeira_nome', nome: 'Tipo' },
                                        // O backend envia a quantidade em estoque dos produtos mais movimentados
                                        { chave: 'quantidade_em_estoque', nome: 'Qtd. Estoque' },
                                    ]}
                                    dados={topProdutos}
                                />
                            </div>

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