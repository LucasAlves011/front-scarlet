import './App.css';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Estoque from "./pages/Estoque1.jsx";
import TabelaTeste from "./pages/TabelaTeste.jsx";
import Estoque2 from './pages/Estoque2';
import Cadastro from './pages/Cadastro';
import EstoqueGeral from './pages/EstoqueGeral';

function App() {
  return (

    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/estoque/:marca" element={<Estoque2 />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/tabela" element={<TabelaTeste />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/teste" element={<TabelaTeste />} />
        <Route path="/geral" element={<EstoqueGeral />} />

      </Routes>
    </Router>

  );
}

export default App;
