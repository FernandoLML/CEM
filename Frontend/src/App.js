import Login from "./pages/login"
import './App.css';
import axios from "axios";
import { userState } from "react"

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = userState(false);

  return(
    <Router>
      <Routes>
        <Route path= "/Login" element={<Login setUsuarioAutenticado={setUsuarioAutenticado}/>} />
        <Route path= "/dashboard"
          element={usuarioAutenticado ? <dashboard /> :<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;
