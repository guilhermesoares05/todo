import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#ffffff',
            contrastText: '#ffffff',
        },
    },
    spacing: [0, 4, 8, 16, 32, 64],
});

export default theme;