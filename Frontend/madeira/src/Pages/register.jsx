import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro concluído com sucesso!');
    navigate('/login'); // Redireciona para a página de login
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
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;