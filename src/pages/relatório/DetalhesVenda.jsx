import { useParams } from "react-router-dom";

function DetalhesVenda() {
   const { data } = useParams()

   return (
         <>
         Detalhe venda
            {
               data && <p>{data}</p>
            }
         </>

    );
}

export default DetalhesVenda;