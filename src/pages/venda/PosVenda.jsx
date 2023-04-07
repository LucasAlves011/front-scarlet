import { useNavigate } from 'react-router-dom';
import style from './PosVenda.module.css'
import { useEffect, useState } from 'react';

function PosVenda() {

   const navigate = useNavigate();
   const [mensagem, setMensagem] = useState('Você será redirecionado em breve para o catálogo.');

   //a cada segundo incrementar um . no final da mensagem


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/catalogo');
    }, 5000);

    const intervalId = setInterval(() => {
      setMensagem(mensagem => mensagem + '.');
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [navigate]);

   return (

      <>
         <div className={style.vendaCadastrada}>
            <h2>Venda cadastrada com sucesso!</h2>
            <p>Obrigado por registrar a venda.</p>
         </div>
         <p id={style.mensagem}>{mensagem}</p>

      </>

   );
}

export default PosVenda;