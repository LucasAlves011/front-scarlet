import { Link, Route, Router, Routes } from "react-router-dom";
import Cadastro from "./cadastro/Cadastro";
import Estoque1 from "./estoque/Estoque1";
import  styles  from "./Home.module.css"

function Home() {
   return (
      <nav className={styles.nav}>
         <ul className={styles.list}>
            <li className={styles.item}> <Link to="/">Home</Link></li>
            <li className={styles.item}> <Link to="/estoque">Estoque</Link></li>
            <li className={styles.item}> <Link to="/cadastro"> Cadastro</Link></li>
            <li className={styles.item}> <Link to="/catalogo">Catalogo</Link></li>
            <li className={styles.item}> <Link to="/venda">Venda</Link></li>
         </ul>
      </nav>
   );
}

export default Home;