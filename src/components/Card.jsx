import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container, Stack } from '@mui/system';
import { Avatar, Chip } from '@mui/material';


export default function MediaCard({ produto }) {

  const getTamanhos = (tipoTamanho) => {
    switch (tipoTamanho) {
      case 'avulso':
        return (
          <Container style={{marginTop: "10px"}}>

            <Stack direction="row" gap={4} sx={{ padding: "0px 0px 0px 0px" }} >
              <Typography variant="body1" color="default" >{produto.quantidade} un.</Typography>
              <Typography variant="body1" color="default" >R$ {produto.valor},00</Typography>
            </Stack>

          </Container>
        )

      case 'nominal':
        return (
          <>
            <Stack fontSize={20} direction="row" gap={2} sx={{ padding: "0px", justifyContent: 'center' , marginTop: 1}} >
              <Typography variant="body1"  >{produto.quantidade} <Typography variant='caption' fontSize={14}>un.</Typography> </Typography>

              <Typography variant="body1"  >R$ {produto.valor},00</Typography>

            </Stack>

            <Stack direction="row" spacing={1} style={{ justifyContent: 'space-evenly' , marginTop: "10px"}}>
              <Chip color={produto.p > 0 ? 'default' : 'error'} label={produto.p} size="small" avatar={<Avatar>P</Avatar>} />

              <Chip color={produto.m > 0 ? 'default' : 'error'} label={produto.m} size="small" avatar={<Avatar>M</Avatar>} />
              <Chip color={produto.g > 0 ? 'default' : 'error'} label={produto.g} size="small" avatar={<Avatar>G</Avatar>} />

              <Chip color={produto.gg > 0 ? 'default' : 'error'} label={produto.gg} size="small" avatar={<Avatar>GG</Avatar>} />

            </Stack>

          </>
        )
      case 'numerico':
        return (
          <>

            <Stack fontSize={20} direction="row" gap={2} sx={{ padding: "0px", margin: '0px', justifyContent: 'center' }} >
              <Typography variant="body1"  >{produto.quantidade}<Typography variant='caption' fontSize={14}>un.</Typography></Typography>
              <Typography variant="body1">R$ {produto.valor},00</Typography>

            </Stack>

            <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '240px', justifyContent: 'space-evenly' }}>
              <Stack direction="row" spacing={2} >
                <Chip color={produto.t36 > 0 ? 'default' : 'error'} label={produto.t36} size="small" avatar={<Avatar>36</Avatar>} />

                <Chip color={produto.t38 > 0 ? 'default' : 'error'} label={produto.t38} size="small" avatar={<Avatar>38</Avatar>} />

                <Chip color={produto.t40 > 0 ? 'default' : 'error'} label={produto.t40} size="small" avatar={<Avatar>40</Avatar>} />

                <Chip color={produto.t42 > 0 ? 'default' : 'error'} label={produto.t42} size="small" avatar={<Avatar>42</Avatar>} />

              </Stack>
              <Stack direction="row" spacing={2} style={{ marginTop: 4 }} >
                <Chip color={produto.t44 > 0 ? 'default' : 'error'} label={produto.t44} size="small" avatar={<Avatar>44</Avatar>} />

                <Chip color={produto.t46 > 0 ? 'default' : 'error'} label={produto.t46} size="small" avatar={<Avatar>46</Avatar>} />

                <Chip color={produto.t48 > 0 ? 'default' : 'error'} label={produto.t48} size="small" avatar={<Avatar>48</Avatar>} />

                <Chip color={produto.t50 > 0 ? 'default' : 'error'} label={produto.t50} size="small" avatar={<Avatar>50</Avatar>} />

              </Stack>
            </div>

          </>
        )
      default:
        break;
    }
  }

  return (
    <Card sx={{ width: 250, height: 370 }} variant="outlined">

      <CardMedia
        sx={{ height: 260, width: 300 }}
        image={"http://192.168.1.110:8080/produto/imagem/" + produto.imagem}
        title={produto.nome}
      />

      <CardContent style={{ padding: 0, alignContent: 'center', width: 250, height: 110 }} >

        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-around', width: 250, height: 110 }}>

          <Typography variant='h5' style={{ margin: '0px auto 0px auto', padding: 'auto auto auto auto', width: 'auto', fontSize: '19px' }} component="div">
            {produto.nome}
          </Typography>

          {getTamanhos(produto.tipo)}

        </div>
      </CardContent>



      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>


  );
}