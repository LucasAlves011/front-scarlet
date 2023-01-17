import { List, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import MultiSelect from "../components/MultiSelect";

function Estoque2() {
   const { marca } = useParams();

   let [produtos, setProdutos] = useState();
   let [categorias, setCategorias] = useState();
   let [selected, setSelected] = useState();

   useEffect(() => {
      fetch(" http://localhost:8080/produto/marca/" + marca).then((response) => response.json()).then((x) => setProdutos(x))
   }, [])

   useEffect(() => {
      if(produtos !== undefined){
         let catUnique = Array.from(new Set(produtos.map(x => { return x.categorias }).reduce((a, g) => a.concat(g), [])))
         setCategorias(catUnique.map( (e,key) => {return {id: key, value: e}}))
      }
   },[produtos])

   return (
      <>
         <Typography variant="h1" align="center" sx={{ fontSize: '4.5em' }}>{marca !== undefined ? marca : "Sem marca"} </Typography>

         <MultiSelect dados={categorias !== undefined ? categorias : []} placeholder="Selecione as categorias"></MultiSelect>

         <Stack direction="row" gap={4} marginLeft={5} marginTop={2}>
            {produtos !== undefined && produtos.map((produto, key) => {
               return (
                  <Card produto={produto} key={key}></Card>
               )
            })}
         </Stack>


      </>

   );
}

export default Estoque2;