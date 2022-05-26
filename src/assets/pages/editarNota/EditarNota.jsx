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
import myApp from "../../core/firebaseConfig";
import "firebase/compat/firestore";

//imports do router
import { useParams } from "react-router-dom";

const EditarNota = () => {
    const params = useParams();
    //state id do usuario
    const [userId, setUserId] = useState(localStorage.getItem('currentUserDynamicsNotepad'));

    //states da nota
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    //states dialog
    const [dialog, setDialog] = useState(false);
    
    useEffect(()=>{
        getNote()
    }, []);

    //função responsável por pegar a nota do usuario 
    const getNote = async () => {
        let querySnapshot = await myApp.firestore().collection("notes").doc(params.idNota).get();
        setNoteTitle(querySnapshot.data().title);
        setNoteText(querySnapshot.data().text);
    }

    //função responsável por alterar a nota do usuario 
    const handleEditNotes = async () => {
        if(noteTitle !== '' && noteText !== ''){
            myApp.firestore().collection("notes").doc(params.idNota).update({
                title: noteTitle,
                text: noteText
            }).then(() => {
                setDialog(true);
            });
        } else {alert("Campos com preenchimento obrigatório, por favor tente novamente!")
            
        }
    }

    //função responsavel por voltar ao inicio
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
                        '& > :not(style)': { m: 2, width: '80%', },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="standard-basic"
                        label="Título da nota"
                        variant="standard"
                        onChange={(e) => {setNoteTitle(e.target.value)}}
                        value={noteTitle}
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
                    onChange={(e) => {setNoteText(e.target.value)}}
                    value={noteText}
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
                    onClick={handleEditNotes}
                >
                    Editar
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
                        Nota alterada com sucesso
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGoHome}>Voltar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default EditarNota;