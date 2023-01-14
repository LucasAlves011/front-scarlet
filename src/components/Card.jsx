import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { json } from 'react-router-dom';
import { NoMeals, Rowing } from '@mui/icons-material';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';
import { Container, Stack } from '@mui/system';

export default function MediaCard({ produto }) {

  const getTamanhos = (tipoTamanho) => {
    switch (tipoTamanho) {
      case 'avulso':
        return (
          <Container >

            <Stack direction="row" gap={4} sx={{padding:"0px 0px 0px 0px"}} >
              <Typography variant="body1" color="text.secondary" >{produto.quantidade} unidades</Typography>
              <Typography variant="body1" color="text.secondary" >R$ {produto.valor},00</Typography>
            </Stack>

          </Container>
        )

      case 'nominal':
        return (
          <Container >

          <Stack direction="row" gap={4} sx={{padding:"0px 0px 0px 0px"}} >
            <Typography variant="body1" color="text.secondary" >{produto.quantidade} unidades</Typography>
            <Typography variant="body1" color="text.secondary" >R$ {produto.valor},00</Typography>
            <br></br>
            <Stack direction="row" gap={1} variant="body3" color="text.secundary">
              <Container>P: {produto.p} </Container>
              <Container>M: {produto.m}</Container>
              <Container>G: {produto.g}</Container>
              <Container>GG: {produto.gg}</Container>
            </Stack>
          </Stack>

        </Container>
      )
      case 'numerico':
        return <> numerico</>
      default:
        break;
    }
  }

  useEffect(() => {
    // fetch("http://localhost:8080/produto/marca/" + elemento).then((response) => response.json()).then((x) => setData(x))
  }, [])


  return (
    <Card sx={{ width: 250 ,height:350}}>
      <CardMedia
        sx={{ height: 230, width: 300 }}
        image={produto.imagem}
        title="green iguana"
      />
      <CardContent>

        <Typography gutterBottom variant="h7" component="div">
          {produto.nome}
        </Typography>
        {/*
        <Typography variant="body2" color="text.secondary">
          {produto.quantidade}
          {produto.valor}
        </Typography> */}
        {getTamanhos(produto.tipo)}

      </CardContent>



      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>

    //     <>
    //       {data !== undefined && data.map((item, key) => {
    //         return(

    //           <div key={key}>
    //              <img
    //             src={item.imagem}
    //             alt={item.nome}
    //             key={key}
    //             width={300}
    //             height={300}
    //           />

    //             <div>{item.nome}</div>
    //             <div>{item.marca}</div>
    //             <div>{item.categorias}</div>
    //             <div>{item.quantidade}</div>
    //             <div>{item.valor}</div>
    //         </div>
    // )


    //       })}

    //       {/* <img src="http://localhost:8080/produto/imagem/c27b48aa-ab2f-4436-81b7-cb889245c9a7" alt="teste" /> */}
    //     </>

  );
}