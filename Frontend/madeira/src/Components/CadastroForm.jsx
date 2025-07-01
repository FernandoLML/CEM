import React, { useState, useEffect } from 'react';

const CadastroForm = ({ campos, onSubmit, initialData = {}, isEditing = false }) => {
    // 1. O estado interno do formulário
    const [formData, setFormData] = useState(initialData);

    // 2. Este useEffect "escuta" as mudanças nos dados iniciais.
    // É isso que faz o formulário se preencher quando você clica em "Editar".
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    // 3. Função para atualizar o estado quando o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 4. Função para submeter o formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Chama a função da página pai (handleCadastro)
        if (!isEditing) {
            setFormData({}); // Limpa o formulário se for um novo cadastro
        }
    };
    
    // Estilos...
    const styles = {
        form: { padding: '10px' },
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
        field: { marginBottom: '15px' },
        label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
        input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
        buttonContainer: { gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' },
        button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', color: 'white' },
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid}>
                {/* Renderiza os campos dinamicamente */}
                {campos.map((campo) => (
                    <div key={campo.nome} style={styles.field}>
                        <label htmlFor={campo.nome} style={styles.label}>
                            {campo.label}
                        </label>
                        {campo.tipo === 'select' ? (
                            <select
                                id={campo.nome}
                                name={campo.nome}
                                value={formData[campo.nome] || ''}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            >
                                <option value="">Selecione...</option>
                                {campo.opcoes.map(opcao => (
                                    <option key={opcao.valor} value={opcao.valor}>
                                        {opcao.texto}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={campo.tipo}
                                id={campo.nome}
                                name={campo.nome}
                                value={formData[campo.nome] || ''}
                                onChange={handleChange}
                                placeholder={campo.placeholder || ''}
                                style={styles.input}
                                required
                            />
                        )}
                    </div>
                ))}
            </div>
            <div style={styles.buttonContainer}>
                <button type="submit" style={{ ...styles.button, backgroundColor: isEditing ? '#28a745' : '#007BFF' }}>
                    {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
            </div>
        </form>
    );
};

export default CadastroForm;