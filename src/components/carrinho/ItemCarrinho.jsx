import React from "react";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../styles/ItemCarrinho.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { formatoDinheiroReal } from "../../utils/NumeroFormaters";
// import { InputGroup, InputNumber } from "rsuite";

function ItemCarrinho({ item, receberNovoProduto, remover, setAtt, att }) {

   const [sucess, setSucess] = useState(false)

   // useEffect(() => {
   //    console.log(item + "aqui")
   // }, [quantidadeSelecionada])

   const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

   useEffect(() => {
      item.quantidadeSelecionada = quantidadeSelecionada
      setAtt(!att)
   }, [quantidadeSelecionada])

   return (

      <section className={style.container} >

         <img src={process.env.REACT_APP_GATEWAY_URL + "/produto/imagem/" + item.produto.imagem} width='100' height='110' alt="imagem do produto" />

         <div id={style.info}>
            <div id={style.titulo}>{item.produto.nome}</div>

            <div id={style.dentroInfo}>

               <div className={style.precoNome}>
                  <span id={style.preco}>{formatoDinheiroReal(item.produto.valor)}</span>
                  <div><strong>{item.produto.tipo === "avulso" ? "Tamanho único" : item.produto.tamanhoSelecionado.replace('t', '').toUpperCase()}</strong></div>
               </div>


               <div className={style.maisMenos}>
                  <IconButton id={style.menos} onClick={() => {
                     if (quantidadeSelecionada > 1) {
                        setQuantidadeSelecionada(quantidadeSelecionada - 1)
                     }
                  }} >-</IconButton>
                  <span id="mostrar">{quantidadeSelecionada}</span>
                  <IconButton id={style.mais} onClick={() => {
                     if (item.produto.tipo === 'avulso' && quantidadeSelecionada < item.produto.quantidade) {
                        setQuantidadeSelecionada(quantidadeSelecionada + 1)
                     } else if (quantidadeSelecionada < item.produto[item.produto.tamanhoSelecionado]) {
                        setQuantidadeSelecionada(quantidadeSelecionada + 1)
                     }
                  }} >+</IconButton>
               </div>
            </div>

         </div>

         <IconButton onClick={() => remover(item.produto.id,item.produto.tamanhoSelecionado)} style={{ float: 'right', margin: 5 }}><DeleteIcon fontSize="small" /></IconButton>

      </section>
   );
}

export default ItemCarrinho;