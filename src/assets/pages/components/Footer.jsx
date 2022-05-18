//imports react
import React, { useState, useEffect } from 'react';

//imports router
import { Routes, Route, Link } from "react-router-dom";

//imports mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';


const Footer = () => {

    const menuHome = React.createRef();
    const menuTodo = React.createRef();
    const [positionMenu, setPositionMenu] = useState(0);

    //função que faz referencia ao item do menu
    const handleClickMenu = () => {
        menuHome.current.click();
    }
    //função que faz referencia ao item do menu
    const handleClickTodo = () => {
        menuTodo.current.click();
    }    
    return(
    <Grid 
        style={{
            width:"100%",
            position: "absolute",
            bottom: 0,
            left: 0,
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
                    <i>Bloco de notas!</i>
                </Link>
            </Typography>
            {/**cabecalho da pagina */}
            <Grid
                container
                item
                style={{
                    
                }}
                direction="row"
                alignItems="center"
                justifyContent="center"
                
            >
                <Box
                    style={{
                        
                    }}

                >
                    <BottomNavigation
                        showLabels
                        value={positionMenu}
                        onChange={(event, newValue) => {
                            setPositionMenu(newValue);
                        }}
                        style={{
                            background:'#BABDB6',
                            borderRadius: '10px',
                            
                        }}
                    >
                        <BottomNavigationAction label="Bloco de notas" icon={<TextSnippetIcon />} onClick={handleClickMenu} />
                        <BottomNavigationAction label="lista de tarefas" icon={<FormatListNumberedRtlIcon />} onClick={handleClickTodo} />
                    </BottomNavigation>
                </Box>
            </Grid>

            {/*item do menu */}
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
                    //referencia para o click
                    to='/todo'
                    ref={menuTodo}
                >
                    <i>Lista de tarefas</i>
                </Link>
            </Typography>
    </Grid>
    );
}

export default Footer;