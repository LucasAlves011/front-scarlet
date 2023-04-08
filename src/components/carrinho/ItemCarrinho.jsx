import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../styles/ItemCarrinho.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { formatoDinheiroReal } from "../../utils/NumeroFormaters";

function ItemCarrinho({ item, receberNovoProduto, remover, setAtt, att }) {

   const verificarPrimeiroTamanhoDisponivel = () => {
      if (item.produto.tipo === "nominal") {
         if (item.produto.p > 0) {
            return ("p")
         } else if (item.produto.m > 0) {
            return ("m")
         } else if (item.produto.g > 0) {
            return ("g")
         } else if (item.produto.gg > 0) {
            return ("gg")
         }
      } else if (item.produto.tipo === "numerico") {
         if (item.produto.t36 > 0) {
            return ("t36")
         } else if (item.produto.t38 > 0) {
            return ("t38")
         } else if (item.produto.t40 > 0) {
            return ("t40")
         } else if (item.produto.t42 > 0) {
            return ("t42")
         } else if (item.produto.t44 > 0) {
            return ("t44")
         } else if (item.produto.t46 > 0) {
            return ("t46")
         }
      } else
         return ("")
   }

   const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

   const [tamanhoSelecionado, setTamanhoSelecionado] = useState(verificarPrimeiroTamanhoDisponivel());

   useEffect(() => {
      console.log(quantidadeSelecionada);
   }, [quantidadeSelecionada])


   useEffect(() => {
      item.quantidadeSelecionada = quantidadeSelecionada
      item.tamanhoSelecionado = tamanhoSelecionado
      setAtt(!att)
   }, [quantidadeSelecionada, tamanhoSelecionado])

   useEffect(() => {
      setQuantidadeSelecionada(1);
   }, [tamanhoSelecionado])


   const definirTipo = (tipo) => {
      switch (tipo) {
         case 'avulso':
            return <>
               <span>Tamanho único</span>
               <div className={style.maisMenos}>
                  <IconButton onClick={() => {
                     if (quantidadeSelecionada > 1) {
                        setQuantidadeSelecionada(quantidadeSelecionada - 1)
                     }
                  }} >-</IconButton>
                  <span id="mostrar">{quantidadeSelecionada}</span>
                  <IconButton onClick={() => {
                     if (quantidadeSelecionada < item.produto.quantidade) {
                        setQuantidadeSelecionada(quantidadeSelecionada + 1)
                     }
                  }} >+</IconButton>
               </div>

               {/* <div><button onClick={() => remover(item.produto.id)}>remover</button></div> */}

            </>
         case 'nominal':
            return <>
               <select  className={style.tamanho} placeholder="Tamanho" value={tamanhoSelecionado} onChange={e => setTamanhoSelecionado(e.target.value)}>
                  {['p', 'm', 'g', 'gg'].map((e, key) => {
                     return (<option value={e} key={key} disabled={item.produto[e] > 0 ? false : true} style={item.produto[e] > 0 ? {} : { color: 'red' }}>{e}</option>)
                  })}
               </select>
               <div className={style.maisMenos}>
                  <IconButton onClick={() => {
                     if (quantidadeSelecionada > 1) {
                        setQuantidadeSelecionada(quantidadeSelecionada - 1)
                     }
                  }} >-</IconButton>
                  <span id="mostrar">{quantidadeSelecionada}</span>
                  <IconButton onClick={() => {
                     if (quantidadeSelecionada < item.produto[tamanhoSelecionado]) {
                        setQuantidadeSelecionada(quantidadeSelecionada + 1)
                     }
                  }} >+</IconButton>
               </div>
               {/* <div><button onClick={() => remover(item.produto.id)}>remover</button></div> */}
            </>
         case 'numerico':
            return <>
               <select className={style.tamanho} placeholder="Tamanho" value={tamanhoSelecionado} onChange={e => setTamanhoSelecionado(e.target.value)}>
                  {['t36', 't38', 't40', 't42', 't44', 't46', 't48', 't50'].map((e, key) => {
                     return (<option value={e} key={key} disabled={item.produto[e] > 0 ? false : true} style={item.produto[e] > 0 ? {} : { color: 'red' }}>{e}</option>)
                  })}
               </select>

               <div className={style.maisMenos}>
                  <IconButton onClick={() => {
                     if (quantidadeSelecionada > 1) {
                        setQuantidadeSelecionada(quantidadeSelecionada - 1)
                     }
                  }} >-</IconButton>
                  <span id="mostrar">{quantidadeSelecionada}</span>
                  <IconButton onClick={() => {
                     if (quantidadeSelecionada < item.produto[tamanhoSelecionado]) {
                        setQuantidadeSelecionada(quantidadeSelecionada + 1)
                     }
                  }} >+</IconButton>
               </div>


            </>
         default:
            return
            break;
      }
   }


   return (

      <section className={style.container} >

         <img src={process.env.REACT_APP_GATEWAY_URL+"/produto/imagem/" + item.produto.imagem} width='100' height='110' alt="imagem do produto" />

         <div id={style.info}>
            <div id={style.titulo}>{item.produto.nome}</div>

            <div id={style.dentroInfo}>
               <span id={style.preco}>{formatoDinheiroReal(item.produto.valor)}</span>
               {definirTipo(item.produto.tipo)}
            </div>

         </div>

         <IconButton onClick={() => remover(item.produto.id)} style={{ float: 'right', margin: 5 }}><DeleteIcon fontSize="small"></DeleteIcon></IconButton>

      </section>



   );
}

export default ItemCarrinho;