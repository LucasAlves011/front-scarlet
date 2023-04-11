export function formatoDinheiroReal(numero) {
   return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
 }

 export function verificarDisponibilidade (produto){
  if (produto.tipo === "avulso") {
     return produto.quantidade > 0
  } else if(produto.tipo === "nominal") {
     return produto.p > 0 || produto.m > 0 || produto.g > 0 || produto.gg > 0
  }else {
     return produto.t36 > 0 || produto.t38 > 0 || produto.t40 > 0 || produto.t42 > 0 || produto.t44 > 0 || produto.t46 > 0 || produto.t48 > 0 || produto.t50 > 0
  }
}