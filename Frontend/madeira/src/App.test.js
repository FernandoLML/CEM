import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock dos componentes de página
jest.mock('./Pages/login', () => () => <div>Login Page</div>);
jest.mock('./Pages/passreset', () => () => <div>Passreset Page</div>);
jest.mock('./Pages/redefpass', () => () => <div>Redefpass Page</div>);
jest.mock('./Pages/register', () => () => <div>Register Page</div>);

// Mock do contexto de autenticação
jest.mock('./AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>
}));

// Mock da rota protegida
jest.mock('./ProtectedRoute', () => ({ children }) => <div>{children}</div>);

describe('App routing', () => {
  test('deve redirecionar "/" para "/login"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('deve exibir a página de redefinição de senha', () => {
    render(
      <MemoryRouter initialEntries={['/redefpass']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Redefpass Page')).toBeInTheDocument();
  });

  test('deve exibir a página de registro', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Register Page')).toBeInTheDocument();
  });
});
