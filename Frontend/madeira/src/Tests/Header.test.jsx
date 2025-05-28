// __tests__/Header.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../Components/Header';


test('exibe o título e o texto de boas-vindas no header', () => {
  render(<Header isSidebarOpen={false} />);
  expect(screen.getByText(/controle de estoque/i)).toBeInTheDocument();
  expect(screen.getByText(/bem-vindo, user/i)).toBeInTheDocument();
});
