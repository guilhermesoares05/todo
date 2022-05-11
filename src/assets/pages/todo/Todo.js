//imports react
import React, { useState, useEffect } from 'react';

//imports router
import { Link } from "react-router-dom";

//imports mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

//import firebase
import myApp from "../../core/firebaseConfig"
import "firebase/compat/firestore";
import "firebase/compat/auth";

const Todo = () => {
    const menuHome = React.createRef();
    const menuTodo = React.createRef();
    const [positionMenu, setPositionMenu] = useState(1);

    useEffect(() => {
        if (localStorage.getItem('currentUserDynamicsNotepad') === '') {
            window.location.assign(window.location.origin + '/login');
        }
    }, []);

    //função que faz referencia ao item do menu
    const handleClickMenu = () => {
        menuHome.current.click();
    }
    //função que faz referencia ao item do menu
    const handleClickTodo = () => {
        menuTodo.current.click();
    }

    //funão responsável por realizar o logout do usuario
    const handleLogout = async () => {
        myApp.auth().signOut().then(() => {
            localStorage.setItem('currentUserDynamicsNotepad', '');
            window.location.assign(window.location.origin + '/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Grid
            container
            style={{

            }}
        >
            {/*Item do menu */}
            <Typography
                variant="h6"
                component="h6"
                style={{
                    display: 'none'
                }}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#f00'
                    }}
                    to='/'
                    //referencia para o click
                    ref={menuHome}
                >
                    <i>Bloco de notas</i>
                </Link>
            </Typography>

            {/*item do menu */}
            <Typography
                variant="h6"
                component="h6"
                style={{
                    display: 'none',
                }}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#f00'
                    }}
                    //referencia para o click
                    to='/todo'
                    ref={menuTodo}
                >
                    <i>Lista de tarefas!</i>
                </Link>
            </Typography>

            {/**cabecalho da pagina */}
            <Grid
                container
                item
                style={{
                    height: '90px'
                }}
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    sx={{ width: 500 }}

                >
                    <BottomNavigation
                        showLabels
                        value={positionMenu}
                        onChange={(event, newValue) => {
                            setPositionMenu(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Bloco de notas" icon={<TextSnippetIcon />} onClick={handleClickMenu} />
                        <BottomNavigationAction label="lista de tarefas" icon={<FormatListNumberedRtlIcon />} onClick={handleClickTodo} />
                    </BottomNavigation>
                </Box>
            </Grid>

            {/**corpo da pagina */}
            <Grid
                container
                item
                direction="cloumn"
                alignItems="center"
                justifyContent="center"
                style={{
                    heigth: '100vh'
                }}
            >
                <Typography
                    variant="h1"
                    component="h1">
                    Lista de tarefas
                </Typography>
            </Grid>

            <Button
                color='primary'
                variant='contained'
                style={{
                    width: '200px'
                }}
                onClick={handleLogout}
            >
                Sair
            </Button>
        </Grid>
    );
}

export default Todo;