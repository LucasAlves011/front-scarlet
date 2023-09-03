import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function BotaoHome(textoPrimario,textoSecundario,data,expanded,handleChange) {
   return (

      <Accordion  expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel0bh-content" id="panel0bh-header">

           <Typography sx={{width: '33%',flexShrink:0}}>{textoPrimario}</Typography>
           <Typography sx={{color: 'text.secondary',width: '33%' }}> {textoSecundario}</Typography>
           <Typography sx={{color: 'text.secondary' }}>{data}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>


    );
}

export default BotaoHome;