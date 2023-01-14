import {  List, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

function Estoque2() {
   const {marca} = useParams();

   let [produtos,setProdutos] = useState();

   useEffect(() => {
      fetch("http://localhost:8080/produto/marca/" + marca).then((response) => response.json()).then((x) => setProdutos(x))
   },[])

   return (
      <>
         <Typography variant="h1" align="center" sx={{fontSize:'4.5em'}}>{marca !== undefined ? marca : "Sem marca" } </Typography>

         <Stack direction="row" gap={4} marginLeft={5} marginTop={2}>
            {produtos !== undefined && produtos.map((produto,key) => {
               return (
                  <Card produto={produto} key={key}></Card>
               )
            })}
         </Stack>


      </>

    );
}

export default Estoque2;