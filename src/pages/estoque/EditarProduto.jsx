import { Alert, AlertTitle, Dialog, DialogContentText, DialogTitle, Fade } from "@mui/material";
import { useState, useEffect } from "react";
import style from "../cadastro/Cadastro.module.css";
import style2 from "./EditarProduto.module.css";
import { IMaskInput } from "react-imask";
import FileUploader from "../../components/FileUploader.jsx";
import axios from "axios";
import { AutoComplete, Button, CheckPicker, Form, InputNumber, Stack } from "rsuite";
import { useParams, useNavigate } from "react-router-dom";
import { formatoDinheiroReal } from "../../utils/NumeroFormaters";


function DeleteConfirmDialog(props) {
   const navigate = useNavigate();

   const { onClose, selectedValue, open } = props;

   const handleClose = () => {
      onClose(selectedValue);
   };

   const handleListItemClick = (value) => {
      onClose(value);
   };
   return (
      <Dialog onClose={handleClose} open={open} className={style2.dialogDelete} >
         <div style={{ margin: '1em' }}>
            <DialogTitle style={{ textAlign: 'center' }}>Deletar produto</DialogTitle>
            <DialogContentText> Tem certeza que deseja <strong>deletar</strong> o produto ?</DialogContentText>
            <DialogContentText> <span className={style2.griff}>Nome: </span> {props.produto.nome}</DialogContentText>
            <DialogContentText> <span className={style2.griff}>Marca: </span> {props.produto.marca}</DialogContentText>
         </div>

         <Stack direction='row' spacing={5} className={style.botoesSubmit}>
            <Button className={style.botao} appearance="primary" color="green" onClick={() => deleteProduto(props.produto, navigate)}>Confirmar</Button>
            <Button className={style.botao} appearance="primary" color="red" onClick={handleClose}>Cancelar</Button>
         </Stack>
      </Dialog>
   )
}

const deleteProduto = (produto, navigate) => {
   axios.delete(process.env.REACT_APP_GATEWAY_URL + "/estoque/produto/" + produto.id)
      .then(res => {
         if (res.status === 200) {
            setTimeout(() => {
               navigate('/estoque/' + produto.marca, {
                  state: { deletado: true, produto: produto }
               })
            }, 1000)

         } else {
            setTimeout(() => {
               navigate('/estoque/' + produto.marca, {
                  state: { deletado: false, produto: produto }
               })
            }, 1000)

         }
      })
      .catch(err => {
         alert('Erro ao deletar produto!')
      })
}

