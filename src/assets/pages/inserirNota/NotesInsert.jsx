import Header from '../components/Header';
import Footer from '../components/Footer';
//import mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { Routes, Route, Link } from "react-router-dom";

const NotesInsert = () => {
    return(
        
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <Header />
            {/*titulo da nota */}
            <Grid
                container
                item
                justifyContent="center"
                display="flex"

            >
                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '80%'},
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="standard-basic" label="Título da nota" variant="standard" />
                </Box>           
            </Grid>

            {/* texto da nota */}

            <Grid
                container
                item
                justifyContent="center"
            >
                <TextareaAutosize
                aria-label="minimum height"
                minRows={10}
                placeholder="Digite sua nota aqui..."
                style={{ 
                    width: "50%",
                    borderRadius:"5px", 
                    padding:"5px",
                }}
                />    
            </Grid> 
            <Grid
                container
                item
                justifyContent="center"
                
            >
                <Button
                    color='primary'
                    variant='contained'
                    style={{
                        width: '200px',
                        marginTop:"10px",
                    }}
                >
                    Salvar
                </Button>
            </Grid>
            <Footer />
        </Grid>
    )
}

export default NotesInsert;