//import React e hooks
import React, { useState, useEffect } from 'react';

//imports mui
import { Grid, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';

//import router
import { Link } from 'react-router-dom';

//import css
import "./style.css";

//import firebase
import myApp from "../../core/firebaseConfig";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//cadastro components
const Cadastro = () => {

    useEffect(() => {
        if (localStorage.getItem('currentUserDynamicsNotepad') !== '') {
            window.location.assign(window.location.origin);
        }
    }, []);

    //states
    const [values, setValues] = useState({
        amount: '',
        email: '',
        password: '',
        confirmPassword: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    const [dialogs, setDialogs] = useState({
        dialogLoginSuccessfully: false,
        dialogLoginError: false,
        dialogWithoutLoginAndPassword: false
    });


    //função responsável por preencher os states de email e senha
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //função responsável por alterar a visibilidade da senha
    const handleClickShowPassword = (type) => {
        if (type === 'password') {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        } else if (type === 'confirmPassword') {
            setValues({
                ...values,
                showConfirmPassword: !values.showConfirmPassword,
            });
        }
    };

    //função que não permite o recarregamento da pagina
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //função responsável por realizar o cadastro do usuario
    const handleCadastro = async () => {
        if (values.email !== ''
            && values.password !== ''
            && values.confirmPassword !== ''
        ) {
            if (values.password === values.confirmPassword) {
                myApp.auth().createUserWithEmailAndPassword(values.email, values.password)
                    .then((userCredential) => {
                        setDialogs({
                            ...dialogs,
                            dialogLoginSuccessfully: true
                        })
                        localStorage.setItem('currentUserDynamicsNotepad', userCredential.user.uid)
                        myApp.firestore().collection("users").add({
                            email: values.email,
                            uid: userCredential.user.uid,
                            isAdmin: false
                        })
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                            setDialogs({
                                ...dialogs,
                                dialogLoginError: true
                            });
                        }
                    });
            } else if (values.password !== values.confirmPassword) {
                setDialogs({
                    ...dialogs,
                    dialogLoginError: true
                });
            }

        } else {
            setDialogs({
                ...dialogs,
                dialogWithoutLoginAndPassword: true
            });
        }
    }

    //função responsável por fechar o dialodo
    const handleClose = (type) => {
        if (type === 'login') {
            window.location.assign(window.location.origin);
            setDialogs({
                ...dialogs,
                dialogLoginSuccessfully: false
            });
        } else if (type === 'loginError') {
            setDialogs({
                ...dialogs,
                dialogLoginError: false
            });
        } else if (type === 'without login and password') {
            setDialogs({
                ...dialogs,
                dialogWithoutLoginAndPassword: false
            });
        }
    };

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction='column'
            className='pageLogin'
            style={{
                height: '100vh'
            }}
        >
            <Grid
                container
                item
                justifyContent='center'
                alignItems='center'
                direction='column'
                style={{
                    backgroundColor: '#fff',
                    width: '350px',
                    borderRadius: '10px'
                }}
            >
                <Grid
                    className='logo'
                    item
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <img src="./logo-dynamics-notepad.svg" 
                         alt="logo" 
                         width={120}
                        />
                </Grid>

                <Grid
                    container
                    item
                    justifyContent='center'
                    alignItems='center'
                    direction='column'
                >
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            label='email'
                            type='email'
                            value={values.email}
                            onChange={handleChange('email')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            label="Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('password')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirme a Senha</InputLabel>
                        <OutlinedInput
                            label="confirm password"
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('confirmPassword')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>

                <Grid
                    container
                    item
                    justifyContent='space-around'
                    alignItems='center'
                    direction='column'
                >
                    <Button
                        color='primary'
                        variant='contained'
                        style={{
                            width: '200px'
                        }}
                        onClick={handleCadastro}
                    >
                        Fazer Cadastro
                    </Button>

                </Grid>
                <Grid
                    container
                    item
                    justifyContent='center'
                    alignItems='center'
                >
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: 'blue',
                            fontSize: '15px',
                            marginTop: '10px',
                            marginBottom:'10px',
                            fontFamily: 'Arial'
                        }}
                        to='/login'
                    >
                        Fazer login
                    </Link>
                </Grid>
            </Grid>
            <Dialog
                open={dialogs.dialogLoginSuccessfully}
                onClose={() => handleClose('login')}
            >
                <DialogTitle id="alert-dialog-title">
                    Aviso de sistema
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Usuario cadastrado com sucesso!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('login')}>avançar...</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={dialogs.dialogLoginError}
                onClose={() => handleClose('loginError')}
            >
                <DialogTitle id="alert-dialog-title">
                    Aviso de sistema
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Senhas não batem
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('loginError')}>Fechar</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={dialogs.dialogWithoutLoginAndPassword}
                onClose={() => handleClose('without login and password')}
            >
                <DialogTitle id="alert-dialog-title">
                    Aviso de sistema
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Preencha login e senha antes de tentar realizar cadastro
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('without login and password')}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Cadastro;