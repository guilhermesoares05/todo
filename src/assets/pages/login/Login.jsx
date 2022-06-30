//import React e hooks
import React, { useState, useEffect } from 'react';

//imports mui
import { Grid, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
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
import { Link } from 'react-router-dom';
import theme from '../../core/theme';

//import css
import "./style.css";

//import firebase
import myApp from "../../core/firebaseConfig";
import "firebase/compat/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//login components
const Login = () => {
    const [userId, setUserId] = useState(localStorage.getItem('currentUserDynamicsNotepad'));

    useEffect(() => {
        if (userId !== null) {
            window.location.assign(window.location.origin);
        }
    }, []);

    //states
    const [values, setValues] = useState({
        amount: '',
        email: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
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
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    //função que não permite o recarregamento da pagina
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //funão responsável por realizar o login do usuario
    const handleLogin = async () => {
        if (values.email !== '' && values.password !== '') {
            myApp.auth().signInWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                    setDialogs({
                        ...dialogs,
                        dialogLoginSuccessfully: true
                    });
                    localStorage.setItem('currentUserDynamicsNotepad', userCredential.user.uid);
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
        } else {
            setDialogs({
                ...dialogs,
                dialogWithoutLoginAndPassword: true
            });
        }
    }

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log('Credencial', credential)
                console.log('token', token)
                console.log('user', user)
                setDialogs({
                    ...dialogs,
                    dialogLoginSuccessfully: true
                });
                localStorage.setItem('currentUserDynamicsNotepad', user.uid);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
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
                    paddingBottom: '15px',
                    borderRadius: '10px'
                }}
            >
                <Grid
                    className='logo'
                    item
                    style={{
                        marginBottom: '15px'
                    }}
                >
                    <img src="./logo-dynamics-notepad.svg" alt="logo" width={120} />
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
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    spacing={2}
                >
                    <Grid item>
                        <Button
                            color='primary'
                            variant='contained'
                            style={{
                                width: '200px'
                            }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Grid>

                    <Grid item >
                        <Button
                            variant='contained'
                            style={{
                                width: '200px',
                                justifyContent: 'space-between'

                            }}
                            onClick={handleLoginWithGoogle}
                        >
                            <GoogleIcon />
                            <small style={{ fontFamily: 'arial' }}>Faça login com o google</small>
                        </Button>
                    </Grid>
                </Grid>
                <Link
                    style={{ textDecoration: 'none', color: 'blue', fontSize: '15px', marginTop: '20px', fontFamily: 'Arial' }}
                    to='/cadastro'>Ainda não tem Cadastro? / Cadastre-se</Link>
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
                        Login realizado com sucesso! <br />
                        Clique para avançar
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
                        email ou senha incorretos
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
                        Preencha login e senha antes de tentar realizar login
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('without login and password')}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Login;