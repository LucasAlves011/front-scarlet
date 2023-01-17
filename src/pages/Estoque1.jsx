import MultiSelect from "../components/MultiSelect";
import { useState, useEffect } from "react";
import { Box, Container, FormControlLabel, List, Radio } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate, Link } from "react-router-dom";

function Estoque1() {
  const navigate = useNavigate()
  let [marcas, setMarcas] = useState();
  let [tabela, setTabela] = useState();
  let [tabela2, setTabela2] = useState();
  let [select, setSelect] = useState("");

  useEffect(() => {
    fetch(" http://localhost:8080/produto/quantidade-marcas").then((data) => data.json()).then((val) => {
      setMarcas(val.map((x, key) => { return { id: key, value: x.marca } }))
      setTabela(val.map((a) => { return { ...a, cor: "white" } }))
      setTabela2(val.map((a) => { return { ...a, cor: "white" } }))
    })
  }, [])

  useEffect(() => {
    if (tabela !== undefined) {
      switch (select) {
        case "ocultar":
          setTabela2(tabela.filter(tabela => tabela.unidades > 0).map(tabela => {
            tabela.cor = "white"
            return tabela
          }))
          break;

        case "realçar":
          setTabela2(tabela.map(tabela => {
            if (tabela.unidades <= 0) {
              tabela.cor = "#ffe9e8"
              return tabela
            } else
              return tabela
          }))
          break;

        default:
          setTabela2(tabela.map(tabela => {
            tabela.cor = "white"
            return tabela
          }))
          setTabela2(tabela)
          break;
      }
    }
  }, [select])


  const mudarRota = (e) => {
    navigate("/estoque/" + e)
  }

  return (

    <Box>
      <MultiSelect dados={marcas !== undefined ? marcas : []} placeholder="Marcas" label="Categorias"></MultiSelect>

      <FormControlLabel
        control={<Radio
          checked={select === 'ocultar'}
          onClick={() => select === "ocultar" ? setSelect("") : setSelect('ocultar')}
          value="ocultar"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'A' }}

        />}
        label="Ocultar marcas sem estoque."
      />

      <FormControlLabel
        control={<Radio
          checked={select === 'realçar'}
          onClick={() => select === "realçar" ? setSelect("") : setSelect('realçar')}
          value="realçar"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'B' }}
        />}
        label="Realçar marcas sem estoque."
      />

      <List sx={{ width: 1050 }}>
        {tabela2 !== undefined && tabela2.map((row) => {
          return (
            <ListItem key={row.marca} itemID={row.marca} >
              <Link to={"produto/" + row.marca}> </Link>
              <ListItemButton style={{ backgroundColor: row.cor }} onClick={() => mudarRota(row.marca)} sx={{ padding: 1.8, border: '1px solid #e0e0e0', borderRadius: '5px', }} itemID={row.marca}>
                <Container width={600}> {row.marca} </Container>
                <Container width={100}> {row.produtos} {row.produtos > 1 ? 'produtos' : 'produto'} </Container>
                <Container width={100}> {row.unidades} {row.unidades > 1 ? 'unidades' : 'unidade'} </Container>
              </ListItemButton>
            </ListItem>
          )
        }
        )}
      </List>

    </Box>
  );
}

export default Estoque1;
