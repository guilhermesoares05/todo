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

//imports de components
import Header from '../components/Header';
import Footer from '../components/Footer';

//import firebase
import myApp from "../../core/firebaseConfig"
import "firebase/compat/firestore";
import "firebase/compat/auth";

const Home = () => {

    const handleFirebaseConnection = async () => {
        let querySnapshot = await myApp.firestore().collection("teste").get();
        for (let doc of querySnapshot.docs) {
            console.log("Dados do banco Teste do firebase", doc.data());
        }
    }

    useEffect(() => {
        if (localStorage.getItem('currentUserDynamicsNotepad') === '') {
            window.location.assign(window.location.origin + '/login');
        }
        handleFirebaseConnection();
    }, []);

    return (

        <Grid 
        container
        item
        style={{
            display: "flex",
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
                    padding:"20px",
                    display:"flex",
                }}
            >
                <Link to="/inserirNota" style={{
                    textDecoration:"none",
                    fontSize:"50px",
                    fontFamily:"arial",
                    background:"#FF1701",
                    width:"60px",
                    textAlign:"center",
                    borderRadius:"50%",
                    color:"#fff",
                }}>
                +
                </Link>
            </Grid>
            {/*notas salvas*/}
            <Grid
                container
                item
                justifyContent="center"
            >
                <List sx={{ width: '80%', bgcolor: '#BABDB6',borderRadius:'10px'}}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                        <Typography
                            style={{ display: 'flex' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                </List>
            </Grid>
            <Footer />
        </Grid>


    );
}

export default Home;