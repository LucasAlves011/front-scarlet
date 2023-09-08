import React from "react";
import { format, parseISO } from 'date-fns';
import style from './Relatorio1.module.css'
import { useState, useEffect } from 'react';
import { ptBR } from 'date-fns/locale';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdPix } from 'react-icons/md';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { formatoDinheiroReal } from '../../utils/NumeroFormaters';
import { useNavigate } from 'react-router-dom';
import { Button, DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Chart from "react-google-charts";
import { Skeleton } from "@mui/material";

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
   last7Days: 'Ultimos 7 dias',
};

function CardDia2({ dia }) {
   const navigate = useNavigate()

   return (<>
     {/* //TODO: ESSA FUNCIONALIDADE AINDA NÃO ESTÁ IMPLEMENTADA, MAS ACHO INTERESSANTE
         A QUESTÃODE TER UM MARCADOR NO CARD AVISANDO EXPLICITAMENTE O USUÁRIO QUE SE TRATA DO CARD DE ONTEM
     */}
     {/* { new Date(dia.data).getDate() === new Date().getDate()-1 && <div id={style.marcadorOntem}>Ontem</div>} */}
      <section className={style.cardDia2} onClick={() => {
         navigate(format(parseISO(dia.data), "dd-MM-yyyy"))
      }}>
         <p style={{ fontSize: '1.2em' }}>
            {format(parseISO(dia.data), "dd/MM/yyyy")}
         </p>
         <p id={style.diaPorExtenso}>
            {format(parseISO(dia.data), "ccc", { locale: ptBR }).charAt(0).toUpperCase() + format(parseISO(dia.data), "ccc", { locale: ptBR }).slice(1)}
         </p>
         <p>{dia.quantidadeVendas} {dia.quantidadeVendas === 1 ? 'venda' : 'vendas'}</p>
         <p id={style.total}><strong>{formatoDinheiroReal(dia.total)}</strong></p>
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

      </section>
   </>
   )
}


function Relatorio1() {
   const navigate = useNavigate();
   const [vendaDoisDiasAtras, setVendaDoisDiasAtras] = useState();
   const [vendasHoje, setVendasHoje] = useState();


   const [dados, setDados] = useState()
   const [dadosFormatados, setDadosFormatados] = useState()

   useEffect(() => {
      fetch(process.env.REACT_APP_GATEWAY_URL + "/venda/venda-por-categorias")
         .then((res) => res.json())
         .then((res) => {
            setDados(res)
         })
   }, [])


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


   useEffect(() => {
      construirDados()
   }, [dados])

   const construirDados = () => {
      const contagemCategorias = {};

      if (dados === undefined) {
         console.log("Dados undefined")
         return 0;
      }
      // Preencha o objeto de contagem de categorias
      dados.forEach(produto => {
         produto.categorias.forEach((categoria) => {
            if (contagemCategorias[categoria]) {
               contagemCategorias[categoria]++;
            } else {
               contagemCategorias[categoria] = 1;
            }
         });
      });

      // Crie um array de arrays com os dados no formato desejado
      const dadosFormatados = [["Categoria", "Qtd"]];
      for (const categoria in contagemCategorias) {
         dadosFormatados.push([categoria, contagemCategorias[categoria]]);
      }
      dadosFormatados.sort((a, b) => b[1] - a[1])
      setDadosFormatados(dadosFormatados)
   }


   return (
      <>
         <section className={style.todoDasMetades}>
            {vendasHoje && <section className={style.metade} >
               <h1>Resumo de hoje ({format(new Date(), "dd/MM/yyyy")}) </h1>

               <h2>{vendasHoje.quantidadeVendas === 0 ? 'Nenhuma venda realizada.' : vendasHoje.quantidadeVendas === 1 ? vendasHoje.quantidadeVendas + ' venda realizada. ' : vendasHoje.quantidadeVendas + ' vendas realizadas.'}</h2>
               <h3>{formatoDinheiroReal(vendasHoje.total)}</h3>
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

               <Button appearance='link' onClick={() => {
                  navigate(format((new Date()), "dd-MM-yyyy"))
               }}>detalhes</Button>
            </section>}

            <section className={style.metade}>
               {dadosFormatados === undefined ?
                  <Skeleton
                     variant="rectangular"
                     width={210}
                     height={118}
                  />
                  :
                  <Chart
                     chartType="BarChart"
                     width="100%"
                     height="90%"
                     data={dadosFormatados}
                     options={{
                        title: "Categorias mais vendidas nos últimos 7 dia",
                        pieHole: 0.4,
                        is3D: false

                     }}
                  />}
               {/* <DateRangePicker placeholder="Selecione as datas " locale={CalendarLocaleType} format='dd/MM/yyyy' /> */}
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