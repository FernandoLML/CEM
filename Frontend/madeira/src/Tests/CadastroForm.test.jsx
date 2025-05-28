import { render, screen } from '@testing-library/react';
import CadastroForm from '../Components/CadastroForm';

test('renderiza campos principais do formulário de cadastro', () => {
  render(<CadastroForm />);
  expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/tipo de madeira/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/fornecedor/i)).toBeInTheDocument();
  expect(screen.getByText(/cadastrar/i)).toBeInTheDocument();
});