function SimpleDialog(props) {

   const { onClose, selectedValue, open } = props;

   const handleClose = () => {
      onClose(selectedValue);
   };

   const handleListItemClick = (value) => {
      onClose(value);
   };

   const diferenca = (a, b) => {
      if (a > b) {
         return '(+' + (a - b).toString() + ')'
      } else if (a < b) {
         return '(' + (a - b).toString() + ')'
      } else {
         return '(0)'
      }
   }

   return (
      <Dialog onClose={handleClose} open={open} >
         {console.log(props)}
         <div style={{ padding: '15px' }}>
            <DialogTitle style={{ textAlign: 'center' }}>Confirmar alteração</DialogTitle>
            <section style={{ margin: '10px 5px 15px 15px', height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
               <DialogContentText><span className={style2.griff}>Nome:</span> {props.produto.nome} </DialogContentText>
               <DialogContentText><span className={style2.griff}>Marca:</span> {props.produto.marca} </DialogContentText>
               <DialogContentText><span className={style2.griff}>Categorias:</span>
                  <ul>
                     {props.produto.categorias.map((categoria) => (
                        <li>{categoria}</li>
                     ))}
                  </ul>
               </DialogContentText>
               {props.produto.tipo === 'avulso' &&
                  <DialogContentText> <span className={style2.griff}>Tamanhos: </span> <br /> <span className={style2.griff}>Único=</span> {props.produto.quantidade} <span className={props.produto.quantidade - props.produtoAntigo.quantidade > 0 ? style2.incremento : props.produto.quantidade - props.produtoAntigo.quantidade < 0 ? style2.decremento : style2.neutro}> {diferenca(props.produto.quantidade, props.produtoAntigo.t38)}</span> </DialogContentText>}

               {props.produto.tipo === 'numerico' &&
                  <DialogContentText>
                     <span className={style2.griff}>Tamanhos: </span> <br />
                     <table>
                        <tr>
                           <td><span className={style2.griff}>36= </span> {props.produto.t36}
                              <span className={props.produto.t36 - props.produtoAntigo.t36 > 0 ? style2.incremento : props.produto.t36 - props.produtoAntigo.t36 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t38, props.produtoAntigo.t38)}</span></td>

                           <td><span className={style2.griff}>38= </span> {props.produto.t38}
                              <span className={props.produto.t38 - props.produtoAntigo.t38 > 0 ? style2.incremento : props.produto.t38 - props.produtoAntigo.t38 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t38, props.produtoAntigo.t38)}</span></td>
                        </tr>
                        <tr>
                           <td><span className={style2.griff}>40= </span> {props.produto.t40}
                              <span className={props.produto.t40 - props.produtoAntigo.t40 > 0 ? style2.incremento : props.produto.t40 - props.produtoAntigo.t40 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t40, props.produtoAntigo.t40)}</span></td>

                           <td><span className={style2.griff}>42= </span> {props.produto.t42}
                              <span className={props.produto.t42 - props.produtoAntigo.t42 > 0 ? style2.incremento : props.produto.t42 - props.produtoAntigo.t42 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t42, props.produtoAntigo.t42)}</span></td>
                        </tr>
                        <tr>
                           <td><span className={style2.griff}>44= </span> {props.produto.t44}

                              <span className={props.produto.t44 - props.produtoAntigo.t44 > 0 ? style2.incremento : props.produto.t44 - props.produtoAntigo.t44 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t44, props.produtoAntigo.t44)}</span></td>

                           <td><span className={style2.griff}>46= </span> {props.produto.t46}
                              <span className={props.produto.t46 - props.produtoAntigo.t46 > 0 ? style2.incremento : props.produto.t46 - props.produtoAntigo.t46 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t46, props.produtoAntigo.t46)}</span></td>
                        </tr>
                        <tr>
                           <td><span className={style2.griff}>48= </span> {props.produto.t48}

                              <span className={props.produto.t48 - props.produtoAntigo.t48 > 0 ? style2.incremento : props.produto.t48 - props.produtoAntigo.t48 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t48, props.produtoAntigo.t48)}</span></td>

                           <td><span className={style2.griff}>50= </span> {props.produto.t50}
                              <span className={props.produto.t50 - props.produtoAntigo.t50 > 0 ? style2.incremento : props.produto.t50 - props.produtoAntigo.t50 < 0
                                 ? style2.decremento : style2.neutro}> {diferenca(props.produto.t50, props.produtoAntigo.t50)}</span></td>
                        </tr>
                     </table>
                  </DialogContentText>
               }

               {props.produto.tipo === 'nominal' &&
                  <DialogContentText>
                     <span className={style2.griff}>Tamanhos: </span> <br />
                     <table>
                        <tr>
                           <td><span className={style2.griff}>P= </span>{props.produto.p} <span className={props.produto.p - props.produtoAntigo.p > 0 ? style2.incremento : props.produto.p - props.produtoAntigo.p < 0
                              ? style2.decremento : style2.neutro}>{diferenca(props.produto.p, props.produtoAntigo.p)}</span></td>

                           <td><span className={style2.griff}>M= </span>{props.produto.m} <span className={props.produto.m - props.produtoAntigo.m > 0 ? style2.incremento : props.produto.m - props.produtoAntigo.m < 0
                              ? style2.decremento : style2.neutro} >{diferenca(props.produto.m, props.produtoAntigo.m)}</span></td>
                        </tr>
                        <tr>
                           <td><span className={style2.griff}>G= </span>{props.produto.g} <span className={props.produto.g - props.produtoAntigo.g > 0 ? style2.incremento : props.produto.g - props.produtoAntigo.g < 0
                              ? style2.decremento : style2.neutro} >{diferenca(props.produto.g, props.produtoAntigo.g)}</span></td>
                           <td><span className={style2.griff}>GG= </span>{props.produto.gg} <span className={props.produto.gg - props.produtoAntigo.gg > 0 ? style2.incremento : props.produto.gg - props.produtoAntigo.gg < 0
                              ? style2.decremento : style2.neutro}>{diferenca(props.produto.gg, props.produtoAntigo.gg)}</span></td>
                        </tr>
                     </table>
                  </DialogContentText>
               }


               {props.produtoAntigo.valor - props.produto.valor !== 0 ? <DialogContentText>
                  <span className={style2.griff}>Valor: </span>
                  <span style={{ textDecoration: 'line-through', fontStyle: 'italic' }}>{formatoDinheiroReal(props.produtoAntigo.valor)}</span>
                  &nbsp; {formatoDinheiroReal(props.produto.valor)}
               </DialogContentText> :
                  <DialogContentText>
                     <span className={style2.griff}>Valor: </span>
                     {formatoDinheiroReal(props.produto.valor)}
                  </DialogContentText>
               }
            </section>
            <Stack direction='row' spacing={5} className={style.botoesSubmit}>
               <Button appearance="primary" color="green" onClick={() => console.log(props.produto)} className={style.botao}>Confirmar</Button>
               <Button appearance="primary" color="red" onClick={handleClose} className={style.botao}>Cancelar</Button>
            </Stack>
         </div >
      </Dialog >
   );
}

