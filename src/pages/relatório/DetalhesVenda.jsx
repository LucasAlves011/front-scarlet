import React from "react";
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
import Chart from "react-google-charts";

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
            return <Chip label={formaPagamento} style={{backgroundColor: '#2ecc71'}} color="success" icon={<FaMoneyBillWave />} />
         case "CARTAO":
            return <Chip label={formaPagamento} style={{backgroundColor: '#e74c3c'}} color="error" icon={<BsFillCreditCard2BackFill />} />
         case "PIX":
            return <Chip label={formaPagamento} style={{backgroundColor: '#3498db'}} color="primary" icon={<MdPix />} />
         default:
            return <Chip label={formaPagamento} color="warning" />
      }
   }

   const contarItens = (arrayProdutos) => {
      let a = arrayProdutos.reduce((acc, a) => { return acc + a.item.quantidade},0)
      return a > 1 ? a + " itens" : a + " item"
   }

   return (
      <div className={style.acordeon}>
         {itens && itens.map((item, key) => (
            <Accordion >
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={key}
               >
                  <div style={{ width: '5%', alignSelf: 'center' }}> {key + 1}. </div>

                  <div style={{ width: '10%', alignSelf: 'center' }}>
                     {format(parseISO(item.dataHora), "HH:mm:ss")}
                  </div>

                  <div style={{ width: '10%', alignSelf: 'center' }}>{contarItens(item.itemMaisNomeList)}</div>

                  <div style={{ width: '20%', alignSelf: 'center' }} >
                     Total: <span style={{ fontWeight: item.total > 0 && 'bold', fontSize: '1.1em' }}>{formatoDinheiroReal(item.total)}</span>
                  </div>
                  <div style={{ width: '20%', alignSelf: 'center' }}>
                     Entrega: <span style={{ fontWeight: item.entrega > 0 && 'bold' }}> {formatoDinheiroReal(item.entrega)}</span>
                  </div>
                  <div style={{ width: '20%', alignSelf: 'center' }}>
                     Desconto: <span style={{ fontWeight: item.desconto > 0 && 'bold' , color: item.desconto > 0 ? 'red' : 'black' }}>{formatoDinheiroReal(item.desconto)}</span>
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

   const [categoriasDados, setCategoriasDados] = useState([])
   const [dadosFormatados, setDadosFormatados] = useState([])

   const [pagamentosDados, setPagamentosDados] = useState([])

   useEffect(() => {
      if (data) {
         fetch(process.env.REACT_APP_GATEWAY_URL + "/venda/vendas-dia?data=" + data)
            .then(res => res.json())
            .then(res => {
               console.log(res)
               setVenda(res)
            })
      }
   }, [data])

   useEffect(() => {
      fetch(process.env.REACT_APP_GATEWAY_URL + `/venda/venda-por-categorias?data1=${data}`)
         .then((res) => res.json())
         .then((res) => {
            setCategoriasDados(res)
         })
   }, [])

   const testData = [
      ["Element", "Density", { role: "style" }],
      ["Copper", 8.94, "#b87333"], // RGB value
      ["Silver", 10.49, "silver"], // English color name
      ["Gold", 19.3, "gold"],
      ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
   ];

   useEffect(() => {
      construirDadosCategorias()
   }, [categoriasDados])

   useEffect(() => {
      if (venda !== null){
         construirDadosPagamentos()
      }
   }, [venda])

   const construirDadosCategorias = () => {
      const contagemCategorias = {};

      // Preencha o objeto de contagem de categorias
      categoriasDados.forEach((produto) => {
         produto.categorias.forEach((categoria) => {
            if (contagemCategorias[categoria]) {
               contagemCategorias[categoria]++;
            } else {
               contagemCategorias[categoria] = 1;
            }
         });
      });

      // Crie um array de arrays com os dados no formato desejado
      const dataset = [["Categoria", "Qtd"]];
      for (const categoria in contagemCategorias) {
         dataset.push([categoria, contagemCategorias[categoria]]);
      }
      console.log(dataset)
      setDadosFormatados(dataset)
   }

   const construirDadosPagamentos = () => {
      const contagemPagamentos = {};
      venda.forEach((venda) => {
         if (contagemPagamentos[venda.formaPagamento]) {
            contagemPagamentos[venda.formaPagamento]++;
         } else {
            contagemPagamentos[venda.formaPagamento] = 1;
         }
      });

      const dataset = [];

      dataset.push(["Pagamento", "Qtd"])
      dataset.push(["DINHEIRO", contagemPagamentos["DINHEIRO"]])
      dataset.push(["PIX", contagemPagamentos["PIX"]])
      dataset.push(["CARTAO", contagemPagamentos["CARTAO"]])

      setPagamentosDados(dataset)
   }


   return (


      <>
         {data && <h1 className={style.h1Data}>Vendas do dia {data.replaceAll("-", '/')}</h1>}
         <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
            <Chart
               width='100%'
               height='400px'
               chartType="BarChart"
               loader={<div>Loading Chart</div>}
               data={testData}
            />

            {dadosFormatados && <Chart
               chartType="PieChart"
               width="100%"
               height="400px"
               data={dadosFormatados}
               options={{
                  title: "Categorias mais vendida do dia",
                  pieHole: 0.4,
                  is3D: false,
               }}
            />}

            {pagamentosDados && <Chart
               chartType="PieChart"
               width="100%"
               height="400px"
               data={pagamentosDados}
               options={{
                  title: "Formas de pagamento",
                  is3D: false,
                  // colors: ['#2ecc71', '#e74c3c', '#3498db'],
                  legend: "para todos aqueles ",
                  slices: {
                     0: { color: '#2ecc71' },
                     1: { color: '#3498db' },
                     2: { color: '#e74c3c' },
                   }
               }}
            />
            }
         </div>

         <h4 style={{textAlign: 'center'}}>Vendas detalhadas</h4>
         {venda && <ControlledAccordions itens={venda} />}
      </>

   );
}

export default DetalhesVenda;