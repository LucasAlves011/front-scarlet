import { useParams } from "react-router-dom";

function Estoque2() {
   const param = useParams();

   return (
      <>
         mudou de pagina {param.id}
      </>

    );
}

export default Estoque2;