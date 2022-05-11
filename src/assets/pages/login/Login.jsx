import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//imports css
import Style from '../Css/style.css'

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
    return(
        <>
            <Grid  id='formLogin' style={Style}>
            <Grid container
                    item 
                    marginTop='20vh'
                    alignItems='center'
                    direction='column'
                    justify='space-between'
            >
                <Grid id='logo' style={Style}>
                    <h2>Dynamics Notepad</h2>
                </Grid>
                <TextField 
                    sx={{ m: 1, width: '25ch' }}
                    id='text-form'
                    label='email'
                    type='email'
                    margin='normal'
                    inputProps={{startAdornment: (
                        <InputAdornment position="start">
                         <AccountCircle />
                        </InputAdornment>
                    ),
                    }} 
                />

            <FormControl id='text-form' sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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
                            label="Password"
                        />
                    </FormControl>
                    <Button color='primary' variant='contained' style={{paddingLeft:'80px', paddingRight:'80px'}}>
                        Login
                    </Button>
            </Grid>                
            </Grid>
        </>
    )
}

export default Login;