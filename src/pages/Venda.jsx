import { Button, Dialog, DialogContentText, DialogTitle, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from '../components/styles/ItemCarrinho.module.css'
import style2 from '../components/styles/Venda.module.css'

function SimpleDialog(props, parametro) {
   const { onClose, selectedValue, open } = props;

   const handleClose = () => {
      onClose(selectedValue);
   };

   const handleListItemClick = (value) => {
      onClose(value);
   };

   const formatFormaPagamento = (e) => {
      switch (e) {
         case 'dinheiro':
            return 'Dinheiro'
         case 'cartao':
            return 'Cartão'
         case 'pix':
            return 'Pix'
         default:
            break;
      }
   }

   return (
      <Dialog onClose={handleClose} open={open} >
         <div style={{ padding: '15px' }}>
            <DialogTitle style={{ textAlign: 'center' }}>Confirmar venda</DialogTitle>
            <section style={{ margin: '10px 5px 15px 15px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
               <DialogContentText>Entrega: R$ {props.entrega} </DialogContentText>
               <DialogContentText>Desconto: R$ {props.desconto} </DialogContentText>
               <DialogContentText>Forma de pagamento: {formatFormaPagamento(props.formaPagamento)} </DialogContentText>
               <DialogContentText>Total: R$ {props.total} </DialogContentText>
            </section>
            <Stack direction='row' spacing={5}>
               <Button variant="contained" color="success" >Confirmar</Button>
               <Button variant="contained" color="error" onClick={handleClose}>Cancelar</Button>
            </Stack>
         </div>
      </Dialog>
   );
}

function Venda() {

   const location = useLocation();
   const [produtos, setProdutos] = useState(location.state.carrinho || []);
   const [open, setOpen] = useState(false);
   const [selectedValue, setSelectedValue] = useState();
   const [errorDesconto, setErrorDesconto] = useState(false);
   const [total, setTotal] = useState(0);
   const [subTotal, setSubTotal] = useState(produtos.reduce((acc, item) => {
      let valor = item.produto.valor * item.quantidadeSelecionada;
      return acc + valor;
   }, 0));
   const [formaPagamento, setFormaPagamento] = useState('');
   const [entrega, setEntrega] = useState(0);
   const [desconto, setDesconto] = useState(0);


   const calcularSubtotal = () => {
      return produtos.reduce((acc, item) => {
         let valor = item.produto.valor * item.quantidadeSelecionada;
         return acc + valor;
      }, 0)
   }

   useEffect(() => {
      setSubTotal(calcularSubtotal())
   }, [produtos])

   useEffect(() => {
      if (location.state.produtos) {
         let a = produtos.reduce((acc, item) => {
            let valor = item.produto.valor * item.quantidadeSelecionada;
            return acc + valor;
         }, 0)
         setSubTotal(a);
      }
   }, []);

   useEffect(() => {
      let b = subTotal + parseFloat(entrega) - desconto
      b > 0 ? setTotal(b) : setTotal(0);
   }, []);

   useEffect(() => {
      let b = subTotal + parseFloat(entrega) - desconto
      b > 0 ? setTotal(b) : setTotal(0);
   }, [desconto, entrega, subTotal]);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
   };

   function LinhaProdutoTable(x, key) {

      const [quantidade, setQuantidade] = useState(x.quantidadeSelecionada);

      useEffect(() => {
         let p = produtos.map(item => {
            if (item.produto.id === x.produto.id) {
               item.quantidadeSelecionada = quantidade
               return item
            } else {
               return item
            }
         })
         setProdutos(p)
      }, [quantidade])


      return (

         <tr key={key}>
            <td>
               <img width={140} height={180} src={process.env.REACT_APP_GATEWAY_URL + "/produto/imagem/" + x.produto.imagem} alt={x.produto.nome} />
            </td>

            <td id={style2.tdNome}>
               <p>{x.produto.nome}</p>
            </td>
            <td>
               <p>{x.produto.marca}</p>
            </td>
            <td>
               <p>{x.tamanhoSelecionado === '' ? 'único' : x.tamanhoSelecionado.replace('t', '').toUpperCase()}</p>
            </td>
            <td>
               <div className={style.maisMenos} style={{ borderRight: '-20px', padding: 0 }}>
                  <IconButton onClick={() => {
                     if (quantidade > 1) {
                        setQuantidade(quantidade - 1);
                     }
                  }}>-</IconButton>
                  <span id="mostrar">{quantidade}</span>
                  <IconButton
                     onClick={() => {
                        if (x.tamanhoSelecionado === '' && quantidade < x.produto.quantidade) {
                           setQuantidade(quantidade + 1);
                           produtos.find(item => item.produto.id === x.produto.id).quantidadeSelecionada = quantidade;
                        }
                        else if (quantidade < x.produto[x.tamanhoSelecionado]) {
                           setQuantidade(quantidade + 1);
                           x.quantidadeSelecionada = quantidade;
                        }
                     }}
                  >+</IconButton>
               </div>
            </td>
            <td>
               <p>R$ {x.produto.valor}</p>
            </td>
            <td>
               <p>R$ {parseFloat(parseInt(quantidade) * parseFloat(x.produto.valor))}</p>
            </td>

         </tr >
      )
   }

   const styles = {
      container: {
         height: 'auto',
         display: 'flex',
      },
      fixedContent: {
         width: '30%',
         height: 'auto',
         marginLeft: '1%',
      },
      scrollableContent: {
         overflowY: 'scroll',
         height: '100%',
         maxHeight: '92vh',
         width: '65%',
         marginLeft: '5%'
      }
   };

   const enviar = (e) => {
      e.preventDefault();
      console.log('teste')
      handleClickOpen()
   }

   return (
      <>
         <section >
            <h1 style={{ textAlign: 'center' }}>Sacola</h1>
            <div style={styles.container}>
               <div style={styles.fixedContent}>
                  <h1>Resumo da compra</h1>
                  <div style={{ position: 'relative', width: '50w', margin: 'auto', textAlign: 'center', fontFamily: 'Roboto', fontSize: '3.5em' }}>
                     R$ {total}
                  </div>

                  <form style={{ margin: '5% 0 0 5%' }} onSubmit={enviar}>

                     <div style={{ display: 'flex', position: 'relative', justifyContent: 'space-around', marginTop: '5%', alignItems: 'baseline' }}>

                        <div className={style2.campos}>
                           <label htmlFor="entrega">Entrega</label>
                           <FormControl sx={{ width: '45%', marginLeft: '6px' }}>
                              <Input type="number" variant="filled" size="small" id='entrega' defaultValue={0} value={entrega}
                                 onChange={(e) => { if (e.target.value >= 0) setEntrega(e.target.value) }}
                                 margin="none"
                                 startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                              >Entrega</Input>
                           </FormControl>
                        </div>

                        <div className={style2.campos}   >
                           <label htmlFor="Desconto">Desconto</label>
                           <FormControl sx={{ width: '45%', marginLeft: '6px' }}>
                              <Input type="number" variant="filled" step={0.01} size="small" id='Desconto' defaultValue={0} value={desconto} error={errorDesconto}
                                 onChange={(e) => {
                                    if (e.target.value >= 0) setDesconto(e.target.value)
                                    if (desconto > total) {
                                       setErrorDesconto(true)
                                    }
                                 }} margin="none"
                                 startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                              >Entrega</Input>
                           </FormControl>
                        </div>
                     </div>

                     <FormControl size="small" variant="filled" style={{ marginTop: '5%', margin: '5% 100% 0 auto' }} required>
                        <InputLabel id="forma" >Forma de pagamento</InputLabel>
                        <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           label="Forma de pagamento   "
                           sx={{ width: '200px' }}
                           value={formaPagamento}
                           onChange={(e) => setFormaPagamento(e.target.value)}
                        >
                           <MenuItem value='dinheiro'>Dinheiro</MenuItem>
                           <MenuItem value='cartao'>Cartão</MenuItem>
                           <MenuItem value='pix'>Pix</MenuItem>
                        </Select>
                     </FormControl>

                     <Button
                        color="primary"
                        size="medium"
                        variant="contained"
                        type="submit"
                        // onClick={handleClickOpen}
                        //centralize o botão
                        sx={{ width: '50%', margin: '5% auto 0 auto', color: 'white', background: '#000', margin: '5% auto' }}

                     >Finalizar</Button>


                  </form>
                  <SimpleDialog
                     selectedValue={selectedValue}
                     open={open}
                     onClose={handleClose}
                     entrega={entrega}
                     desconto={desconto}
                     formaPagamento={formaPagamento}
                     total={total}
                  />

               </div>
               <Divider orientation="vertical" />
               <div style={styles.scrollableContent}><div>
                  <h1>Itens</h1>

                  <table style={style2.tabela}>
                     <thead>
                        <tr>
                           <th>imagem</th>
                           <th>nome</th>
                           <th>marca</th>
                           <th>tamanho</th>
                           <th>quantidade</th>
                           <th>valor</th>
                           <th>total</th>
                        </tr>
                     </thead>

                     <tbody>
                        {produtos.map((produto, key) => {
                           return LinhaProdutoTable(produto, key)
                        })
                        }
                     </tbody>

                  </table>
               </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Venda;