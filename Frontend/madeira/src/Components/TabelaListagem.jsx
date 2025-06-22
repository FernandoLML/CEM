import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Usando ícones para os botões

const TabelaListagem = ({ colunas, dados, onEdit, onDelete }) => {
    // Estilos para a tabela (podem ser movidos para um .css se preferir)
    const styles = {
        listagem: {
            marginTop: '20px',
            overflowX: 'auto', // Garante que a tabela seja rolável em telas pequenas
        },
        tabela: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: "#fff",
        },
        th: {
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '12px 15px',
            textAlign: 'left',
            fontWeight: 'bold',
        },
        td: {
            padding: '12px 15px',
            borderBottom: '1px solid #ddd',
        },
        actionsTd: {
            display: 'flex',
            gap: '10px',
        },
        actionBtn: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
        },
    };

    // Verifica se há dados para exibir
    if (!dados || dados.length === 0) {
        return <p>Nenhum item cadastrado.</p>;
    }
    
    // Pega a chave do identificador (ex: 'id' ou 'id_usuario') da primeira coluna
    const idKey = colunas[0]?.chave || 'id';

    return (
        <section style={styles.listagem}>
            <table style={styles.tabela}>
                <thead>
                    <tr>
                        {/* 1. Cria os cabeçalhos dinamicamente a partir da prop 'colunas' */}
                        {colunas.map((coluna) => (
                            <th key={coluna.chave} style={styles.th}>{coluna.nome}</th>
                        ))}
                        <th style={styles.th}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 2. Cria as linhas dinamicamente a partir da prop 'dados' */}
                    {dados.map((item) => (
                        <tr key={item[idKey]}>
                            {/* 3. Cria as células de cada linha baseadas nas 'colunas' */}
                            {colunas.map((coluna) => (
                                <td key={`${item[idKey]}-${coluna.chave}`} style={styles.td}>
                                    {item[coluna.chave]}
                                </td>
                            ))}
                            {/* 4. Célula de Ações com botões que chamam as funções do pai */}
                            <td style={{...styles.td, ...styles.actionsTd}}>
                                <button onClick={() => onEdit(item)} style={{...styles.actionBtn, color: '#ffc107'}} title="Editar">
                                    <FaEdit />
                                </button>
                                <button onClick={() => onDelete(item[idKey])} style={{...styles.actionBtn, color: '#dc3545'}} title="Excluir">
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default TabelaListagem;