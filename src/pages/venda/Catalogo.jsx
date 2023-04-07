import { Avatar, Badge, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import Carrinho from "../../components/carrinho/Carrinho";
import MultiSelect from "../../components/MultiSelect";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { styled } from '@mui/material/styles';


function EstoqueGeral({ car }) {
   const { marca } = useParams();

   const [produtos, setProdutos] = useState();
   const [produtos2, setProdutos2] = useState();
   const [categorias, setCategorias] = useState();
   const [filtros, setFiltros] = useState([]);
   const [parametro, setParametro] = useState();
   const [marcas, setMarcas] = useState();
   const [bagVisible, setBagVisible] = useState(true);
   const [qtdItens, setQtdItens] = useState(0);

   const contarItens = (newNumber) => {
      setQtdItens(() => 0 +  newNumber)
   }

   const [carrinho, setCarrinho] = useState([]);

   const [hoveredProdutoId, setHoveredProdutoId] = useState(null);


   function handleMouseEnter(id) {
      setHoveredProdutoId(id);
   }

   function handleMouseLeave() {
      setHoveredProdutoId(null);
   }

   let nominal = ['P', 'M', 'G', 'GG']

   const [selectedCategorias, setSelectedCategorias] = useState();
   const [selectedMarcas, setSelectedMarcas] = useState();

   useEffect(() => {
      fetch(process.env.REACT_APP_GATEWAY_URL+"/produto").then((response) => response.json()).then((x) => {
         setProdutos(x)
         setProdutos2(x)
      })
   }, [])

   useEffect(() => {
      if (produtos !== undefined) {
         let catUnique = Array.from(new Set(produtos.map(x => { return x.categorias }).reduce((a, g) => a.concat(g), [])))
         setCategorias(catUnique.map((e, key) => { return { id: key, value: e } }))

         let marcasUnique = Array.from(new Set(produtos.map(x => { return x.marca })))
         setMarcas(marcasUnique.map((e, key) => { return { id: key, value: e } }))

      }
   }, [produtos])

   useEffect(() => {
      if (selectedCategorias !== undefined && selectedCategorias.length > 0) {
         let auxProd = []
         selectedCategorias.forEach((e) => {
            auxProd.push(...produtos.filter((x) => x.categorias.includes(e)))
         })
         setProdutos2([...new Set(auxProd)])
      } else if (selectedCategorias !== undefined && selectedCategorias.length === 0) {
         setProdutos2(produtos)
      }

   }, [selectedCategorias])

   useEffect(() => {
      let auxProd = []
      if (filtros !== undefined && filtros.length > 0) {
         filtros.forEach((e) => {
            if (nominal.includes(e)) {
               switch (e) {
                  case 'P':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.p > 0 && !auxProd.includes(x))))
                     break
                  case 'M':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.m > 0 && !auxProd.includes(x))))
                     break
                  case 'G':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.g > 0 && !auxProd.includes(x))))
                     break
                  case 'GG':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.gg > 0 && !auxProd.includes(x))))
                     break
                  default:
                     break
               }
            } else {
               switch (e) {
                  case '36':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t36 > 0 && !auxProd.includes(x))))
                     break
                  case '38':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t38 > 0 && !auxProd.includes(x))))
                     break
                  case '40':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t40 > 0 && !auxProd.includes(x))))
                     break
                  case '42':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t42 > 0 && !auxProd.includes(x))))
                     break
                  case '44':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t44 > 0 && !auxProd.includes(x))))
                     break
                  case '46':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t46 > 0 && !auxProd.includes(x))))
                     break
                  case '48':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t48 > 0 && !auxProd.includes(x))))
                     break
                  case '50':
                     auxProd.push(...produtos.filter((x) => x.tipo === "avulso" || (x.t50 > 0 && !auxProd.includes(x))))
                     break
                  default:
                     break
               }
            }
         })
         setProdutos2([...new Set(auxProd)])
      } else if (filtros !== undefined && filtros.length === 0) {
         setProdutos2(produtos)
      }
   }, [filtros])

   const handleFiltros = (e) => {
      if (e.target.checked === true) {
         setFiltros(filtros === [] ? [e.target.value] : [...filtros, e.target.value])
      }
      else {
         setFiltros(filtros.filter((x) => x !== e.target.value))
      }
   }

   const addCarrinho = () => {
      let a = produtos2.filter((x) => x.id === hoveredProdutoId)
      setParametro(a[0])
   }

   const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
         right: 7,
         top: 13,
         border: `2px solid ${theme.palette.background.paper}`,
         padding: '0 4px',
      },
   }));

   return (
      <>
         <div hidden={!bagVisible}>
            <Carrinho prop={carrinho} produtoAdd={parametro} resetAdd={setParametro} setBagVisible={setBagVisible} setQtdItens={contarItens}></Carrinho>
         </div>

         <Typography variant="h1" align="center" sx={{ fontSize: '4.5em' }}>Estoque </Typography>

         <IconButton aria-label="cart" style={{left:'90vw'}} onClick={() => setBagVisible(true)}>
            <StyledBadge badgeContent={qtdItens} color="primary" >
               <ShoppingBagIcon style={{height:40,width:50}}/>
            </StyledBadge>
         </IconButton>


         <div style={{ display: 'flex', direction: 'row', height: 45, width: 500, justifyContent: 'space-around', margin: '20px auto' }}>

            {['P', 'M', 'G', 'GG'].map((e, key) => {
               return (
                  <div style={{ width: 45, height: 40 }} key={key}>
                     <Checkbox
                        defaultChecked={false}
                        onChange={(e) => handleFiltros(e)}
                        value={e}
                        icon={<Avatar sx={{ bgcolor: 'white', color: '#6558f5', border: '1px solid #6558f5' }} variant="rounded">{e}</Avatar>}
                        checkedIcon={<Avatar sx={{ bgcolor: "#6558f5", width: 40 }} variant="rounded" >{e}</Avatar>} />
                  </div>
               )
            })}

         </div>

         <div style={{ display: 'flex', direction: 'row', height: 45, width: 600, justifyContent: 'space-around', margin: '20px auto' }}>

            {['36', '38', '40', '42', '44', '46', '48', '50'].map((e, key) => {
               return (
                  <div style={{ width: 45, height: 40 }} key={key}>
                     <Checkbox
                        defaultChecked={false}
                        onChange={(e) => handleFiltros(e)}
                        value={e.toString()}
                        icon={<Avatar sx={{ bgcolor: 'white', color: '#6558f5', border: '1px solid #6558f5' }} variant="rounded">{e}</Avatar>}
                        checkedIcon={<Avatar sx={{ bgcolor: "#6558f5", width: 40 }} variant="rounded" >{e}</Avatar>} />
                  </div>
               )
            })}

         </div>

         <div style={{ flexDirection: "row" }}>
            <MultiSelect dados={categorias !== undefined ? categorias : []} placeholder="Selecione as categorias" reciever={setSelectedCategorias}></MultiSelect>
            <MultiSelect dados={marcas !== undefined ? marcas : []} placeholder="Selecione as marcas" reciever={setSelectedMarcas}></MultiSelect>
         </div>

         <Stack direction="row" gap={4} marginLeft={5} marginTop={2} flexWrap="wrap" marginBottom={6}>
            {produtos2 !== undefined && produtos2.map((produto, key) => {
               return (
                  <section
                     key={produto.id}
                     onMouseEnter={() => handleMouseEnter(produto.id)}
                     onMouseLeave={handleMouseLeave}
                     style={{ position: 'relative' }}
                  >
                     {<IconButton size="small" aria-label="addCarrinho" style={{ zIndex: 2, position: 'absolute', top: 10, right: 10, backgroundColor: 'white', color: '#1565c0' }} onClick={addCarrinho}><AddShoppingCartIcon  ></AddShoppingCartIcon></IconButton>}

                     <Card produto={produto}></Card>
                  </section>
               )
            })}
            {
               produtos2 !== undefined && produtos2.length === 0 && <Typography variant="h1" align="center" sx={{ margin: "30px auto", fontSize: '4.5em', color: "#4b4d53" }}>Sem produtos </Typography>
            }
         </Stack>
      </>

   );
}

export default EstoqueGeral;