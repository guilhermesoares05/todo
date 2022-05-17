
//import router
import { Routes, Route, Link } from "react-router-dom";

//imports mui
import Grid from '@mui/material/Grid';


const Header = () => {
    return(
        <Grid style={{
            display: "flex",
            padding: "10px",
            justifyContent: "center",
        }}>
            <img src="/logo-dynamics-notepad.svg" alt="logo dynamics" width={100} />
            
        </Grid>
    );
}

export default Header;