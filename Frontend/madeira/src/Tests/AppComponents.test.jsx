// AppComponents.test.jsx
import { render, screen } from '@testing-library/react';
import CadastroForm from '../CadastroForm';
import Header from '../Header';
import Sidebar from '../Sidebar';
import TabelaListagem from '../TabelaListagem';

describe('CadastroForm', () => {
  test('renderiza campos principais do formulário de cadastro', () => {
    render(<CadastroForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de madeira/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fornecedor/i)).toBeInTheDocument();
    expect(screen.getByText(/cadastrar/i)).toBeInTheDocument();
  });
});

describe('Header', () => {
  test('exibe o título e o texto de boas-vindas no header', () => {
    render(<Header isSidebarOpen={false} />);
    expect(screen.getByText(/controle de estoque/i)).toBeInTheDocument();
    expect(screen.getByText(/bem-vindo, user/i)).toBeInTheDocument();
  });
});

describe('Sidebar', () => {
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
});

describe('TabelaListagem', () => {
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
});
