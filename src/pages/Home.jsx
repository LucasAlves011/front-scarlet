import { Link, Route, Router, Routes } from "react-router-dom";
import Cadastro from "./Cadastro";
import Estoque1 from "./Estoque1";
import  styles  from "./Home.module.css"

function Home() {
   return (
      <nav className={styles.nav}>
         <ul className={styles.list}>
            <li className={styles.item}> <Link to="/">Home</Link></li>
            <li className={styles.item}> <Link to="/estoque">Estoque</Link></li>
            <li className={styles.item}> <Link to="/cadastro"> Cadastro</Link></li>
            <li className={styles.item}> <Link to="/geral">Geral</Link></li>
            <li className={styles.item}> <Link to="/venda">Venda</Link></li>
         </ul>
      </nav>
   );
}

export default Home;