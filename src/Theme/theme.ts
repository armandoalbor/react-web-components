import { createTheme } from "@mui/material/styles";

// Create a custom theme with overrides
export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    // mode: "dark",
    primary: {
      main: "#6366f0", // Change primary color to tm
    },
    secondary: {
      main: "#07ab43", // Change secondary color to green
    },
    background: {
      default: "#f6f9fc",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif', // Change default font family
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    // Override default button styles
    MuiButton: {
      styleOverrides: {
        root: {
          // fontSize: "1rem",
          // borderRadius: "8px", // Change the button border radius
          // padding: "10px 20px",
        },
        containedPrimary: {
          // backgroundColor: "#3f51b5", // Custom color for primary buttons
          // color: "#fff",
          // "&:hover": {
          //   backgroundColor: "#283593", // Darker shade on hover
          // },
        },
      },
    },
  },
});