function EditarProduto() {
   const [open, setOpen] = useState(false);
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

   const { id } = useParams()
   const [produto, setProduto] = useState()

   const [sucess, setSucess] = useState(false)
   const [error, setError] = useState(false)

   const [model, setModel] = useState()

   useEffect(() => {
      if (id) {
         console.log(id)
         fetch(process.env.REACT_APP_GATEWAY_URL + "/estoque/produto/" + id)
            .then(res => res.json())
            .then(res => {
               setModel(res)
               setProduto(res)
               console.log(res)
            })
      }
   }, [id])


   useEffect(() => {
      fetch(process.env.REACT_APP_GATEWAY_URL + "/produto/marcas").then((res) => res.json()).then((res) => {
         setOptionsMarcas(res)
      })

      fetch(process.env.REACT_APP_GATEWAY_URL + "/categoria").then((res) => res.json()).then((res) => {
         setCategorias(res)
      })
   }, [])

   const [categorias, setCategorias] = useState()
   const [optionsMarcas, setOptionsMarcas] = useState([]);

   let [imagem, setImagem] = useState(null)


   const handleClose = (value) => {
      setOpen(false);
      setOpenDeleteDialog(false)
   };

   const alterar = () => {

      // let formdata = new FormData();

      // formdata.append('produto', JSON.stringify(produto));
      // formdata.append('imagem', imagem, imagem.name);
      // formdata.append('tipo', produto.tipo);

      console.log(model)

      // axios.post(process.env.REACT_APP_GATEWAY_URL + "/produto/cadastro", formdata, {
      //    headers: {
      //       'Content-Type': 'multipart/form-data'
      //    }
      // }).then((response) => {
      //    if (response.status === 201) {
      //       setSucess(true)
      //       setTimeout(() => {
      //          setSucess(false)
      //       }, 6000)
      //    } else {
      //       setError(true)
      //       setTimeout(() => {
      //          setSucess(false)
      //       }, 6000)
      //    }
      // }).catch((error) => {
      //    console.log(error)
      // })
   }

   return (
      <>

         <h1 id={style.h1}>Editar produto</h1>

         {<Form className={style.form} model={model} style={{ width: '95vw', margin: '0 auto' }} >
            <div style={{ width: '33%', }}>
               <FileUploader reciever={setImagem} ></FileUploader>
            </div>

            <Form.Group controlId="nomeCateValor" style={{ width: '33%' }} className={style.nomeCateValor}>
               <Form.Group controlId="name">
                  <Form.ControlLabel>Nome do produto</Form.ControlLabel>
                  <Form.Control name="name" value={model && model.nome} onChange={value => setModel(model => ({ ...model, nome: value }))}
                  />
                  <Form.HelpText>Nome é obrigatório</Form.HelpText>
               </Form.Group>
               <Form.Group controlId="marca" >
                  <Form.ControlLabel>Marca</Form.ControlLabel>
                  {optionsMarcas && <AutoComplete data={optionsMarcas} value={model && model.marca} onChange={value => setModel(model => ({ ...model, marca: value }))}
                  />}
               </Form.Group>
               <Form.Group controlId="categorias" >
                  <Form.ControlLabel>Categorias</Form.ControlLabel>
                  {categorias && <CheckPicker searchable={false} value={model && model.categorias} data={categorias.map(item => ({ label: item, value: item }))} onChange={value => setModel(model => ({ ...model, categorias: value }))}
                  />}
               </Form.Group>
               <Form.Group controlId="valor">
                  <Form.ControlLabel>Valor</Form.ControlLabel>
                  <InputNumber prefix="R$" onChange={value => setModel(model => ({ ...model, valor: parseFloat(value) }))} value={model && model.valor} />
               </Form.Group>
            </Form.Group>
            <div style={{ width: '33%' }}>
               <Form.Group controlId="tamanho" className={style.are}>

                  <Form.ControlLabel>Tamanho</Form.ControlLabel>

                  {produto && produto.tipo === 'avulso' && <Form.Group controlId="avulso">
                     <Form.ControlLabel>Unidades</Form.ControlLabel>
                     <InputNumber defaultValue={0} min={0} max={99} value={model && model.quantidade} onChange={(e) => setModel({ ...model, quantidade: parseInt(e) })} />
                  </Form.Group>}

                  {produto && produto.tipo === 'numerico' &&
                     <div>
                        <div className={style.numerico}>
                           <Form.Group controlId="t36" >
                              <Form.ControlLabel >36</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t36}
                                 onChange={(e) => setModel({ ...model, t36: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="t38" >
                              <Form.ControlLabel >38</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t38}
                                 onChange={(e) => setModel({ ...model, t38: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="t40" className={style.inputNumerico}>
                              <Form.ControlLabel>40</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t40}
                                 onChange={(e) => setModel({ ...model, t40: parseInt(e) })}
                              />
                           </Form.Group>
                           <div className="col-md-3">
                              <Form.Group controlId="t42" className={style.inputNumerico}>
                                 <Form.ControlLabel>42</Form.ControlLabel>
                                 <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t42}
                                    onChange={(e) => setModel({ ...model, t42: parseInt(e) })}
                                 />
                              </Form.Group>
                           </div>
                        </div>

                        <div className={style.numerico}>
                           <Form.Group c1ontrolId="t44" className={style.inputNumerico}>
                              <Form.ControlLabel>44</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t44}
                                 onChange={(e) => setModel({ ...model, t44: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="t46" className={style.inputNumerico}>
                              <Form.ControlLabel>46</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t46}
                                 onChange={(e) => setModel({ ...model, t46: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="t48" className={style.inputNumerico}>
                              <Form.ControlLabel>48</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t48}
                                 onChange={(e) => setModel({ ...model, t48: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="t50" className={style.inputNumerico}>
                              <Form.ControlLabel>50</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.t50}
                                 onChange={(e) => {
                                    setModel({ ...model, t50: parseInt(e) })
                                    console.log(model)
                                 }}
                              />
                           </Form.Group>
                        </div>
                     </div>
                  }

                  {produto && produto.tipo === 'nominal' &&
                     <div>
                        <div className={style.numerico}>
                           <Form.Group controlId="P" >
                              <Form.ControlLabel >P</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.p}
                                 onChange={(e) => setModel({ ...model, p: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="M" >
                              <Form.ControlLabel >M</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.m}
                                 onChange={(e) => setModel({ ...model, m: parseInt(e) })}
                              />
                           </Form.Group>
                           <Form.Group controlId="G" className={style.inputNumerico}>
                              <Form.ControlLabel>G</Form.ControlLabel>
                              <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.g}
                                 onChange={(e) => setModel({ ...model, g: parseInt(e) })}
                              />
                           </Form.Group>
                           <div className="col-md-3">
                              <Form.Group controlId="GG" className={style.inputNumerico}>
                                 <Form.ControlLabel>GG</Form.ControlLabel>
                                 <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0} value={model.gg}
                                    onChange={(e) => setModel({ ...model, gg: parseInt(e) })}
                                 />
                              </Form.Group>
                           </div>
                        </div>
                     </div>
                  }
               </Form.Group>

            </div>

            <button appearance="primary" type="submit" style={{ display: 'none' }}>

            </button>
         </Form>}

         <div className={style.botoesSubmit} >
            <Button appearance="primary" onClick={() => setOpen(true)} className={style.botao}>
               Enviar
            </Button>

            <Button onClick={() => setOpenDeleteDialog(true)} className={style.botao} appearance="primary" color="red">
               Deletar
            </Button>
         </div>

         <div className={style.alert}>
            <Fade in={error}>
               <Alert severity="error" onClose={() => setError(false)} >
                  <AlertTitle>Erro</AlertTitle>
                  Ocorreu um erro, produto<strong> não alterado.</strong>
               </Alert>
            </Fade>
         </div>

         <div className={style.alert}>
            <Fade in={sucess}>
               <Alert severity="success" onClose={() => setSucess(false)}>
                  <AlertTitle>Sucesso</AlertTitle>
                  Produto alterado com  <strong>sucesso</strong>!!
               </Alert>
            </Fade>
         </div>

         {model && <SimpleDialog
            open={open}
            onClose={handleClose}
            produto={model}
            produtoAntigo={produto}
         />}

         {model && <DeleteConfirmDialog
            open={openDeleteDialog}
            onClose={handleClose}
            produto={model}
         />}

      </>

   );
}

export default EditarProduto;