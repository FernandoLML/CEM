import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });

export default function RedefinePasswordPage() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Processando...');
        setError('');
        try {
            await api.post('/password-reset/confirm/', { token, password });
            alert('Senha redefinida com sucesso! Você já pode fazer o login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.password || 'Token inválido ou expirado. Tente novamente.');
            setMessage('');
        }
    };

    // Estilos baseados na sua página de Login
    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#ffff' },
        card: { maxWidth: '400px', width: '100%', padding: '50px', backgroundColor: '#007BFF', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', color: '#fff', textAlign: 'center' },
        formGroup: { marginBottom: '15px' },
        label: { display: 'block', marginBottom: '5px', textAlign: 'left', marginLeft: '10px' },
        input: { width: '90%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' },
        button: { padding: '10px 40px', fontSize: '16px', backgroundColor: '#ffff', color: '#000000', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' },
        link: { color: '#FFD700', textDecoration: 'none', marginTop: '20px', display: 'inline-block' },
        message: { marginTop: '15px', color: '#e6e6e6' },
        error: { marginTop: '15px', color: '#ffcdd2', fontWeight: 'bold' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>Nova Senha</h1>
                <p style={{marginBottom: '20px'}}>Insira o token recebido e sua nova senha.</p>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="token" style={styles.label}>Token:</label>
                        <input
                            type="text" id="token" value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Token recebido"
                            style={styles.input} required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Nova Senha:</label>
                        <input
                            type="password" id="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite a nova senha"
                            style={styles.input} required
                        />
                    </div>
                    <button type="submit" style={styles.button}>Redefinir Senha</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
                {error && <p style={styles.error}>{error}</p>}
                <Link to="/login" style={styles.link}>Voltar para o Login</Link>
            </div>
        </div>
    );
}