import { Alert, AlertTitle, Fade } from "@mui/material";
import { useState, useEffect } from "react";
import style from "./Cadastro.module.css";
import { IMaskInput } from "react-imask";
import FileUploader from "../../components/FileUploader.jsx";
import axios from "axios";
import { AutoComplete, Button, CheckPicker, Form, InputNumber, RadioGroup, Radio, Input } from "rsuite";

function Cadastro() {

    const [sucess, setSucess] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_GATEWAY_URL + "/produto/marcas").then((res) => res.json()).then((res) => {
            setOptionsMarcas(res)
        })

        fetch(process.env.REACT_APP_GATEWAY_URL + "/categoria").then((res) => res.json()).then((res) => {
            setCategorias(res)
        })
    }, [])

    let [categorias, setCategorias] = useState()
    let [optionsMarcas, setOptionsMarcas] = useState([]);

    let [imagem, setImagem] = useState(null)

    let [avulso, setAvulso] = useState(0)

    let [numerico, setNumerico] = useState({
        t36: 0,
        t38: 0,
        t40: 0,
        t42: 0,
        t44: 0,
        t46: 0,
        t48: 0,
        t50: 0
    })

    let [nominal, setNominal] = useState({
        p: 0,
        m: 0,
        g: 0,
        gg: 0
    })

    /** TODO: CONTAR UNIDADES, TALVEZ SEJA RE-IMPLEMENTADO NO FUTUDO */
    // useEffect(() => {
    //     let soma = 0
    //     for (let i in nominal) {
    //         soma += isNaN(nominal[i]) ? 0 : nominal[i]
    //     }
    //     setQuantidade(soma)
    // }, [nominal])

    // useEffect(() => {
    //     let soma = 0
    //     for (let i in numerico) {
    //         soma += isNaN(numerico[i]) ? 0 : numerico[i]
    //     }
    //     setQuantidade(soma)
    // }, [numerico])

    // useEffect(() => {
    //     setQuantidade(avulso)
    // }, [avulso])

    // const limparCampos = () => {
    //     setAvulso(0)
    //     setNominal({
    //         p: 0,
    //         m: 0,
    //         g: 0,
    //         gg: 0
    //     })
    //     setNumerico({
    //         t36: 0,
    //         t38: 0,
    //         t40: 0,
    //         t42: 0,
    //         t44: 0,
    //         t46: 0,
    //         t48: 0,
    //         t50: 0
    //     })
    //     setQuantidade(0)
    // }

    const cadastrar = () => {
        let produto = {
            nome: model.nome,
            marca: model.marca,
            categorias: model.categorias,
            valor: parseFloat(model.valor),
            numerico: null,
            avulso: null,
            nominal: null
        }

        if (tipo === "numerico") {
            produto = { ...produto, numerico: numerico }
        } else if (tipo === "avulso") {
            produto = { ...produto, avulso: parseFloat(avulso) }
        } else if (tipo === "nominal") {
            produto = { ...produto, nominal: nominal }
        }


        let formdata = new FormData();

        formdata.append('produto', JSON.stringify(produto));
        formdata.append('imagem', imagem, imagem.name);
        formdata.append('tipo', tipo);

        axios.post(process.env.REACT_APP_GATEWAY_URL + "/produto/cadastro", formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.status === 201) {
                setSucess(true)
                setTimeout(() => {
                    setSucess(false)
                }, 6000)
            } else {
                setError(true)
                setTimeout(() => {
                    setSucess(false)
                }, 6000)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const [model, setModel] = useState({
        nome: '',
        marca: '',
        categorias: [],
        valor: 0
    })

    const [tipo, setTipo] = useState("avulso")

    return (
        <>
            <h1 id={style.h1}>Cadastrar produto</h1>
            <Form className={style.form} model={model} style={{ width: '95vw', margin: '0 auto' }} >
                <Form.Group controlId="nomeCateValor" style={{ width: '33%' }} className={style.nomeCateValor}>
                    <Form.Group controlId="name">
                        <Form.ControlLabel>Nome do produto</Form.ControlLabel>
                        <Input name="name" style={ {width: '90%'}} onChange={value => setModel(model => ({ ...model, nome: value }))} />
                        <Form.HelpText>Nome é obrigatório</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="marca" >
                        <Form.ControlLabel>Marca</Form.ControlLabel>
                        {optionsMarcas && <AutoComplete data={optionsMarcas} style={{width: '30%'}} onChange={value => setModel(model => ({ ...model, marca: value }))}
                        />}
                    </Form.Group>
                    <Form.Group controlId="categorias" >
                        <Form.ControlLabel>Categorias</Form.ControlLabel>
                        {categorias && <CheckPicker searchable={false} style={ {width: '90%'}} value={model.categorias} data={categorias.map(item => ({ label: item, value: item }))} onChange={value => setModel(model => ({ ...model, categorias: value }))}
                        />}
                    </Form.Group>
                    <Form.Group controlId="valor">
                        <Form.ControlLabel>Valor</Form.ControlLabel>
                        <InputNumber prefix="R$" min={0} onChange={value => setModel(model => ({ ...model, valor: parseFloat(value) }))} style={{width: '30%'}}/>
                    </Form.Group>
                </Form.Group>
                <div style={{ width: '33%' }}>
                    <Form.Group controlId="tamanho" className={style.are}>

                        <Form.ControlLabel>Tamanho</Form.ControlLabel>

                        <RadioGroup inline name="radioList" defaultValue="avulso" value={tipo} onChange={setTipo} style={{ display: 'flex', margin: '0 auto' }}>
                            <Radio value="avulso">Avulso</Radio>
                            <Radio value="numerico">Numérico</Radio>
                            <Radio value="nominal">Nominal</Radio>
                        </RadioGroup>

                        {tipo === 'avulso' && <Form.Group controlId="avulso">
                            <Form.ControlLabel>Unidades</Form.ControlLabel>
                            <InputNumber defaultValue={0} min={0} max={99} onChange={(e) => setAvulso(parseInt(e))} style={{width: '25%'}}/>
                        </Form.Group>}

                        {tipo === 'numerico' &&
                            <div>
                                <div className={style.numerico}>
                                    <Form.Group controlId="t36" >
                                        <Form.ControlLabel >36</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t36: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="t38" >
                                        <Form.ControlLabel >38</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t38: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="t40" className={style.inputNumerico}>
                                        <Form.ControlLabel>40</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t40: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <div className="col-md-3">
                                        <Form.Group controlId="t42" className={style.inputNumerico}>
                                            <Form.ControlLabel>42</Form.ControlLabel>
                                            <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                                onChange={(e) => setNumerico({ ...numerico, t42: parseInt(e) })}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className={style.numerico}>
                                    <Form.Group c1ontrolId="t44" className={style.inputNumerico}>
                                        <Form.ControlLabel>44</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t44: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="t46" className={style.inputNumerico}>
                                        <Form.ControlLabel>46</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t46: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="t48" className={style.inputNumerico}>
                                        <Form.ControlLabel>48</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t48: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="t50" className={style.inputNumerico}>
                                        <Form.ControlLabel>50</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNumerico({ ...numerico, t50: parseInt(e) })}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        }

                        {tipo === 'nominal' &&
                            <div>
                                <div className={style.numerico}>
                                    <Form.Group controlId="P" >
                                        <Form.ControlLabel >P</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNominal({ ...nominal, p: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="M" >
                                        <Form.ControlLabel >M</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNominal({ ...nominal, m: parseInt(e) })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="G" className={style.inputNumerico}>
                                        <Form.ControlLabel>G</Form.ControlLabel>
                                        <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                            onChange={(e) => setNominal({ ...nominal, g: parseInt(e)(e) })}
                                        />
                                    </Form.Group>
                                    <div className="col-md-3">
                                        <Form.Group controlId="GG" className={style.inputNumerico}>
                                            <Form.ControlLabel>GG</Form.ControlLabel>
                                            <InputNumber min={0} max={99} style={{ width: 60 }} defaultValue={0}
                                                onChange={(e) => setNominal({ ...nominal, gg: parseInt(e) })}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        }
                    </Form.Group>

                </div>
                <div style={{ width: '33%', }}>
                    <FileUploader reciever={setImagem} ></FileUploader>
                </div>
                <button appearance="primary" type="submit" style={{ display: 'none' }}>

                </button>
            </Form>

            <div id={style.botaoSubmit}>
                <Button appearance="primary" onClick={() => cadastrar()} id={style.botao}>
                    Cadastrar
                </Button>
            </div>

            <div className={style.alert}>
                <Fade in={error}>
                    <Alert severity="error" onClose={() => setError(false)} >
                        <AlertTitle>Erro</AlertTitle>
                        Ocorreu um erro, produto<strong> não cadastrado.</strong>
                    </Alert>
                </Fade>
            </div>

            <div className={style.alert}>
                <Fade in={sucess}>
                    <Alert severity="success" onClose={() => setSucess(false)}>
                        <AlertTitle>Sucesso</AlertTitle>
                        Produto cadastrado com  <strong>sucesso</strong>!!
                    </Alert>
                </Fade>
            </div>
        </>

    );
}

export default Cadastro;