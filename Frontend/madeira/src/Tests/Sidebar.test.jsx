// __tests__/Sidebar.test.jsx
import { render, screen } from '@testing-library/react';
import Sidebar from '../Components/Sidebar';

test('renderiza os links do menu lateral', () => {
  render(
    <MemoryRouter>
      <Sidebar currentPage="produtos" />
    </MemoryRouter>
  );

  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/produtos/i)).toBeInTheDocument();
  expect(screen.getByText(/movimentações/i)).toBeInTheDocument();
  expect(screen.getByText(/usuários/i)).toBeInTheDocument();
  expect(screen.getByText(/relatórios/i)).toBeInTheDocument();
  expect(screen.getByText(/consulta/i)).toBeInTheDocument();
  expect(screen.getByText(/fornecedores/i)).toBeInTheDocument();
});