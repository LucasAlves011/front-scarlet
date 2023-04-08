export function formatoDinheiroReal(numero) {
   return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
 }