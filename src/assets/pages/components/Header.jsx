//imports react
import React from 'react';


//imports mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import myApp from "../../core/firebaseConfig"


const Header = () => {

    //funão responsável por realizar o logout do usuario
    const handleLogout = async () => {
        myApp.auth().signOut().then(() => {
            localStorage.setItem('currentUserDynamicsNotepad', '');
            window.location.assign(window.location.origin + '/login');
        }).catch((error) => {
            console.log(error);
        });
    }
    return(
        <>
            <Grid 
            width="100%"
            item
            style={{
                display: "flex",
                padding: "10px",
                justifyContent: "center",
                background: "#2e3436",
                alignItems: "center"
            }}>

                <img src="/logo-dynamics-notepad.svg" alt="logo dynamics" width={120} />
            </Grid>
            <Grid
                container
                item
                justifyContent="right"
                padding="10px"
            >
            <Button
                color='primary'
                variant='contained'
                style={{
                    width: '100px',
                    height: '40px'
                }}
                onClick={handleLogout}
            >
                Sair
            </Button>
            </Grid>
        </>

    );
}

export default Header;