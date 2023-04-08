import './App.css';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'

import Home from "./pages/Home.jsx";
import Estoque1 from "./pages/estoque/Estoque1.jsx";
import TabelaTeste from "./pages/tests/TabelaTeste.jsx";
import Estoque2 from './pages/estoque/Estoque2.jsx';
import Cadastro from './pages/cadastro/Cadastro';
import Catalogo from './pages/venda/Catalogo.jsx';
import Venda from './pages/venda/Venda.jsx';
import Teste2 from './pages/tests/Teste2.jsx';
import PosVenda from './pages/venda/PosVenda';
import Relatorio1 from './pages/relatório/Relatorio1';
import DetalhesVenda from './pages/relatório/DetalhesVenda';

function App() {
  return (

    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/estoque/:marca" element={<Estoque2 />} />
        <Route path="/estoque" element={<Estoque1 />} />
        <Route path="/tabela" element={<TabelaTeste />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/venda" element={<Venda />} />
        <Route path="/sucesso" element={<PosVenda />} />
        <Route path="/vendas" element={<Relatorio1 />} />
        <Route path="/vendas/:data" element={<DetalhesVenda />} />


        <Route path="/teste" element={<TabelaTeste />} />
        <Route path="/teste2" element={<Teste2 />} />
      </Routes>
    </Router>

  );
}

export default App;
