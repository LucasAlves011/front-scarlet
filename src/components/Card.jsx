import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container, Stack } from '@mui/system';
import {  Button, Chip, Dialog, DialogContentText, DialogTitle } from '@mui/material';
import { formatoDinheiroReal } from '../utils/NumeroFormaters';
import { Avatar } from 'rsuite';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.nome}</DialogTitle>
      <DialogContentText>{formatoDinheiroReal(props.valor)}</DialogContentText>
      <CardMedia
        sx={{ height: '85vh', width: '57vh' }}
        image={process.env.REACT_APP_GATEWAY_URL + "/produto/imagem/" + props.imagem}
        title={props.nome}
      />
    </Dialog>
  );
}

export default function MediaCard({ produto }) {

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

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
          <Container style={{  display: 'flex', flexDirection: 'row', margin: 'auto',justifyContent: 'center',padding: 0 }}>

            <Stack direction="row" gap={4} sx={{ padding: "0px 0px 0px 0px" }} >
            <Chip style={{backgroundColor: produto.quantidade > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.quantidade} size="medium" avatar={<Avatar circle style={{fontSize: '1.008em' , backgroundColor: '#C2C2C2'}}></Avatar>} />
              <Typography variant="body1" color="default" >{formatoDinheiroReal(produto.valor)}</Typography>
            </Stack>

          </Container>
        )

      case 'nominal':
        return (
          <>
            <Stack fontSize={20} direction="row" gap={2} sx={{ padding: "0px", justifyContent: 'center', marginTop: 1   }} >
              <Typography variant="body1">{produto.quantidade} <Typography variant='caption' fontSize={14}>un.</Typography> </Typography>

              <Typography variant="body1">{formatoDinheiroReal(produto.valor)}</Typography>

            </Stack>

            <Stack direction="row" spacing={1} style={{ justifyContent: 'space-evenly', marginTop: "10px" }}>
              <Chip style={{backgroundColor: produto.p > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.p} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>P</Avatar>} />

              <Chip style={{backgroundColor: produto.m > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.m} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}} >M</Avatar>} />
              <Chip style={{backgroundColor: produto.g > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.g} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>G</Avatar>} />

              <Chip style={{backgroundColor: produto.gg > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.gg} size="small" avatar={<Avatar circle >GG</Avatar>} />

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
                <Chip style={{backgroundColor: produto.t36 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t36} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>36</Avatar>} />

                <Chip style={{backgroundColor: produto.t38 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t38} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>38</Avatar>} />

                <Chip style={{backgroundColor: produto.t40 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t40} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>40</Avatar>} />

                <Chip style={{backgroundColor: produto.t42 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t42} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>42</Avatar>} />

              </Stack>
              <Stack direction="row" spacing={2} style={{ marginTop: 4 }} >
                <Chip style={{backgroundColor: produto.t44 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t44} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>44</Avatar>} />

                <Chip style={{backgroundColor: produto.t46 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t46} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>46</Avatar>} />

                <Chip style={{backgroundColor: produto.t48 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t48} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>48</Avatar>} />

                <Chip style={{backgroundColor: produto.t50 > 0 ? '#ebebeb' : '#ff9b96'}} label={produto.t50} size="small" avatar={<Avatar circle style={{fontSize: '1.008em'}}>50</Avatar>} />

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
      boxShadow: '4 4 4 1.2rem rgba(0,123,255,.5)',
    },
    cursor: 'pointer'
  }

  return (
    <Card sx={{ width: 250, height: 370 }} variant="outlined">

      <div onClick={handleClickOpen} style={t}>
        <CardMedia
          sx={{ height: 260, width: 300 }}
          image={process.env.REACT_APP_GATEWAY_URL + "/produto/imagem/" + produto.imagem}
          title={produto.nome}
        />
      </div>

      <CardContent style={{ padding: 0, alignContent: 'center', width: 250, height: 110 }} >

        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-around', width: 250, height: 110 }}>

          <abbr title={produto.nome} style={{textDecoration: 'none' , textAlign: 'center' , overflow: 'hidden'}}>
            <Typography variant='h5' style={{ margin: '0px auto 0px auto', padding: 'auto auto auto auto', width: 'auto', fontSize: '19px',  }} component="div">
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