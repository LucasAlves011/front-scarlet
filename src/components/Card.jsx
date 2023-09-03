import React from "react";
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container, Stack } from '@mui/system';
import { Chip, Dialog, DialogContentText, DialogTitle } from '@mui/material';
import { formatoDinheiroReal, verificarDisponibilidade } from '../utils/NumeroFormaters';
import Avatar from '@mui/material/Avatar';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} style={{ position: 'fixed', zIndex: 4 }}>
      <DialogTitle style={{ textAlign: 'center' }}>{props.nome}</DialogTitle>
      <DialogContentText>{formatoDinheiroReal(props.valor)}</DialogContentText>
      <CardMedia
        sx={{ height: '86vh', width: '53vh' }}
        image={process.env.REACT_APP_GATEWAY_URL + "/produto/imagem/" + props.imagem}
        title={props.nome}
      />
    </Dialog>
  );
}

export default function MediaCard({ produto, addCarrinho }) {

  const paletaCorChip = (quantidade) => {
    return {
      backgroundColor: quantidade > 0 ? '#3498ff' : '#ebebeb',
      color: quantidade > 0 ? '#ffff' : '#616161',
      cursor: quantidade > 0 ? 'pointer' : 'not-allowed',
    }
  }

  const paletaCorAvatar = (quantidade) => {
    return {
      fontSize: '1.008em',
      backgroundColor: quantidade > 0 ? '#ffff' : '#d9d9d9',
      color: quantidade > 0 ? '#616161' : 'black',
      cursor: quantidade > 0 ? 'pointer' : 'not-allowed',
    }
  }

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const getTamanhos = (tipoTamanho) => {
    switch (tipoTamanho) {
      case 'avulso':
        return (
          <Container style={{ display: 'flex', flexDirection: 'row', margin: 'auto', justifyContent: 'center', padding: 0 }} >

            <Stack direction="row" gap={4} sx={{ padding: "0px 0px 0px 0px" }}  >
              <Chip onClick={() => { produto.quantidade > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "" }) }} style={paletaCorChip(produto.quantidade)} label={produto.quantidade} size="medium" avatar={<Avatar circle style={paletaCorAvatar(produto.quantidade)} onClick={() => console.log('teste')}>x</Avatar>} />
              <Typography variant="body1" color="default" >{formatoDinheiroReal(produto.valor)}</Typography>
            </Stack>

          </Container>
        )

      case 'nominal':
        return (
          <>
            <Stack fontSize={20} direction="row" gap={2} sx={{ padding: "0px", justifyContent: 'center', marginTop: 1 }} >
              <Typography variant="body1">{produto.quantidade} <Typography variant='caption' fontSize={14}>un.</Typography> </Typography>

              <Typography variant="body1">{formatoDinheiroReal(produto.valor)}</Typography>

            </Stack>

            <Stack direction="row" spacing={1} style={{ justifyContent: 'space-evenly', marginTop: "10px" }}>
              <Chip onClick={() => { produto.p > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "p" }) }} style={paletaCorChip(produto.p)} label={produto.p} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.p)}>P</Avatar>} />

              <Chip onClick={() => { produto.m > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "m" }) }} style={paletaCorChip(produto.m)} label={produto.m} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.m)} >M</Avatar>} />
              <Chip onClick={() => { produto.g > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "g" }) }} style={paletaCorChip(produto.g)} label={produto.g} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.g)}>G</Avatar>} />

              <Chip onClick={() => { produto.gg > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "gg" }) }} style={paletaCorChip(produto.gg)} label={produto.gg} size="small" avatar={<Avatar circle style={{ ...paletaCorAvatar(produto.gg), fontSize: "0.85em" }} >GG</Avatar>} />

            </Stack>

          </>
        )
      case 'numerico':
        return (
          <>

            <Stack fontSize={20} direction="row" gap={2} sx={{ padding: "0px", margin: '0px', justifyContent: 'center' }} >
              <Typography variant="body1"  >{produto.quantidade}<Typography variant='caption' fontSize={14}>un.</Typography></Typography>
              <Typography variant="body1">{formatoDinheiroReal(produto.valor)}</Typography>

            </Stack>

            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '240px', justifyContent: 'space-evenly' }}>
              <Stack direction="row" spacing={2} >
                <Chip onClick={() => { produto.t36 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t36" }) }} style={paletaCorChip(produto.t36)} label={produto.t36} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t36)}>36</Avatar>} />

                <Chip onClick={() => { produto.t38 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t38" }) }} style={paletaCorChip(produto.t38)} label={produto.t38} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t38)}>38</Avatar>} />

                <Chip onClick={() => { produto.t40 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t40" }) }} style={paletaCorChip(produto.t40)} label={produto.t40} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t40)}>40</Avatar>} />

                <Chip onClick={() => { produto.t42 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t42" }) }} style={paletaCorChip(produto.t42)} label={produto.t42} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t42)}>42</Avatar>} />

              </Stack>
              <Stack direction="row" spacing={2} style={{ marginTop: 4 }} >
                <Chip onClick={() => { produto.t44 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t44" }) }} style={paletaCorChip(produto.t44)} label={produto.t44} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t44)}>44</Avatar>} />

                <Chip onClick={() => { produto.t46 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t46" }) }} style={paletaCorChip(produto.t46)} label={produto.t46} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t46)}>46</Avatar>} />

                <Chip onClick={() => { produto.t48 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t48" }) }} style={paletaCorChip(produto.t48)} label={produto.t48} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t48)}>48</Avatar>} />

                <Chip onClick={() => { produto.t50 > 0 && addCarrinho({ ...produto, tamanhoSelecionado: "t50" }) }} style={paletaCorChip(produto.t50)} label={produto.t50} size="small" avatar={<Avatar circle style={paletaCorAvatar(produto.t50)}>50</Avatar>} />

              </Stack>
            </div>

          </>
        )
      default:
        break;
    }
  }


  const t = {
    backgroundColor: '#bbbabf',
    hover: {
      backgroundColor: 'blue',
      boxShadow: '4 4 4 1.2rem rba(0,123,255,.5g)',
    },
    cursor: 'pointer'
  }

  return (
    <Card sx={{ width: 250, height: 370 }} variant="outlined">

      <div onClick={handleClickOpen} style={t}>
        <CardMedia
          sx={{ height: 260, width: 250, zIndex: 2 }}
          style={{
            filter: !verificarDisponibilidade(produto) && ' grayscale(1)',
            opacity: !verificarDisponibilidade(produto) && '0.5'
          }}
          image={process.env.REACT_APP_GATEWAY_URL + "/produto/imagem/" + produto.imagem}
          title={produto.nome}
        />

      </div>

      <CardContent style={{ padding: 0, alignContent: 'center', width: 250, height: 110 }} >

        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-around', width: 250, height: 110 }}>

          <abbr title={produto.nome} style={{ textDecoration: 'none', textAlign: 'center', overflow: 'hidden' }}>
            <Typography variant='h5' style={{ margin: '0px auto 0px auto', padding: 'auto auto auto auto', width: 'auto', fontSize: '19px', }} component="div">
              {produto.nome}
            </Typography>
          </abbr>

          {getTamanhos(produto.tipo)}

        </div>
      </CardContent>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        imagem={produto.imagem}
        nome={produto.nome}
        valor={produto.valor}
      />

    </Card>


  );
}