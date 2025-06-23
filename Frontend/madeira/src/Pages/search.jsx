import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TabelaListagem from '../Components/TabelaListagem';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });
api.interceptors.request.use(async (config) => { 

  const userData = JSON.parse(localStorage.getItem('userData'));

    // 2. Verifica se os dados e o token existem
    if (userData && userData.token) {
        // 3. Adiciona o cabeçalho 'Authorization' no formato que o backend espera
        config.headers.Authorization = `Token ${userData.token}`;
    }

    // 4. Retorna a configuração modificada para que a requisição prossiga
    return config;
   });

export default function SearchPage() {
    const navigate = useNavigate();

    // Estados para os resultados da busca, termos de busca e filtros
    const [resultados, setResultados] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [filtros, setFiltros] = useState({
        tipo_de_madeira__nome: "",
        fornecedor__nome: "",
        condicao: ""
    });
    // Estados para preencher os dropdowns de filtro
    const [fornecedores, setFornecedores] = useState([]);
    const [tiposMadeira, setTiposMadeira] = useState([]);

    // Busca os dados para os filtros na primeira carga
    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const [fornecedoresRes, tiposMadeiraRes] = await Promise.all([
                    api.get('/fornecedores/'),
                    api.get('/tipos-madeira/')
                ]);
                setFornecedores(fornecedoresRes.data);
                setTiposMadeira(tiposMadeiraRes.data);
            } catch (error) {
                console.error("Erro ao carregar opções de filtro:", error);
            }
        };
        fetchFilterOptions();
    }, []);

    // Função que executa a busca na API
    const executarBusca = useCallback(async () => {
        try {
            // Constrói os parâmetros da query dinamicamente
            const params = { search: termoBusca };
            for (const key in filtros) {
                if (filtros[key]) { // Adiciona apenas filtros que têm valor
                    params[key] = filtros[key];
                }
            }
            const response = await api.get('/consulta-produtos/', { params });
            setResultados(response.data);
        } catch (error) {
            console.error("Erro ao realizar busca:", error);
        }
    }, [termoBusca, filtros]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar currentPage="consulta" />
            <div style={{ flex: 1, marginLeft: '250px' }}>
                <Header />
                <main style={{ marginTop: '70px', padding: '20px' }}>
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
                        <h1>Consulta de Produtos em Estoque</h1>
                        {/* Formulário de Busca */}
                        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr auto', gap: '15px', alignItems: 'flex-end' }}>
                            <input type="text" placeholder="Buscar por nome do produto..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} style={{ padding: '8px' }} />
                            
                            <select name="tipo_de_madeira__nome" value={filtros.tipo_de_madeira__nome} onChange={handleFilterChange} style={{ padding: '8px' }}>
                                <option value="">Tipo de Madeira</option>
                                {tiposMadeira.map(t => <option key={t.id} value={t.nome}>{t.nome}</option>)}
                            </select>
                            
                            <select name="fornecedor__nome" value={filtros.fornecedor__nome} onChange={handleFilterChange} style={{ padding: '8px' }}>
                                <option value="">Fornecedor</option>
                                {fornecedores.map(f => <option key={f.id} value={f.nome}>{f.nome}</option>)}
                            </select>

                            <select name="condicao" value={filtros.condicao} onChange={handleFilterChange} style={{ padding: '8px' }}>
                                <option value="">Condição</option>
                                <option value="NOVO">Novo</option>
                                <option value="USADO">Usado</option>
                                <option value="DEFEITUOSO">Defeituoso</option>
                                <option value="OUTRO">Outro</option>
                            </select>

                            <button onClick={executarBusca} style={{ padding: '8px 15px' }}>Buscar</button>
                        </div>
                    </div>
                    
                    {/* Tabela de Resultados */}
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
                        <TabelaListagem 
                            colunas={[
                                { chave: 'nome', nome: 'Produto' },
                                { chave: 'quantidade_em_estoque', nome: 'Qtd. em Estoque' },
                                { chave: 'fornecedor_nome', nome: 'Fornecedor' },
                                { chave: 'tipo_de_madeira_nome', nome: 'Tipo' },
                                { chave: 'condicao', nome: 'Condição' },
                                { chave: 'valor', nome: 'Valor (R$)' },
                            ]}
                            dados={resultados}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}