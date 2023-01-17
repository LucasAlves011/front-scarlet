import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Estoque from "./pages/Estoque1.jsx";
import TabelaTeste from "./pages/TabelaTeste.jsx";
import Estoque2 from './pages/Estoque2';
import Teste from './pages/Teste';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/estoque/:marca" element={<Estoque2/>}/>
        <Route path="/estoque" element={<Estoque/>} />
        <Route path="/tabela" element={<TabelaTeste/>} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </Router>

  );
}

export default App;
