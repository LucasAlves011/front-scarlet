import { useLocation } from "react-router-dom";

function Teste() {

   const location = useLocation();
   
   console.log(location.state.parametros);

   return (
      <>

         <h1>Teste</h1>
      </>

    );
}

export default Teste;