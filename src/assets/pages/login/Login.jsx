//import React e hooks
import React from 'react';

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

//import css
import "./style.css";

//import firebase
import myApp from "../../core/firebaseConfig"
import "firebase/compat/firestore";
import "firebase/compat/auth";

//login components
const Login = () => {

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {

    }

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
                    height: '400px',
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
                    <h2>Dynamics Notepad</h2>
                </Grid>

                <Grid
                    container
                    item
                    justifyContent='center'
                    alignItems='center'
                    direction='column'
                >
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            label='email'
                            type='email'
                            margin='normal'
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
                    justifyContent='center'
                    alignItems='center'
                    direction='row'
                >
                    <Button 
                        color='primary' 
                        variant='contained'
                        style={{
                            width:'200px'
                        }}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;