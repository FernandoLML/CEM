import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/login';
import Passreset from './Pages/passreset'; 
import Redefpass from './Pages/redefpass';
import Register from './Pages/register';
import HomePage from './Pages/home';
import ProdutosPageWrapper from './Pages/product';
import FornecedorPageWrapper from './Pages/supplier';
import MovimentacaoPage from './Pages/movement';
import ConsultaProdutosPage from './Pages/search';
import RelatoriosPage from './Pages/report';
import UsuariosPage from './Pages/user';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passreset" element={<Passreset />} />
          <Route path="/redefpass" element={<Redefpass />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/produtos" element={<ProtectedRoute><ProdutosPageWrapper /></ProtectedRoute>} />
          <Route path="/fornecedores" element={<ProtectedRoute><FornecedorPageWrapper /></ProtectedRoute>} />
          <Route path="/movimentacoes" element={<ProtectedRoute><MovimentacaoPage /></ProtectedRoute>} />
          <Route path="/consulta" element={<ProtectedRoute><ConsultaProdutosPage /></ProtectedRoute>} />
          <Route path="/relatorios" element={<ProtectedRoute><RelatoriosPage /></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><UsuariosPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
