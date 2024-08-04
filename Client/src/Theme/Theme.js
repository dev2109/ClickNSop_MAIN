import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFB26B",
      light: "#FFD56F",
      action: "#939B62",
      dark: "#FF7B54",
    },
  },
  typography: {
    color: "#FF7B54",
  },
});
// theme.typography = {
//   fontSize: "1.2rem",
//   "@media (min-width:600px)": {
//     fontSize: "1.5rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "2.4rem",
//   },
//   color:"yellow"
// };

export default theme;
