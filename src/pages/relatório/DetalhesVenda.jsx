import style from './DetalhesVenda.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { format, parseISO } from "date-fns";
import { formatoDinheiroReal } from "../../utils/NumeroFormaters";
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdPix } from 'react-icons/md';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;


function Tabela({ itens }) {

   const formatarValor = (x) => {
      return formatoDinheiroReal(x.item.valor)
   }

   const formatarTamanho = (x) => {
     switch (x.item.tamanho) {
         case "P":
         case "M":
         case "G":
         case "GG":
            return x.item.tamanho.toUpperCase()
         case "T36":
         case "T38":
         case "T40":
         case "T42":
         case "T44":
         case "T46":
         case "T48":
         case "T50":
            return x.item.tamanho.replace("T", "")
         default:
            return "Único"
   }
}

   return (

      <Table
         height={200}
         data={itens}
         headerHeight={30}
         rowHeight={30}
         // fillHeight={true}
         onRowClick={rowData => {
            console.log(rowData);
         }}
      >
        <Column width={50} align="center">
        <HeaderCell></HeaderCell>
        <Cell>
          {(rowData, rowIndex) => {
            return <div>{rowIndex + 1}.</div>;
          }}
        </Cell>
      </Column>

         <Column width={45} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="item.produtoId" className={style.celula}/>
         </Column>

         <Column width={400}>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="nome" />
         </Column>

         <Column width={150} align='center'>
            <HeaderCell>Quantidade</HeaderCell>
            <Cell dataKey="item.quantidade" />
         </Column>

         <Column width={100} dataKey="item.tamanho" align='center'>
            <HeaderCell>Tamanho</HeaderCell>
            <Cell dataKey="item.tamanho">
               { (cellData,rowData) => {
                  return formatarTamanho(cellData)
               }}
            </Cell>
         </Column>
         <Column width={150} dataKey="item.valor" >
            <HeaderCell>Valor</HeaderCell>
            <Cell dataKey="item.valor">
               { (cellData,rowData) => {
                  return formatarValor(cellData)
               }}
            </Cell>
         </Column>
      </Table>
   );
};


function ControlledAccordions({ itens }) {

   const getChipFormaPagamento = (formaPagamento) => {
      switch (formaPagamento) {
         case "DINHEIRO":
            return <Chip label={formaPagamento} color="success" icon={<FaMoneyBillWave />} />
         case "CARTAO":
            return <Chip label={formaPagamento} color="error" icon={<BsFillCreditCard2BackFill />} />
         case "PIX":
            return <Chip label={formaPagamento} color="primary" icon={<MdPix />} />
         default:
            return <Chip label={formaPagamento} color="warning" />
      }
   }

   return (
      <div className={style.acordeon}>
         {itens.map((item, key) => (
            <Accordion >
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}

                  aria-controls="panel1bh-content"
                  id={key}
               > <div style={{ width: '5%' }}> {key + 1}. </div>
                  <div style={{ width: '20%' }}>
                      {format(parseISO(item.dataHora), "kk:mm:ss")}
                  </div>
                  <div style={{ width: '20%' }}>
                     Total: {formatoDinheiroReal(item.total)}
                  </div>
                  <div style={{ width: '20%' }}>
                     Entrega: {formatoDinheiroReal(item.entrega)}
                  </div>
                  <div style={{ width: '20%' }}>
                     Desconto: {formatoDinheiroReal(item.desconto)}
                  </div>
                  <div style={{ width: '20%' }}>
                     {getChipFormaPagamento(item.formaPagamento)}

                  </div>

               </AccordionSummary>
               <AccordionDetails>
                  <Tabela itens={item.itemMaisNomeList} />
               </AccordionDetails>
            </Accordion>

         ))}
      </div>
   );
}

function DetalhesVenda() {
   const { data } = useParams()
   const [venda, setVenda] = useState(null)

   useEffect(() => {
      if (data) {
         console.log(data)
         fetch("http://192.168.0.12:8080/venda/vendas-dia?data=" + data)
            .then(res => res.json())
            .then(res => {
               console.log(res)
               setVenda(res)
            })
      }
   }, [data])


   return (
      <>
         {data && <h1 className={style.h1Data}>Vendas do dia {format(new Date(data),'dd/MM/yyyy')}</h1>}
         {venda && <ControlledAccordions itens={venda} />}
      </>

   );
}

export default DetalhesVenda;