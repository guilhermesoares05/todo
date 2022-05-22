//imports react
import React from 'react';
import { useState, useEffect } from 'react';


//imports mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import myApp from "../core/firebaseConfig";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const Header = () => {

    //funão responsável por realizar o logout do usuario
    const handleLogout = async () => {
        myApp.auth().signOut().then(() => {
            localStorage.removeItem('currentUserDynamicsNotepad');
            window.location.assign(window.location.origin + '/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    const [userDisplayName, setUserDisplayName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');

    const userData = myApp.auth().currentUser;
    useEffect(() => {
        if (userData !== null) {
            let formatName = userData.displayName === null ? [' '] : userData.displayName.split(' ');
            setUserDisplayName(formatName.shift());
            setUserPhoto(userData.photoURL);
        }
    }, [userData]);

    return(
        <>
            <Grid 
            width="100%"
            item
            style={{
                display: "flex",
                padding: "10px",
                justifyContent: "right",
                background: "#2e3436",
                alignItems: "center"
            }}>
                <Typography
                    component="h1"
                    style={{
                        color:"#fff",
                        padding:"5px",
                    }}
                >
                    {
                        userDisplayName === '' ? '' : 'Ola ' + userDisplayName + ' seja bem vindo!'
                    }
                </Typography>
                <Stack direction="row" spacing={2} style={{
                    marginRight:"10px",
                    border:"2px solid white",
                    padding:"5px",
                    borderRadius:"50%",
                }}>
                    <Avatar alt="user photo" src={userPhoto} />
                </Stack>

                <Grid
                    style={{
                        cursor: 'pointer',
                        color: '#fff',
                        marginRight:"10px",
                    }}
                >
                    <span style={{
                        display:"flex",
                        alignItems:"center",
                        border:"2px solid white",
                        borderRadius:"10px",
                        height:"40px",
                        flexDirection:"column",
                        padding:"10px"
                    }}>
                    <ExitToAppIcon onClick={handleLogout} />
                    Sair
                    </span>
                </Grid>
            </Grid>
            <Grid 
                container
                item
            style={{
                        justifyContent:'center',
                        width:'100%',
                        padding:'10px',
                    }}>
                    <img src="/logo-dynamics-notepad.svg" alt="logo" 
                    style={{
                        width:'100px',
                    }}/>
            </Grid>
        </>

    );
}

export default Header;