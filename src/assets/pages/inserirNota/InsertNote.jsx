//import do Reacr
import React, { useState, useEffect } from 'react';

//import de componentes
import Header from '../../components/Header';

//import mui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//import firebase
import myApp from "../../core/firebaseConfig"
import "firebase/compat/firestore";


const InsertNote = () => {

    const [userId, setUserId] = useState(localStorage.getItem('currentUserDynamicsNotepad'));

    const [values, setValues] = useState({
        noteTitle: '',
        noteText: ''
    });

    const [dialog, setDialog] = useState(false);

    //função responsável por preencher os states de titulo e texto da nota
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleAddNotes = async () => {
        if(values.noteTitle !== '' && values.noteText !== ''){
            myApp.firestore().collection("notes").add({
                uid: userId,
                title: values.noteTitle,
                text: values.noteText
            }).then(() => {
                setDialog(true);
            });
        } else {
            alert("Campos com preenchimento obrigatório, por favor tente novamente!")
        }
    }

    const handleGoHome = () => {
        window.location.assign(window.location.origin);
        setDialog(false);
    }

    return (

        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{
                marginTop:"25vh"
            }}

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
                        '& > :not(style)': { m: 3, width: '80%', background:"#fff", borderRadius:"5px"}
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Título da nota"
                        variant="standard"
                        onChange={handleChange('noteTitle')}
                    />
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
                        height:'300px',
                        borderRadius: "5px",
                        padding: "5px",
                    }}
                    onChange={handleChange('noteText')}
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
                        marginTop: "10px",
                    }}
                    onClick={handleAddNotes}
                >
                    Salvar
                </Button>
            </Grid>
            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    Aviso de sistema
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Nota cadastrada com sucesso
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGoHome}>Voltar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default InsertNote;