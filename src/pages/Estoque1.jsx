import MultiSelect from "../components/MultiSelect";
import { useState, useEffect } from "react";
import { Box, Container, FormControlLabel, List, Radio, Typography } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate, Link } from "react-router-dom";
import Carrinho from "../components/carrinho/Carrinho.jsx";

function Estoque1() {
  const navigate = useNavigate()
  let [marcas, setMarcas] = useState();
  let [marcasSelecionadas, setMarcasSelecionadas] = useState([]);
  let [tabela, setTabela] = useState();
  let [tabela2, setTabela2] = useState();
  let [select, setSelect] = useState("");
  let [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    fetch(process.env.GATEAWAY_URL+"/produto/quantidade-marcas").then((data) => data.json()).then((val) => {
      setMarcas(val.map((x, key) => { return { id: key, value: x.marca } }))
      setTabela(val.map((a) => { return { ...a, cor: "white" } }))
      setTabela2(val.map((a) => { return { ...a, cor: "white" } }))
    })
  }, [])

  useEffect(() => {
    if (marcasSelecionadas !== undefined && marcasSelecionadas.length > 0) {
      setTabela2(tabela.filter(p => marcasSelecionadas.includes(p.marca)))
    } else if (marcasSelecionadas.length === 0) {
      setTabela2(tabela)
    }
  }, [marcasSelecionadas])

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
              tabela.cor = "#ffc2bf"
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
      {/* <Carrinho car={carrinho}></Carrinho> */}

      <Typography variant="h2" align="center" style={{ margin: "auto" }} sx={{ padding: 2 }}>Estoque</Typography>

      <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-around", width: "95%", marginBottom: 25 }}>
        <MultiSelect dados={marcas !== undefined ? marcas : []} placeholder="Marcas" label="Categorias" reciever={setMarcasSelecionadas}></MultiSelect>

        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}>
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
        </div>
      </div>

      <List sx={{ width: 1050 }}>
        {tabela2 !== undefined && tabela2.map((row) => {
          return (
            <ListItem key={row.marca} itemID={row.marca} >
              <Link to={"produto/" + row.marca}> </Link>
              <ListItemButton style={{ backgroundColor: row.cor }} onClick={() => mudarRota(row.marca)} sx={{ padding: 1.8, border: '1px solid #e0e0e0', borderRadius: '5px', }} itemID={row.marca}>
                <Container width={600}> {row.marca} </Container>
                <Container width={100}> {row.produtos} {row.produtos > 1 || row.produtos === 0 ? 'produtos' : 'produto'} </Container>
                <Container width={100}> {row.unidades} {row.unidades > 1 || row.unidades === 0 ? 'unidades' : 'unidade'} </Container>
              </ListItemButton>
            </ListItem>
          )
        }
        )}
      </List>
      <button onClick={() => console.log(marcasSelecionadas)}>ver marcas selecionadas</button>
    </Box>
  );
}

export default Estoque1;
