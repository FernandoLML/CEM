import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate(); // <-- ADICIONADO: Inicializa o navigate

  // --- DECLARAÇÕES DE ESTADO NECESSÁRIAS ---
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nivelAcesso, setNivelAcesso] = useState('user'); // Padrão 'user' é uma boa prática

  // --- FUNÇÃO DE SUBMISSÃO DO FORMULÁRIO ---
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    const userData = {
        nome: username,
        email: email,
        senha: password,
        nivel_acesso: nivelAcesso,
    };

    try {
        const response = await fetch('http://localhost:8000/api/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Se a resposta não for OK, tratamos os diferentes tipos de erro
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorText = `Ocorreu um erro no servidor (Status: ${response.status}).`;

            // Verifica se a resposta é JSON antes de tentar analisá-la
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const errorData = await response.json();
                const errorMessage = Object.entries(errorData)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n');
                errorText = errorMessage; // Usa a mensagem de erro detalhada do JSON
            }
            // Se não for JSON, apenas joga o erro genérico (evita o crash)
            throw new Error(errorText);
        }

        alert('Usuário cadastrado com sucesso!');
        navigate('/login');
    } catch (error) {
        alert(`Erro ao cadastrar:\n${error.message}`);
    }
};


  return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#ffff',
            }}
        >
            <div
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '50px',
                    backgroundColor: '#007BFF',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="username"
                            style={{
                                display: 'block',
                                marginBottom: '5px',
                                color: '#fff',
                                textAlign: 'left',
                                marginLeft: '10px',
                            }}
                        >
                            Nome de Usuário:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Digite seu nome de usuário"
                            style={{
                                width: '90%',
                                padding: '10px',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="email"
                        // Estilo do label CORRIGIDO
                        style={{ display: 'block', marginBottom: '5px', color: '#fff', textAlign: 'left', marginLeft: '10px' }}
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        // Estilo do input CORRIGIDO
                        style={{ width: '90%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
                        required
                    />
                </div>
                    <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="password"
                        // Estilo do label CORRIGIDO
                        style={{ display: 'block', marginBottom: '5px', color: '#fff', textAlign: 'left', marginLeft: '10px' }}
                    >
                        Senha:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        // Estilo do input CORRIGIDO
                        style={{ width: '90%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
                        required
                    />
                </div>
                    
                    {/* --- CAMPO 'CONFIRMAR SENHA' ADICIONADO --- */}
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="confirmPassword"
                            style={{ display: 'block', marginBottom: '5px', color: '#fff', textAlign: 'left', marginLeft: '10px' }}
                        >
                            Confirmar Senha:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme sua senha"
                            style={{ width: '90%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
                            required
                        />
                    </div>

                    {/* --- CAMPO 'NÍVEL DE ACESSO' ADICIONADO --- */}
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="nivelAcesso"
                            style={{ display: 'block', marginBottom: '5px', color: '#fff', textAlign: 'left', marginLeft: '10px' }}
                        >
                            Nível de Acesso:
                        </label>
                        <select
                            id="nivelAcesso"
                            value={nivelAcesso}
                            onChange={(e) => setNivelAcesso(e.target.value)}
                            style={{ width: '95%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
                            required
                        >
                            <option value="user">Usuário</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '10px 40px',
                            fontSize: '16px',
                            backgroundColor: '#ffff',
                            color: '#000000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                        }}
                    >
                        Criar Conta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;