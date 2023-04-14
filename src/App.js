import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, Navigate, useNavigate } from 'react-router-dom'

import Home from "./pages/Home.jsx";
import Estoque1 from "./pages/estoque/Estoque1.jsx";
import TabelaTeste from "./pages/tests/TabelaTeste.jsx";
import Estoque2 from './pages/estoque/Estoque2.jsx';
import Cadastro from './pages/cadastro/Cadastro';
import Catalogo from './pages/venda/Catalogo.jsx';
import Venda from './pages/venda/Venda.jsx';
import Teste2 from './pages/tests/Teste2.jsx';
import PosVenda from './pages/venda/PosVenda.jsx';
import Relatorio1 from './pages/relatório/Relatorio1.jsx';
import DetalhesVenda from './pages/relatório/DetalhesVenda.jsx';
import EditarProduto from './pages/estoque/EditarProduto.jsx';
import { Nav, Navbar } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { useEffect, useState } from 'react';


const CustomNavbar = () => {

  const [marcas, setMarcas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(process.env.REACT_APP_GATEWAY_URL + "/produto/quantidade-marcas").then((data) => data.json()).then((val) => {
      setMarcas(val.map(({ marca }) => marca))
    })

  }, [])


  return (
    <Navbar id='teste'>
      <Navbar.Brand href="/catalogo">
        {/* <img src={process.env.REACT_APP_GATEWAY_URL+"/estoque/produto/logo"} alt="foto" /> */}
        <img src="src\apMultimarcas32x.png" alt="foto" />
        AP Multimarcas</Navbar.Brand>
      <Nav >
        <Nav.Item href="/catalogo">Catálogo</Nav.Item>
        <Nav.Item href="/vendas">Vendas</Nav.Item>
        <Nav.Menu title="Produtos">
          <Nav.Item onClick={() => navigate("/cadastro")}  >
            Cadastro
          </Nav.Item>
          <Nav.Item onClick={() => navigate("/estoque")}>Estoque
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
};

function App() {
  return (

    <>

      <Router>
        <CustomNavbar ></CustomNavbar>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/estoque" element={<Estoque1 />} />
          <Route path="/estoque/:marca" element={<Estoque2 />} />
          <Route path="/estoque/alterar-produto/:id" element={<EditarProduto />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/venda" element={<Venda />} />
          <Route path="/venda/sucesso" element={<PosVenda />} />
          <Route path="/vendas" element={<Relatorio1 />} />
          <Route path="/vendas/:data" element={<DetalhesVenda />} />


          <Route path="/teste" element={<TabelaTeste />} />
          <Route path="/teste2" element={<Teste2 />} />
        </Routes>
      </Router>

    </>


  );
}

export default App;
