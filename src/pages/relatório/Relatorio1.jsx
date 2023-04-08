import { format, parseISO } from 'date-fns';
import style from './Relatorio1.module.css'
import { useState, useEffect } from 'react';
import { ptBR } from 'date-fns/locale';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdPix } from 'react-icons/md';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { formatoDinheiroReal } from '../../utils/NumeroFormaters';
import { useNavigate } from 'react-router-dom';


function CardDia2({ dia }) {
   const navigate = useNavigate()

   return (
      <section className={style.cardDia2} onClick={() => {
         navigate(format(parseISO(dia.data), "dd-MM-yyyy"))
      }}>
         <p>
            {format(parseISO(dia.data), "dd/MM/yyyy")}
         </p>
         <p id={style.diaPorExtenso}>
            {format(parseISO(dia.data), "ccc", { locale: ptBR }).charAt(0).toUpperCase() + format(parseISO(dia.data), "ccc", { locale: ptBR }).slice(1)}
         </p>
         <p>{dia.quantidadeVendas} vendas</p>
         <div className={style.figura2}>
            <BsFillCreditCard2BackFill />
            <p>{formatoDinheiroReal(dia.cartao)}</p>
         </div>
         <div className={style.figura2}>
            <MdPix />
            <p>{formatoDinheiroReal(dia.pix)}</p>
         </div>
         <div className={style.figura2}>
            <FaMoneyBillWave />
            <p>{formatoDinheiroReal(dia.dinheiro)}</p>
         </div>
         <p>{formatoDinheiroReal(dia.total)}</p>
      </section>
   )
}


function Relatorio1() {

   const [qtdVendas, setQtdVendas] = useState(0);
   const [vendaDoisDiasAtras, setVendaDoisDiasAtras] = useState();
   const [vendas, setVendas] = useState([]);

   useEffect(() => {
      fetch("http://192.168.0.12:8080/venda")
         .then(res => res.json())
         .then(res => {
            setQtdVendas(res.length);
            setVendas(res);
         })
   }, [])

   useEffect(() => {
      fetch("http://192.168.0.12:8080/venda/resumo-semana")
         .then(res => res.json())
         .then(res => {
            console.log("aqui")
            setVendaDoisDiasAtras(res)
         })
   }, [])


   return (
      <>
         <div id={style.titulo}>
            <h1>{qtdVendas} vendas realizadas hoje!</h1>
            <h2>R$ 100,00</h2>
            <a href="./">detalhes</a>
         </div>

         <div className={style.resumoSemana}>
            <h1>Últimos 7 dias</h1>
            <ul className={style.ul1}>

               {vendaDoisDiasAtras && vendaDoisDiasAtras.map((venda, key) => {
                  return <li><CardDia2 dia={venda} key={key} /></li>
               })}
            </ul>
            <div id={style.pesquisa}>Pesquisar vendas anteriores</div>
         </div>
      </>
   );
}

export default Relatorio1;