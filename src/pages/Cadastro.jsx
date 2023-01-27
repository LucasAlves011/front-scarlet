import { Autocomplete, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function Cadastro() {

    useEffect(() => {
        fetch("http://localhost:8080/produto/marcas").then((res) => res.json()).then((res) => setOptionsMarcas(res))
    }, [])

    let [optionsMarcas, setOptionsMarcas] = useState();
    let [marca, setMarca] = useState('');

    return (

        <>
            <Typography variant="h1" align="center" sx={{ fontSize: '4.5em' }}>Cadastrar Produto </Typography>

            <TextField id="filled-basic" label="Nome" variant="filled" />
            <TextField id="filled-basic" label="Valor" variant="filled" type="number" style={{ }} />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={optionsMarcas}
                sx={{ width: 300 }}
                freeSolo={true}
                inputValue={marca}
                onInputChange={(event, newInputValue) => {
                    setMarca(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Marca" />}
            />


            <button onClick={() => console.log(marca)}>botão</button>

        </>

    );
}

export default Cadastro;