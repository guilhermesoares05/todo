import React, { useState } from 'react';

//imports router
import { Link } from "react-router-dom";

//import mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import myApp from "../core/firebaseConfig";
import LogoutIcon from '@mui/icons-material/Logout';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';



export default function BasicMenu() {

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //funão responsável por realizar o logout do usuario
    const handleLogout = async () => {
    myApp.auth().signOut().then(() => {
        localStorage.removeItem('currentUserDynamicsNotepad');
        window.location.assign(window.location.origin + '/login');
    }).catch((error) => {
        console.log(error);
    });
    }

  return (
    <Grid>
      {/*icone do menu */}  
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
            color:"white"
        }}
      >
          <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/*itens do menu*/}
        <Grid
            style={{
                justifyContent:"center",
                alignItems:"center",
            }}
        >
            <MenuItem>
                <Link to="/"
                      ref={menuHome}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <span
                        style={{
                            display:"flex",
                            color:"black",
                            padding:"10px",
                            alignItems:"center",
                        }}
                    >
                        Bloco de notas
                        <TextSnippetIcon style={{paddingLeft:"10px"}} />
                    </span>   
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Link to="/todo"
                  ref={menuTodo}
                    style={{
                        textDecoration: 'none',
                    }}
                >
                    <span
                        style={{
                            display:"flex",
                            color:"black",
                            padding:"10px",
                            alignItems:"center",
                        }}
                    >
                        Lista de tarefas
                        <FormatListBulletedIcon style={{paddingLeft:"10px"}}  />
                    </span>   
                </Link>
            </MenuItem>
            <MenuItem 
                onClick={handleLogout}
            >
                <span
                    style={{
                        display:"flex",
                        color:"black",
                        padding:"10px",
                        alignItems:"center",
                    }}
                >
                    Sair
                </span>
                <LogoutIcon style={{paddingLeft:"10px"}} />
            </MenuItem>  
        </Grid>  

      </Menu>
    </Grid>
  );
}
