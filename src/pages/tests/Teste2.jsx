import { useLocation } from "react-router-dom";

function Teste() {

   const location = useLocation();

   console.log(location.state.parametros);
   const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
   }

   const handleSelect = (ranges) => {
      console.log(ranges)

   }

   return (
      <>

      </>

   );
}

export default Teste;