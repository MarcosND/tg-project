import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          '& button': {
            color: '#FFFFFF',
            minHeight: 25,
            height: 25,
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#dfdadaa6',
            alignSelf: 'flex-end',
            '&:hover': {
              backgroundColor: '#5d79b6',
            },
          },
          '& button.Mui-selected': {
            color: '#FFFFFF',
            backgroundColor: '#255dd6',
            height: 48,
            minHeight: 48,
            '&:hover': {
              backgroundColor: '#255dd6',
            },
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',

        },
      },
    },
  },
  palette: {
    primary: {
      main: '#255dd6',
    },
    secondary: {
      main: '#292929',
    },
  }
});

export default theme;
