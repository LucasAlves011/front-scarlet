import { Avatar, Checkbox, List, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import MultiSelect from "../components/MultiSelect";

function Estoque2() {
   const { marca } = useParams();

   let [produtos, setProdutos] = useState();
   let [produtos2, setProdutos2] = useState();
   let [categorias, setCategorias] = useState();
   let [filtros, setFiltros] = useState([]);

   let nominal = ['P', 'M', 'G', 'GG']

   let [selectedCategorias, setSelectedCategorias] = useState();

   useEffect(() => {
      fetch(" http://192.168.1.110:8080/produto/marca/" + marca).then((response) => response.json()).then((x) => {
         setProdutos(x)
         setProdutos2(x)
         // console.log(x)
      })
   }, [])

   useEffect(() => {
      if (produtos !== undefined) {
         let catUnique = Array.from(new Set(produtos.map(x => { return x.categorias }).reduce((a, g) => a.concat(g), [])))
         setCategorias(catUnique.map((e, key) => { return { id: key, value: e } }))
      }
   }, [produtos])

   useEffect(() => {
      if (selectedCategorias !== undefined && selectedCategorias.length > 0) {
         let auxProd = []
         selectedCategorias.forEach((e) => {
            auxProd.push(...produtos.filter((x) => x.categorias.includes(e)))
         })
         setProdutos2([...new Set(auxProd)])
      } else if (selectedCategorias !== undefined && selectedCategorias.length === 0) {
         setProdutos2(produtos)
      }

   }, [selectedCategorias])

   useEffect(() => {
      console.log(filtros)
      let auxProd = []
      if (filtros !== undefined && filtros.length > 0) {
         filtros.forEach((e) => {
            if (nominal.includes(e)) {
               switch (e) {
                  case 'P':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.p > 0 && !auxProd.includes(x))))
                     break
                  case 'M':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.m > 0 && !auxProd.includes(x))))
                     break
                  case 'G':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.g > 0 && !auxProd.includes(x))))
                     break
                  case 'GG':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.gg > 0 && !auxProd.includes(x))))
                     break
                  default:
                     break
               }
            } else {
               switch (e) {
                  case '36':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t36 > 0 && !auxProd.includes(x))))
                     break
                  case '38':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t38 > 0 && !auxProd.includes(x))))
                     break
                  case '40':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t40 > 0 && !auxProd.includes(x))))
                     break
                  case '42':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t42 > 0 && !auxProd.includes(x))))
                     break
                  case '44':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t44 > 0 && !auxProd.includes(x))))
                     break
                  case '46':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t46 > 0 && !auxProd.includes(x))))
                     break
                  case '48':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t48 > 0 && !auxProd.includes(x))))
                     break
                  case '50':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t50 > 0 && !auxProd.includes(x))))
                     break
                  default:
                     break
               }
            }
         })
         setProdutos2([...new Set(auxProd)])
      } else if (filtros !== undefined && filtros.length === 0) {
         setProdutos2(produtos)
      }
   }, [filtros])

   const handleFiltros = (e) => {
      if (e.target.checked === true) {
         setFiltros(filtros === [] ? [e.target.value] : [...filtros, e.target.value])
      }
      else {
         setFiltros(filtros.filter((x) => x !== e.target.value))
      }
   }

   return (
      <>
         <Typography variant="h1" align="center" sx={{ fontSize: '4.5em' }}>{marca !== undefined ? marca : "Sem marca"} </Typography>

         <div style={{ display: 'flex', direction: 'row', height: 45, width: 500, justifyContent: 'space-around', margin: '20px auto' }}>

            {['P', 'M', 'G', 'GG'].map(e => {
               return (
                  <div style={{ width: 45, height: 40 }}>
                     <Checkbox
                        defaultChecked={false}
                        onChange={(e) => handleFiltros(e)}
                        value={e}
                        icon={<Avatar sx={{ bgcolor: 'white', color: '#6558f5', border: '1px solid #6558f5' }} variant="rounded">{e}</Avatar>}
                        checkedIcon={<Avatar sx={{ bgcolor: "#6558f5", width: 40 }} variant="rounded" >{e}</Avatar>} />
                  </div>
               )
            })}

         </div>

         <div style={{ display: 'flex', direction: 'row', height: 45, width: 600, justifyContent: 'space-around', margin: '20px auto' }}>

            {['36', '38', '40', '42', '44', '46', '48', '50'].map(e => {
               return (
                  <div style={{ width: 45, height: 40 }}>
                     <Checkbox
                        defaultChecked={false}
                        onChange={(e) => handleFiltros(e)}
                        value={e.toString()}
                        icon={<Avatar sx={{ bgcolor: 'white', color: '#6558f5', border: '1px solid #6558f5' }} variant="rounded">{e}</Avatar>}
                        checkedIcon={<Avatar sx={{ bgcolor: "#6558f5", width: 40 }} variant="rounded" >{e}</Avatar>} />
                  </div>
               )
            })}

         </div>

         <MultiSelect dados={categorias !== undefined ? categorias : []} placeholder="Selecione as categorias" reciever={setSelectedCategorias}></MultiSelect>

         <Stack direction="row" gap={4} marginLeft={5} marginTop={2}>
            {produtos2 !== undefined && produtos2.map((produto, key) => {
               return (
                  <Card produto={produto} key={key}></Card>
               )
            })}
            {
               produtos2 !== undefined && produtos2.length === 0 && <Typography variant="h1" align="center" sx={{ margin: "30px auto", fontSize: '4.5em', color: "#4b4d53" }}>Sem produtos </Typography>
            }
         </Stack>


      </>

   );
}

export default Estoque2;