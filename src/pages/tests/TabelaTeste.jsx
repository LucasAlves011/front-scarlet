import { Card, CardMedia, Grid } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function EnhancedTable() {

  let data = new Date("2023-04-04T04:34:46.258063");

  return (
    <div>
      <Link to={{
        pathname: '/teste2',
        state: {
          parametros: 'aasdasd'
        },
      }}>teste</Link>

      {format(data, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })}

      <Card sx={{ width: 220, height: 325 }} variant="outlined">
        <CardMedia
          component="div"
          sx={{ height: '100%', width: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url(${"http://localhost:8080/produto/imagem/" + '5f9ea64f-ade0-4019-9b42-005747f4bbf5.png'})` }}
        />
        <div className="card-body">
          <h5 className="card-title">Titulo</h5>
          <p className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam </p>
        </div>
      </Card>

      <Grid container spacing={2} xs={22} lg={6}>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>1</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>2</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>3</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>4</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>5</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>6</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>7</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>8</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>9</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>10</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>11</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>12</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>13</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>14</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>15</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>16</div>
        <div style={{border: '1px solid black' , width: '100px', height: '100px'}}>17</div>

      </Grid>


    </div>
  );
}