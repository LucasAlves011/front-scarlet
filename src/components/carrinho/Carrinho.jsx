import { useEffect, useState } from "react";
import style from "../styles/Carrinho.module.css"
import ItemCarrinho from "./ItemCarrinho";
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { formatoDinheiroReal } from "../../utils/NumeroFormaters";

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

   // const itensTeste = [
   //    {
   //       produto: {
   //          "id": 6,
   //          "tipo": "nominal",
   //          "nome": "Bermuda Jeans",
   //          "marca": "TAMO JUNTO",
   //          "categorias": [
   //             "CALÇA",
   //             "JEANS",
   //             "LONG",
   //             "ÓCULOS"
   //          ],
   //          "imagem": "7d13ee5a-4d56-4614-b4f2-2ac27ead65b2.png",
   //          "valor": 75.0,
   //          "quantidade": 13,
   //          "g": 0,
   //          "p": 8,
   //          "m": 3,
   //          "gg": 2
   //       },
   //       tamanhoSelecionado: null,
   //       quantidadeSelecionada: null
   //    },
   //    {
   //       produto: {
   //          "id": 2,
   //          "tipo": "avulso",
   //          "nome": "Camisa lacoste branca",
   //          "marca": "LACOSTE",
   //          "categorias": [
   //             "CAMISA DE TIME",
   //             "COPA DO MUNDO",
   //             "ÓCULOS"
   //          ],
   //          "imagem": "2f562cd6-12d9-4d4f-8b14-a06674a5e15a.png",
   //          "valor": 60.0,
   //          "quantidade": 3
   //       },
   //       tamanhoSelecionado: null,
   //       quantidadeSelecionada: null
   //    },
   //    {
   //       produto: {
   //          "id": 18,
   //          "tipo": "numerico",
   //          "nome": "Chapéu Pescador celine",
   //          "marca": "CELINE",
   //          "categorias": [
   //             "BOLSA",
   //             "CALÇA",
   //             "CAMISA",
   //             "JÓIA"
   //          ],
   //          "imagem": "4dfd426c-97a3-499b-a23d-05195cbd6851.png",
   //          "valor": 60.0,
   //          "quantidade": 14,
   //          "t36": 4,
   //          "t38": 1,
   //          "t40": 0,
   //          "t42": 1,
   //          "t44": 1,
   //          "t46": 3,
   //          "t48": 2,
   //          "t50": 2
   //       },
   //       tamanhoSelecionado: null,
   //       quantidadeSelecionada: null
   //    }
   // ]

   const mudarRota = (produtos) => {
      navigate("/venda",{ state: { carrinho: produtos } })
    }

   return (
      <div id={style.principal}>
         <IconButton style={{ float: 'right', margin: 5 }} type="reset" >
            <CloseIcon onClick={() => setBagVisible(false)} />
         </IconButton>

         <h1 style={{ textAlign: 'center',fontFamily: 'Roboto, sans-serif' }}>Carrinho</h1>
         <div id={style.lista}>

            {produtos.map((e, key) => {
               return (
                  <ItemCarrinho item={e} key={key} receberNovoProduto={novoArrayDeitens} remover={remover} setAtt={setAtt} att={att}/>
               )
            })}
         </div>

         <div id={style.total}>
            <div id={style.totalText}>Total</div>
            <div id={style.totalValor}>{formatoDinheiroReal(total)}</div>
         </div>

         <Button onClick={() => mudarRota(produtos)}>finalizar</Button>
      </div>

   );
}

export default Carrinho;