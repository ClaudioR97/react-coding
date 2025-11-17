import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

function AppThemeProvider({ children }) {
  const mode = 'light';
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: mode,
        primary: {
          main: '#0069fcff',
        },
        background: {
          default: '#FCFBFA',
          opposite: '#000000',
          paper: '#FCFCFC',
        },
        text: {
          primary: '#000000',
          secondary: '#999999',
          disabled: '#C3C1BD',
        },
      },

      typography: {
        fontFamily: 'Dosis, sans-serif',

        h1: {
          fontSize: '26px',
          fontWeight: '600',
        },
        h2: {
          fontSize: '22px',
          fontWeight: '600',
        },
        h3: {
          fontSize: '20px',
          fontWeight: '600',
        },
        h5: {
          fontSize: '16px',
          fontWeight: '500',
        },
      },
    }),
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
