import { format, parseISO } from 'date-fns';
import style from './Relatorio1.module.css'
import { useState, useEffect } from 'react';
import { ptBR } from 'date-fns/locale';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdPix } from 'react-icons/md';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { formatoDinheiroReal } from '../../utils/NumeroFormaters';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const CalendarLocaleType = {
   sunday: 'Dom',
   monday: 'Seg',
   tuesday: 'Ter',
   wednesday: 'Qua',
   thursday: 'Qui',
   friday: 'Sex',
   saturday: 'Sab',
   today: 'Hoje',
   yesterday: 'Ontem',
   hours: 'Horas',
   minutes: 'Minutos',
   seconds: 'Segundos',
   formattedMonthPattern: 'MMMM yyyy',
   formattedDayPattern: 'dd MM yyyy',

   // for DateRangePicker
   last7Days: 'Ultimos 7 dias',
};

function CardDia2({ dia }) {
   const navigate = useNavigate()

   return (
      <section className={style.cardDia2} onClick={() => {
         navigate(format(parseISO(dia.data), "dd-MM-yyyy"))
      }}>
         <p style={{ fontSize: '1.2em' }}>
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
         <p id={style.total}>{formatoDinheiroReal(dia.total)}</p>
      </section>
   )
}


function Relatorio1() {
   const navigate = useNavigate();
   const [vendaDoisDiasAtras, setVendaDoisDiasAtras] = useState();
   const [vendasHoje, setVendasHoje] = useState();

   useEffect(() => {
      fetch(process.env.REACT_APP_GATEWAY_URL + "/venda/resumo-dia?data=" + format(new Date(), "dd-MM-yyyy"))
         .then(res => res.json())
         .then(res => {
            setVendasHoje(res)
         })
   }, [])

   useEffect(() => {
      fetch(process.env.REACT_APP_GATEWAY_URL + "/venda/resumo-semana")
         .then(res => res.json())
         .then(res => {
            setVendaDoisDiasAtras(res)
         })
   }, [])


   return (
      <>
         <section className={style.todoDasMetades}>
            {vendasHoje && <section className={style.metade} >
               <h1>Resumo de hoje: </h1>
               <p >{format(new Date(), "dd/MM/yyyy")}</p>

               <h2>{vendasHoje.quantidadeVendas === 0 ? 'Nenhuma venda realizada.' : vendasHoje.quantidadeVendas + ' vendas realizadas.'}</h2>
               <div className={style.cartoes}>

                  Cartão
                  <div className={style.figura2}>
                     <BsFillCreditCard2BackFill />
                     <p>{formatoDinheiroReal(vendasHoje.cartao)}</p>
                  </div>

                  Pix
                  <div className={style.figura2}>
                     <MdPix />
                     <p>{formatoDinheiroReal(vendasHoje.pix)}</p>
                  </div>

                  Dinheiro
                  <div className={style.figura2}>
                     <FaMoneyBillWave />
                     <p>{formatoDinheiroReal(vendasHoje.dinheiro)}</p>
                  </div>
               </div>

               <h3>{formatoDinheiroReal(vendasHoje.total)}</h3>

               <p onClick={() => {
                  navigate('/vendas/' + format(new Date(), "dd-MM-yyyy"))
               }

               }>detalhes</p>

            </section>}


            <section className={style.metade}>
               <DateRangePicker placeholder="Selecione as datas " locale={CalendarLocaleType} format='dd/MM/yyyy' />
            </section>
         </section>
         <div className={style.resumoSemana}>
            <h1>Últimos 7 dias</h1>
            <ul className={style.ul1}>

               {vendaDoisDiasAtras && vendaDoisDiasAtras.map((venda, key) => {
                  return <li><CardDia2 dia={venda} key={key} /></li>
               })}
            </ul>
         </div>
      </>
   );
}

export default Relatorio1;