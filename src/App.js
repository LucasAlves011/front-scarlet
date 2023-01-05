import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from "./pages/Home.jsx";
import Estoque from "./pages/Estoque1.jsx";
import TabelaTeste from "./pages/TabelaTeste.jsx";
import Estoque2 from './pages/Estoque2';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/estoque/:id" element={<Estoque2 />}/>
        <Route path="/estoque" element={<Estoque/>} />
        <Route path="/tabela" element={<TabelaTeste/>} />
      </Routes>
    </Router>

  );
}

export default App;
