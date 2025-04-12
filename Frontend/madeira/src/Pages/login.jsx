import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar validações ou autenticação
    alert(`Email: ${email}\nSenha: ${password}`);
    navigate('/home'); // Redireciona para a página Home
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
          height: '320px',
          padding: '50px',
          backgroundColor: '#007BFF',
          borderRadius: '10px',
          boxShadow: '0 4px 8px',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#fff',
                textAlign: 'left',
                marginLeft: '10px',
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
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
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#fff',
                textAlign: 'left',
                marginLeft: '10px',
              }}
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
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
            Entrar
          </button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '15px',
              color: '#ffff',
              fontSize: '14px',
            }}
          >
            <Link
              to="/register"
              style={{
                color: '#FFD700',
                textDecoration: 'none',
              }}
            >
              Cadastre-se
            </Link>
            <Link
              to="/passreset"
              style={{
                color: '#FFD700',
                textDecoration: 'none',
              }}
            >
              Esqueci minha senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;