//imports react
import React from 'react';
import { useState, useEffect } from 'react';


//imports mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import myApp from "../core/firebaseConfig";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import BasicMenu from '../components/Menu';


const Header = () => {


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
                item
                style={{
                    width:"100%",
                    display: "flex",
                    padding: "10px",
                    justifyContent: "space-between",
                    background: "#2e3436",
                    alignItems: "center"
                }}>
                {/* logo da aplicação */}
                <Grid 
                    item
                    style={{
                        padding:'5px',
                        marginRight:"20px",
                        }}>
                        <img src="/logo-dynamics-notepad.svg" alt="logo" 
                        style={{
                            width:'80px',
                        }}/>
                </Grid>
                {/* usuário */}
                <Grid
                    container
                    item
                    style={{
                       display:"flex",
                       alignItems:"center",  
                       justifyContent:"center"                         
                    }}
                >
                    <Typography
                        component="h1"
                        style={{
                            color:"#fff",
                            padding:"5px",
                        }}
                    >
                        {
                            userDisplayName === '' ? '' : 'Olá ' + userDisplayName + ', bem vindo!'
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
                </Grid>

                <BasicMenu />
            </Grid>
        </>

    );
}

export default Header;