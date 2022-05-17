//imports mui
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'

//import NotesInsert
import NotesInsert from '../inserirNota/NotesInsert';

// componentes da página 
const Notes = () => {

    return(
        <>
        {/*Item do cabeçalho */}
        <Header />

        {/*corpo do botão */}
        <Grid style={{
          display: "flex",
          justifyContent: "right",
          marginRight: "20px"
        }}>
          <Link to="/inserirNota" style={{
            textDecoration:"none",
            fontSize:"50px",
            fontFamily:"arial",
            background:"blue",
            width:"60px",
            textAlign:"center",
            borderRadius:"50%",
            color:"#fff",
          }}>
            +
          </Link>
        </Grid>

        {/*acordeon */}
        <Grid style={{
          marginTop:"40px",
          padding: "20px",
        }}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Fazer Compras</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{
            justifyContent: "space-between",
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
        </Grid>
        </>

    );
}

export default Notes;