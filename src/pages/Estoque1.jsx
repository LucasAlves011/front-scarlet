import MultiSelect from "../components/MultiSelect";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Box, Container, List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate, Link } from "react-router-dom";

function Estoque1() {
  const navigate = useNavigate()
  let [marcas, setMarcas] = useState();
  let [tabela, setTabela] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/produto/quantidade-marcas").then((data) => data.json()).then((val) => {
      setMarcas(val.map((x, key) => { return { id: key, value: x.marca } }))
      setTabela(val)
    })
  }, [])

  const mudarRota = (e) => {
    navigate("/estoque/" + e)
  }

  return (

    <Box>
      {/* {tabela !== undefined && tabela.map((x) => {return (x.marca)})} */}

      <MultiSelect dados={marcas} placeholder="Marcas"></MultiSelect>

      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />

      <List sx={{ width: 1050 }}>
        {tabela !== undefined && tabela.map((row) => {
          return (
            <ListItem key={row.marca} itemID={row.marca}>
              <Link to={"produto/" + row.marca}> </Link>
              <ListItemButton onClick={() => mudarRota(row.marca)} sx={{ padding: 1.8, border: '1px solid #e0e0e0', borderRadius: '5px' }} itemID={row.marca}>
                <Container width={600}> {row.marca} </Container>
                <Container width={100}> {row.produtos} {row.produtos > 1 ? 'produtos' : 'produto'} </Container>
                <Container width={100}> {row.unidades} {row.unidades > 1 ? 'unidades' : 'unidade'} </Container>
              </ListItemButton>
            </ListItem>
          )
        }
        )}
      </List>
      {/* { tabela !== undefined && tabela.map( (row,key) => {<div>{a(row.marca,row.produtos)}</div>} )} */}
    </Box>
  );
}

export default Estoque1;
