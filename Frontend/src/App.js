import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Corrigido
import Login from "./pages/login";
import InventoryControl from "./pages";

import Dashboard from "./pages/dashboard"; // Corrigido: Importe o Dashboard
import './App.css';


function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false); // Corrigido: useState ao invés de userState

  return (
    <Router>
      <Routes>
        <Route path="/InvetoryControl"></Route>
        
      </Routes>
    </Router>
  );
}

export default App;
