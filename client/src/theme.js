import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Poppins "
    },
    palette: {
        primary: {
            main: "#140F26"
        }, 
        secondary: {
            main: "#746373"
        },
        background: {
            main: "#AEB5C2",
            secondary: "#F2F5F9"
        },
        
    },
    components: {
        MuiFormLabel: {
          styleOverrides: {
            asterisk: {color:"red"},
          },
        },
      },
})

export default theme