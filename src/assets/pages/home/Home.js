//imports react
import React, { useState, useEffect } from 'react';

//imports router
import { Link } from "react-router-dom";

//imports mui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import theme from '../../core/theme';
import AddBoxIcon from '@mui/icons-material/AddBox';

//imports de components
import Header from '../../components/Header';

//import firebase
import myApp from "../../core/firebaseConfig";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const Home = () => {

    const [userId, setUserId] = useState(localStorage.getItem('currentUserDynamicsNotepad'));
    const [userNotes, setUserNotes] = useState([]);
    const [dialog, setDialog] = useState(false);

    const getMyNotes = async () => {
        let userNotesAux = [];
        let querySnapshot = await myApp.firestore().collection("notes").where("uid", "==", userId).get();
        console.log('Quem é vc?', querySnapshot.docs.length);
        if (querySnapshot.docs.length > 0) {
            for (let doc of querySnapshot.docs) {
                userNotesAux.push({
                    id: doc.id,
                    title: doc.data().title,
                    text: doc.data().text
                });
            }
            setUserNotes(userNotesAux);
        } else {
            setUserNotes([{
                title: 'Sem notas',
                text: 'Você ainda não tem notas cadastradas, fique a vontade para cadastrar!'
            }])
        }
    }

    useEffect(() => {
        if (userId === null) {
            window.location.assign(window.location.origin + '/login');
        }
        getMyNotes();
    }, []);

    const handleDeleteNote = (id) => {
        myApp.firestore().collection("notes").doc(id).delete().then(() => {
            setDialog(true);
        });
    }

    const handleGetMyNotes = () => {
        getMyNotes();
        setDialog(false);
    }

    return (

        <Grid
            container
            item
            style={{
                display: "flex",
                position:'relative',
            }}
        >
            {/*Item do cabeçalho */}
            <Header />
            {/*botão adicionar nota */}
            <Grid
                container
                item
                style={{
                    justifyContent: "right",
                    padding: "20px",
                    display: "flex",
                }}
            >
                <Link to="/inserirNota" style={{
                    color:"white",
                    display:"flex",
                    background:"red",
                    alignItems:"center",
                    padding:"10px",
                    borderRadius:"50%",
                }}>
                    <AddBoxIcon />
                </Link>
                
            </Grid>
            {/*notas salvas*/}
            <Grid
                container
                item
                justifyContent="center"
            >
                {
                    userNotes.length != 0 ?
                        <List sx={{ width: '80%', bgcolor: '#BABDB6', borderRadius: '10px', marginBottom:"20px" }}>
                            {/**Implementand map com notas do usuario */}
                            {
                                userNotes.map((item, k) => (
                                    <ListItem alignItems="flex-start" key={k} style={{ borderBottom: '1px solid #fff' }} >
                                        <ListItemText
                                            primary={item.title}
                                            secondary={
                                                <Grid
                                                    container
                                                    item
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    <Grid
                                                        item
                                                    >
                                                        <Typography
                                                            style={{ display: 'flex' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {item.text}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        container
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            backgroundColor: '#f00',
                                                            borderRadius: '20px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            theme={theme}
                                                            onClick={() => handleDeleteNote(item.id)}
                                                            color='neutral'
                                                        />
                                                    </Grid>
                                                </Grid>
                                            }
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                        :
                        <Grid>
                            <CircularProgress />
                        </Grid>
                }
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
                        Nota deletada com sucesso
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGetMyNotes}>Voltar</Button>
                </DialogActions>
            </Dialog>
        </Grid>


    );
}

export default Home;