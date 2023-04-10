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
         novoProduto = { produto: { ...produtoAdd }, tamanhoSelecionado: null, quantidadeSelecionada: null }
         // -1 significa que não existe o produto no carrinho
         let i = produtos.findIndex((e) => (e.produto.id === novoProduto.produto.id && e.produto.tamanho === novoProduto.produto.tamanho))

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


   const remover = (id) => {
      let aux = produtos.filter((e) => e.produto.id !== id)
      setProdutos(aux)
      contarItens()
   }

   useEffect(() => {
      console.log("total  " + total)
   }, [total])

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
      navigate("/venda", { state: { carrinho: produtos } })
   }

   return (
      <div id={style.principal}>
         <IconButton style={{ float: 'right', margin: 5 }} type="reset" >
            <CloseIcon onClick={() => setBagVisible(false)} />
         </IconButton>

         <h1 style={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>Carrinho</h1>
         <div id={style.lista}>

            {produtos.map((e, key) => {
               return (
                  <ItemCarrinho item={e} key={key} receberNovoProduto={novoArrayDeitens} remover={remover} setAtt={setAtt} att={att} />
               )
            })}
         </div>

         <div id={style.total}>
            <div >Total: {formatoDinheiroReal(total)}</div>
            <Button color="primary" onClick={() => mudarRota(produtos)} id={style.botaoFinalizar}>finalizar</Button>
         </div>

      </div>

   );
}

export default Carrinho;