import style from './DetalhesVenda.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Chip } from "@mui/material";
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
         onRowClick={rowData => {
            console.log(rowData);
         }}
      >
         <Column width={50} verticalAlign='middle' align='center' >
            <HeaderCell></HeaderCell>
            <Cell style={{ padding: '0px' }}>
               {(rowData, rowIndex) => {
                  return <div>{rowIndex + 1}.</div>;
               }}
            </Cell>
         </Column>

         <Column width={45} verticalAlign='middle' align='center' >
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="item.produtoId" style={{ padding: '0px' }} />
         </Column>

         <Column width={400} verticalAlign='middle' >
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="nome" style={{ padding: '0px' }} />
         </Column>

         <Column width={150} verticalAlign='middle' align='center'>
            <HeaderCell>Quantidade</HeaderCell>
            <Cell dataKey="item.quantidade" style={{ padding: '0px' }} />
         </Column>

         <Column width={100} dataKey="item.tamanho" verticalAlign='middle' align='center'>
            <HeaderCell>Tamanho</HeaderCell>
            <Cell dataKey="item.tamanho" style={{ padding: '0px' }}>
               {(cellData, rowData) => {
                  return formatarTamanho(cellData)
               }}
            </Cell>
         </Column>
         <Column width={150} dataKey="item.valor" >
            <HeaderCell>Valor</HeaderCell>
            <Cell dataKey="item.valor" style={{ padding: '0px' }} verticalAlign='middle' >
               {(cellData, rowData) => {
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
               >
                  <div style={{ width: '5%', alignSelf: 'center' }}> {key + 1}. </div>
                  <div style={{ width: '20%', alignSelf: 'center' }}>
                     {format(parseISO(item.dataHora), "kk:mm:ss")}
                  </div>
                  <div style={{ width: '20%', alignSelf: 'center' }} >
                     Total: <span style={{ fontWeight: item.total > 0 && 'bold', fontSize: '1.1em' }}>{formatoDinheiroReal(item.total)}</span>
                  </div>
                  <div style={{ width: '20%', alignSelf: 'center' }}>
                     Entrega: <span style={{ fontWeight: item.entrega > 0 && 'bold' }}> {formatoDinheiroReal(item.entrega)}</span>
                  </div>
                  <div style={{ width: '20%', alignSelf: 'center' }}>
                     Desconto: <span style={{ fontWeight: item.desconto > 0 && 'bold' }}>{formatoDinheiroReal(item.desconto)}</span>
                  </div>
                  <div style={{ width: '20%', alignSelf: 'center' }}>
                     <span>{getChipFormaPagamento(item.formaPagamento)}</span>
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
         fetch(process.env.REACT_APP_GATEWAY_URL + "/venda/vendas-dia?data=" + data)
            .then(res => res.json())
            .then(res => {
               console.log(res)
               setVenda(res)
            })
      }
   }, [data])


   return (
      <>
         {data && <h1 className={style.h1Data}>Vendas do dia {format(new Date(data), 'dd/MM/yyyy')}</h1>}
         {venda && <ControlledAccordions itens={venda} />}
      </>

   );
}

export default DetalhesVenda;