import React from "react";
import { useEffect, useState } from "react";
import style from "../styles/Carrinho.module.css"
import ItemCarrinho from "./ItemCarrinho";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { formatoDinheiroReal } from "../../utils/NumeroFormaters";
import { Button } from "rsuite";

function Carrinho({ prop, produtoAdd, setBagVisible, setQtdItens }) {
   const navigate = useNavigate()

   const [produtos, setProdutos] = useState(prop === undefined ? [] : prop);
   const [total, setTotal] = useState(0);
   const [att, setAtt] = useState(false)
   // const [qtdItens,setQtdItens] = useState(0)

   useEffect(() => {
      novoArrayDeitens(produtoAdd)
   }, [produtoAdd])


   // Essa é a função que adiciona o produto no carrinho
   const novoArrayDeitens = (novoProduto) => {
      if (novoProduto !== undefined) {
         novoProduto = { produto: { ...produtoAdd }, quantidadeSelecionada: 1 }
         // -1 significa que não existe o produto no carrinho
         let i = produtos.findIndex((e) => (e.produto.id === novoProduto.produto.id && e.produto.tamanhoSelecionado === novoProduto.produto.tamanhoSelecionado))

         if (i === -1) {
            setProdutos([...produtos, novoProduto])
         }
         contarItens()
      }
   }

   useEffect(() => {
      if (produtos !== []) {
         setTotal(produtos.reduce((acc, item) => {
            return acc + (item.produto.valor * item.quantidadeSelecionada);
         }, 0))
      }
   }, [produtos, att])


   const remover = (id,tamanho) => {
      let aux = produtos.filter((e) => {
         return e.produto.id !== id || e.produto.tamanhoSelecionado !== tamanho
         })
      setProdutos(aux)
      contarItens()
   }

   const handleFinalizarCompra = () => {
      console.log(produtos)
   }

   const contarItens = () => {
      let a = produtos.reduce((acc, item) => {
         return acc + item.quantidadeSelecionada
      }, 0)
      setQtdItens(a)
   }

   const mudarRota = (produtos) => {
      console.log(produtos)
      if(produtos.length > 0){
         navigate("/venda", { state: { carrinho: produtos } })
      }else {
         alert("Adicione um produto ao carrinho.");
      }
   }

   return (
      <div id={style.principal}>
         <IconButton style={{ float: 'right', margin: 5 }} type="reset" onClick={() => setBagVisible(false)}>
            <CloseIcon/>
         </IconButton>

         <h1 style={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>Carrinho</h1>
         <div id={style.lista}>

            {produtos.map((item, key) => {
               return (
                  <ItemCarrinho item={item} key={key} receberNovoProduto={novoArrayDeitens} remover={remover} setAtt={setAtt} att={att} />
               )
            })}
         </div>

         <div id={style.total}>
            <div >Total: {formatoDinheiroReal(total)}</div>
            <Button appearance="primary" onClick={() => mudarRota(produtos)} id={style.botaoFinalizar}>Finalizar</Button>
         </div>

      </div>

   );
}

export default Carrinho;