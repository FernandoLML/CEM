// __tests__/TabelaListagem.test.jsx
import { render, screen } from '@testing-library/react';
import TabelaListagem from '../Components/TabelaListagem';

test('renderiza a tabela com os títulos corretos', () => {
  render(<TabelaListagem />);
  expect(screen.getByText(/nome/i)).toBeInTheDocument();
  expect(screen.getByText(/tipo de madeira/i)).toBeInTheDocument();
  expect(screen.getByText(/fornecedor/i)).toBeInTheDocument();
  expect(screen.getByText(/dimensões/i)).toBeInTheDocument();
  expect(screen.getByText(/preço/i)).toBeInTheDocument();
  expect(screen.getByText(/estoque atual/i)).toBeInTheDocument();
  expect(screen.getByText(/ações/i)).toBeInTheDocument();
});