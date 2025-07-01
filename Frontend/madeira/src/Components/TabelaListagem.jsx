import React from 'react';
// import { on } from 'pdfkit'; // REMOVIDO - Importação não utilizada
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Usando ícones para os botões
// import { TbBorderRight } from 'react-icons/tb'; // REMOVIDO - Importação não utilizada

const TabelaListagem = ({ colunas, dados, onEdit, onDelete, rowStyleRule }) => {

    const getRowStyle = (item) => {
        if (!rowStyleRule) return {}; // Se não houver regra, não aplica estilo

        const { chave, cores } = rowStyleRule;
        const valorDoItem = item[chave]; // Pega o valor do campo (ex: 'ENTRADA')

        return cores[valorDoItem] || {}; // Retorna o objeto de estilo correspondente ou um objeto vazio
    };

    // Estilos para a tabela (podem ser movidos para um .css se preferir)
    const styles = {
        listagem: {
            marginTop: '20px',
            overflowX: 'auto', // Garante que a tabela seja rolável em telas pequenas
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        tabela: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: "#fff",
            borderRadius: '8px',
            overflow: 'hidden', // Garante que as bordas arredondadas funcionem corretamente
        },
        th: {
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '12px 15px',
            textAlign: 'left',
            fontWeight: 'bold',
            borderRight: '1px solid #0056b3', // Adiciona uma borda entre as colunas
        },
        td: {
            padding: '12px 15px',
            borderBottom: '1px solid #ddd',
            verticalAlign: 'middle',
            borderRight: '1px solid #ddd', // Adiciona uma borda entre as colunas
        },
        actionsContainer: {
            display: 'flex',
            alignItems: 'center', // Centraliza os botões verticalmente
            gap: '10px',
        },
        actionBtn: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            padding: 0,
        },
    };

    // Verifica se há dados para exibir
    if (!dados || dados.length === 0) {
        return <p>Nenhum item cadastrado.</p>;
    }
    
    // Pega a chave do identificador (ex: 'id' ou 'id_usuario') da primeira coluna
    const idKey = colunas[0]?.chave || 'id';

    return (
        <section style={{ marginTop: '20px' }}>
            <div style={styles.listagem}>
                <table style={styles.tabela}>
                    <thead>
                        <tr>
                            {/* 1. Cria os cabeçalhos dinamicamente a partir da prop 'colunas' */}
                            {colunas.map((coluna, index) => (
                                <th key={coluna.chave} style={index === colunas.length - 1 ? {...styles.th, borderRight: 'none'} : styles.th}>{coluna.nome}</th>
                            ))}
                            {/* REFINAMENTO: O cabeçalho 'Ações' só aparece se onEdit ou onDelete existirem */}
                            {(onEdit || onDelete) && <th style={{...styles.th, borderRight: 'none'}}>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {/* 2. Cria as linhas dinamicamente a partir da prop 'dados' */}
                        {dados.map((item) => (
                            <tr key={item[idKey]} style={getRowStyle(item)}>
                                {/* 3. Cria as células de cada linha baseadas nas 'colunas' */}
                                {colunas.map((coluna, index) => (
                                    <td key={`${item[idKey]}-${coluna.chave}`} style={index === colunas.length - 1 ? {...styles.td, borderRight: 'none'} : styles.td}>
                                        {item[coluna.chave]}
                                    </td>
                                ))}
                                {/* 4. Célula de Ações com botões que chamam as funções do pai */}
                                {(onEdit || onDelete) && (    
                                    <td style={{...styles.td, borderRight: 'none'}}>
                                        <div style={styles.actionsContainer}>
                                            {onEdit && (
                                                <button onClick={() => onEdit(item)} style={{...styles.actionBtn, color: '#ffc107'}} title="Editar">
                                                    <FaEdit />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button onClick={() => onDelete(item.id || item.id_usuario)} style={{...styles.actionBtn, color: '#dc3545'}} title="Excluir">
                                                    <FaTrashAlt />
                                                </button>
                                            )}    
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TabelaListagem;