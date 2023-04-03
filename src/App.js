import './App.css';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Estoque from "./pages/Estoque1.jsx";
import TabelaTeste from "./pages/TabelaTeste.jsx";
import Estoque2 from './pages/Estoque2';
import Cadastro from './pages/Cadastro';
import EstoqueGeral from './pages/EstoqueGeral';
import Venda from './pages/Venda';
import Teste2 from './pages/Teste2';

function App() {
  return (

    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/estoque/:marca" element={<Estoque2 />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/tabela" element={<TabelaTeste />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/geral" element={<EstoqueGeral />} />
        <Route path="/venda" element={<Venda />} />

        <Route path="/teste" element={<TabelaTeste />} />
        <Route path="/teste2" element={<Teste2 />} />
      </Routes>
    </Router>

  );
}

export default App;
