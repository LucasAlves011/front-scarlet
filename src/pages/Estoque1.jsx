import MultiSelect from "../components/MultiSelect";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Box, Container, List } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from "react-router-dom";

function Estoque1() {
  const navigate = useNavigate()
  let [dados, setDados] = useState();
  let [tabela, setTabela] = useState();

  useEffect(() => {
    fetch("http://localhost:3004/categorias").then((data) => data.json()).then((val) => { setDados(val) })
    fetch("http://localhost:3004/produtos").then((data) => data.json()).then((val) => { setTabela(val) })
  }, [])

  const mudarRota = (e) => {
    navigate("/estoque/"+e)
  }

  return (

    <Box>
      <MultiSelect dados={dados}></MultiSelect>

      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />

      <List sx={{ width: 1050}}>
        {tabela !== undefined && tabela.map((row) => {
          return (
            <ListItem key={row.id} itemID={row.id}>
              <ListItemButton onClick={() => mudarRota(row.id)} sx={{  padding: 1.8, border: '1px solid #e0e0e0', borderRadius: '5px' }} itemID={row.id}>
                <Container width={600} >{row.nome}</Container>
                <Container width={100}>{row.produtos} produtos</Container>
                <Container width={100}>{row.unidades} unidades</Container>
              </ListItemButton>
            </ListItem>)
        })}
      </List>
    </Box>
  );
}

export default Estoque1;
