import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const Passreset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}`);
    navigate('/redefpass'); // Redireciona para a página de redefinição de senha
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
              placeholder="Digite o email cadastrado"
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

export default Passreset;