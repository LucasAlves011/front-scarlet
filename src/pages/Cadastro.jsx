import { Autocomplete, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import HelpIcon from '@mui/icons-material/Help';
import style from "./Cadastro.module.css";
import { IMaskInput } from "react-imask";
import FileUploader from "../components/FileUploader";
import MultiSelect from "../components/MultiSelect.jsx";
import axios from "axios";

function Cadastro() {

    useEffect(() => {
        fetch("http://localhost:8080/produto/marcas").then((res) => res.json()).then((res) => setOptionsMarcas(res))
        fetch("http://localhost:8080/categoria").then((res) => res.json()).then((res) => setCategorias(res.map((x, key) => { return { id: key, value: x } }))
        )
    }, [])

    let [categorias, setCategorias] = useState()
    let [optionsMarcas, setOptionsMarcas] = useState([]);

    let [nome, setNome] = useState('');
    let [valor, setValor] = useState(0);
    let [marca, setMarca] = useState('');
    let [tipo, setTipo] = useState("nominal")
    let [quantidade, setQuantidade] = useState(0)
    let [imagem, setImagem] = useState(null)
    let [categoriasSelecionadas, setCategoriasSelecionadas] = useState([])

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

    useEffect(() => {
        let soma = 0
        for (let i in nominal) {
            soma += isNaN(nominal[i]) ? 0 : nominal[i]
        }
        setQuantidade(soma)
    }, [nominal])

    useEffect(() => {
        let soma = 0
        for (let i in numerico) {
            soma += isNaN(numerico[i]) ? 0 : numerico[i]
        }
        setQuantidade(soma)
    }, [numerico])

    useEffect(() => {
        setQuantidade(avulso)
    }, [avulso])

    const limparCampos = () => {
        setAvulso(0)
        setNominal({
            p: 0,
            m: 0,
            g: 0,
            gg: 0
        })
        setNumerico({
            t36: 0,
            t38: 0,
            t40: 0,
            t42: 0,
            t44: 0,
            t46: 0,
            t48: 0,
            t50: 0
        })
        setQuantidade(0)
    }

    const mudarTamanhos = () => {
        if (tipo === "nominal") {
            return <>
                <div style={{ display: 'flex', flexDirection: "column", width: "70px", height: "300px", justifyContent: "space-around" }}>

                    <TextField id="p" label="P" variant="outlined" type="number" size="small" defaultValue={0} value={nominal.p} onChange={(e) => setNominal({ ...nominal, p: parseInt(e.target.value) })} />

                    <TextField id="m" label="M" variant="outlined" type="number" size="small" defaultValue={0} value={nominal.m} onChange={(e) => setNominal({ ...nominal, m: parseInt(e.target.value) })} />

                    <TextField id="g" label="G" variant="outlined" type="number" size="small" defaultValue={0} value={nominal.g} onChange={(e) => setNominal({ ...nominal, g: parseInt(e.target.value) })} />

                    <TextField id="gg" label="GG" variant="outlined" type="number" size="small" defaultValue={0} value={nominal.gg} onChange={(e) => setNominal({ ...nominal, gg: parseInt(e.target.value) })} />

                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }} className={style.contador}>
                    <div>{quantidade}</div>
                    <div style={{ fontFamily: "Roboto", fontSize: "0.7em" }}>Unidades</div>
                </div>
            </>
        } else if (tipo === "numerico") {
            return <>
                <div className={style.numerico}>
                    <TextField id="36" label="36" variant="outlined" type="number" size="small" value={numerico.t36} defaultValue={0} onChange={(e) => setNumerico({ ...numerico, t36: parseInt(e.target.value) })} />
                    <TextField id="38" label="38" variant="outlined" type="number" size="small" value={numerico.t38} defaultValue={0} onChange={(e) => setNumerico({ ...numerico, t38: parseInt(e.target.value) })} />
                    <TextField id="40" label="40" variant="outlined" type="number" size="small" value={numerico.t40} defaultValue={0} onChange={(e) => setNumerico({ ...numerico, t40: parseInt(e.target.value) })} />
                    <TextField id="42" label="42" variant="outlined" type="number" size="small" value={numerico.t42} defaultValue={0} onChange={(e) => setNumerico({ ...numerico, t42: parseInt(e.target.value) })} />
                </div>

                <div className={style.numerico}>
                    <TextField id="44" label="44" variant="outlined" type="number" size="small" defaultValue={0} value={numerico.t44} onChange={(e) => setNumerico({ ...numerico, t44: parseInt(e.target.value) })} />
                    <TextField id="46" label="46" variant="outlined" type="number" size="small" defaultValue={0} value={numerico.t46} onChange={(e) => setNumerico({ ...numerico, t46: parseInt(e.target.value) })} />
                    <TextField id="48" label="48" variant="outlined" type="number" size="small" defaultValue={0} value={numerico.t48} onChange={(e) => setNumerico({ ...numerico, t48: parseInt(e.target.value) })} />
                    <TextField id="50" label="50" variant="outlined" type="number" size="small" defaultValue={0} value={numerico.t50} onChange={(e) => setNumerico({ ...numerico, t50: parseInt(e.target.value) })} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }} className={style.contador}>
                    <div>{quantidade}</div>
                    <div style={{ fontFamily: "Roboto", fontSize: "0.7em" }}>Unidades</div>
                </div>
            </>

        } else if (tipo === "avulso") {
            return <>
                <div style={{ display: 'flex', flexDirection: "column", width: "70px", height: "300px", justifyContent: "space-around" }}>
                    <TextField id="avulso" label="Avulso" variant="outlined" type="number" size="small" onChange={(e) => {
                        setAvulso(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))
                    }} />

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }} className={style.contador}>
                    <div>{quantidade}</div>
                    <div style={{ fontFamily: "Roboto", fontSize: "0.7em" }}>Unidades</div>
                </div>
            </>

        }
    }

    // const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    //     const { onChange, ...other } = props;
    //     return (
    //       <IMaskInput
    //         {...other}
    //         mask="###.###.###,##"
    //         definitions={{
    //           '#': /[1-9]/,
    //         }}
    //         inputRef={ref}
    //         onAccept={(value) => onChange({ target: { name: props.name, value } })}
    //         overwrite
    //       />
    //     );
    //   });
    const cadastrar = () => {
        let produto = {
            nome: nome,
            marca: marca,
            categorias: categoriasSelecionadas,
            valor: valor,
            numerico: null,
            avulso: null,
            nominal: null
        }

        if (tipo === "numerico") {
            produto = { ...produto, numerico: numerico }
        } else if (tipo === "avulso") {
            produto = { ...produto, avulso: avulso }
        } else if (tipo === "nominal") {
            produto = { ...produto, nominal: nominal }
        }


        let formdata = new FormData();

        formdata.append('produto', JSON.stringify(produto));
        formdata.append('imagem', imagem, imagem.name);
        formdata.append('tipo', tipo);

        console.log(produto)
        console.log(tipo)

        axios.post("http://localhost:8080/produto/cadastro", formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <section className={style.all}>
            <div className={style.h1}>
                <Typography variant="h1" align="center" sx={{ fontSize: '3.5em' }}>Cadastrar Produto </Typography>
            </div>

            <div className={style.todoConteudo}>
                <section className={style.textos}>
                    <TextField id="filled-basic" label="Nome" variant="filled" size="small" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={optionsMarcas}
                        sx={{ width: 200 }}
                        freeSolo={true}
                        inputValue={marca}
                        size="small"
                        onInputChange={(event, newInputValue) => {
                            setMarca(newInputValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Marca" variant="filled" />}
                    />

                    <MultiSelect dados={categorias !== undefined ? categorias : []} placeholder="Categorias" reciever={setCategoriasSelecionadas} variant="filled" width={300}></MultiSelect>

                    <TextField id="filled-basic" label="Valor" variant="filled" size="small" type="number"
                        style={{ width: "150px" }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        value={valor}
                        onChange={(e) => setValor(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
                    />
                </section>
                <section className={style.tamanho}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Tamanho</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="nominal"
                            name="radio-buttons-group"
                            onChange={(e) => {
                                setTipo(e.target.value)
                                limparCampos()
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FormControlLabel value="nominal" control={<Radio />} label="Nominal" style={{ marginRight: 3 }} />
                                <HelpIcon titleAccess="P, M, G e GG." fontSize="inherit" color="info" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FormControlLabel value="numerico" control={<Radio />} label="Numerico" style={{ marginRight: 3 }} />
                                <HelpIcon titleAccess="36, 38, 40, 42..." fontSize="inherit" color="info" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FormControlLabel value="avulso" control={<Radio />} label="Avulso" style={{ marginRight: 3 }} />
                                <HelpIcon titleAccess="Tamanho único." fontSize="inherit" color="info" />
                            </div>
                        </RadioGroup>
                    </FormControl>
                    {mudarTamanhos()}
                </section>
                <section >
                    <FileUploader reciever={setImagem}  ></FileUploader>
                </section>

            </div>
            <button className={style.enviar} onClick={cadastrar}> Cadastrar</button>

        </section>

    );
}

export default Cadastro;