import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const Redefpass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    alert('Senha redefinida com sucesso!');
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
        <h1>Recuperação de Senha</h1>
        <form onSubmit={handleSubmit}>
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
              placeholder="Digite a nova senha"
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
              htmlFor="confirmPassword"
              style={{
                display: 'block',
                marginBottom: '5px',
                color: '#fff',
                textAlign: 'left',
                marginLeft: '10px',
              }}
            >
              Confirmar Senha:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
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
              padding: '10px 30px',
              fontSize: '16px',
              backgroundColor: '#ffff',
              color: '#000000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Redefpass;