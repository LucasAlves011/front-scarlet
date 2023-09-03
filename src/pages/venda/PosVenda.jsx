import React from "react";
import { useNavigate } from 'react-router-dom';
import style from './PosVenda.module.css'
import { useEffect, useState } from 'react';
import { Animation, Progress } from 'rsuite';

function PosVenda() {

  const navigate = useNavigate();
  const [percent, setPercent] = useState(0);
  const status = percent === 100 ? 'success' : null;
  const color = percent === 100 ? '#52c41a' : '#3385ff';

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/catalogo');
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [navigate]);

  useEffect(() => {
    if (percent === 100) {
      setShow(true);
    }
  }, [percent]);

  const intervalId = setTimeout(() => {
    const value = Math.min(percent + 10, 100);
    setPercent(value);
  }, 80);


  return (

    <>
      <div className={style.caixa}>

        <Progress.Circle className={style.circulo}  percent={percent} strokeColor={color} status={status} />

        <Animation.Fade  in={show} >
           <div className={style.mensagem}>
            <h2>Venda cadastrada com sucesso!</h2>
            <p>Você será redirecionado em breve para o catálogo.</p>
          </div>
        </Animation.Fade>
      </div>
    </>

  );
}

export default PosVenda;