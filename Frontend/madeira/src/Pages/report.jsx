import React, { useState, useEffect, useCallback } from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });
api.interceptors.request.use(async (config) => { 
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
        config.headers.Authorization = `Token ${userData.token}`;
    }
    return config;
});

export default function RelatoriosPage() {
    const navigate = useNavigate();
    const [formato, setFormato] = useState("pdf");
    const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMeses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/relatorios/meses-disponiveis/');
            setMesesDisponiveis(response.data);
        } catch (error) {
            console.error("Erro ao buscar meses:", error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchMeses();
    }, [fetchMeses]);
    
    const handleDownload = async (ano, mes) => {
        // Adicionamos um console.log para depuração final
        console.log(`Iniciando download para Ano: ${ano}, Mês: ${mes}`);

        if (!ano || !mes) {
            alert("Erro: Ano ou Mês inválido. Não é possível gerar o relatório.");
            return;
        }

        try {
            alert(`Gerando relatório para ${String(mes).padStart(2, '0')}/${ano}...`);

            // --- MUDANÇA AQUI: A URL é montada de forma diferente ---
            // Os parâmetros 'ano' e 'mes' agora fazem parte do caminho principal.
            // O 'formato' continua como um parâmetro de query.
            const response = await api.get(`/relatorios/gerar-movimentacao/${ano}/${mes}/`, {
                params: { 
                    formato: formato 
                },
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const extension = formato === 'excel' ? 'xlsx' : 'pdf';
            const filename = `relatorio-movimentacoes-${String(mes).padStart(2, '0')}-${ano}.${extension}`;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erro ao baixar relatório:", error);
            alert("Falha ao gerar o relatório. Verifique o console (F12) para mais detalhes.");
        }
    };
    
    const styles = {
        mainContent: { flex: 1, marginLeft: '250px' },
        pageContent: { marginTop: '70px', padding: '20px' },
        mainCard: { backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
        title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
        formatSelector: { marginBottom: "20px", display: 'flex', alignItems: 'center', gap: '20px' },
        select: { padding: "8px", borderRadius: '5px', border: '1px solid #ccc' },
        grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px" },
        reportCard: { cursor: "pointer", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: '5px', textAlign: 'center' },
        cardIcon: { width: "60px", height: "60px", display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', backgroundColor: '#e9ecef', borderRadius: '50%' },
        cardText: { fontWeight: "bold", fontSize: "16px" }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar currentPage="relatorios" />
            <div style={styles.mainContent}>
                <Header />
                <main style={styles.pageContent}>
                    <div style={styles.mainCard}>
                        <h1 style={styles.title}>Relatórios de Movimentação</h1>
                        <div style={styles.formatSelector}>
                            <label style={{ fontWeight: "bold" }}>Formato:</label>
                            <select value={formato} onChange={(e) => setFormato(e.target.value)} style={styles.select}>
                                <option value="pdf">PDF</option>
                                <option value="excel">Excel (.xlsx)</option>
                            </select>
                        </div>
                        
                        {mesesDisponiveis.length > 0 ? (
                            <div style={styles.grid}>
                                {mesesDisponiveis.map((item) => (
                                    // --- CORREÇÃO PRINCIPAL AQUI ---
                                    // A 'key' deve ser única e estável. Usar ano-mes é ideal.
                                    // O 'onClick' agora está mais limpo e garantido de ter os dados do 'item'.
                                    <div
                                        key={`${item.ano}-${item.mes}`}
                                        style={styles.reportCard}
                                        onClick={() => handleDownload(item.ano, item.mes)}
                                    >
                                        <div style={styles.cardIcon}>
                                            {formato === 'pdf' ? <FaFilePdf size={24} color="#dc3545" /> : <FaFileExcel size={24} color="#28a745" />}
                                        </div>
                                        <span style={styles.cardText}>Relatório {item.nome}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhuma movimentação encontrada para gerar relatórios.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}