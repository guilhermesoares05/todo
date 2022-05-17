import Header from '../components/Header';
//import mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

const NotesInsert = () => {
    return(
        <>
        <Header />
        {/*titulo da nota */}
        <Grid
            container
            item
            justifyContent="center"

        >
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 4, width: '50ch'},
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
            style={{ width: 400 }}
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
                    marginTop:"10px"
                }}
            >
                Salvar
            </Button>
        </Grid>

        </>
    )
}

export default NotesInsert;