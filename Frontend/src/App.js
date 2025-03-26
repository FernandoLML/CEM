import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Corrigido
import Login from "./pages/login";
import Dashboard from "./pages/dashboard"; // Corrigido: Importe o Dashboard
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false); // Corrigido: useState ao invés de userState

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setUsuarioAutenticado={setUsuarioAutenticado} />} />
        <Route path="/dashboard" element={usuarioAutenticado ? <Dashboard /> : <Navigate to="/" />} /> {/* Corrigido: Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
