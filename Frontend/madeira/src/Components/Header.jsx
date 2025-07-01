import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    // --- LÓGICA PARA RESPONSIVIDADE ---
    // 1. Estado para guardar a largura da tela
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Função para atualizar a largura do estado quando a janela mudar de tamanho
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Adiciona um "ouvinte" para o evento de redimensionamento da janela
        window.addEventListener('resize', handleResize);

        // Limpa o "ouvinte" quando o componente for desmontado (boa prática)
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // --- FIM DA LÓGICA PARA RESPONSIVIDADE ---


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData && userData.nome) {
                setUserName(userData.nome);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };

    const styles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            height: '70px',
            boxSizing: 'border-box',
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            height: '50px',
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
        },
        welcomeText: {
            marginRight: '20px',
            whiteSpace: 'nowrap', // Impede que o texto quebre em várias linhas
        },
        logoutButton: {
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
        },
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                {/* Garanta que a imagem 'logo-branca.png' está na pasta /public */}
                <img src="/Logo_LignaStock.ico" alt="Logo" style={styles.logo} />
            </div>
            <div style={styles.userInfo}>
                {/* --- MUDANÇA PARA O TEXTO RESPONSIVO --- */}
                {/* 2. O texto só é exibido se a largura da tela for maior que 600px */}
                {windowWidth > 600 && (
                    <span style={styles.welcomeText}>
                        {userName ? `Bem-vindo(a), ${userName}` : 'Bem-vindo(a)'}
                    </span>
                )}
                <button onClick={handleLogout} style={styles.logoutButton} title="Sair">
                    <FaSignOutAlt />
                </button>
            </div>
        </header>
    );
};

export default Header;