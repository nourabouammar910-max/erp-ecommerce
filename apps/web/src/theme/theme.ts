import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#7c3aed",
    },
    background: {
      default: "#f5f7fb",
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;