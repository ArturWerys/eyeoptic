import { createTheme } from "@mui/material/styles";
import colors from "@/data/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: colors.accent },
    background: { default: colors.pageBg, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.textSoft },
  },
  typography: {
    fontFamily: [
      '"Plus Jakarta Sans"',
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  shape: { borderRadius: 8 },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: "1280px !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: "none",
          fontWeight: 800,
          paddingInline: 18,
          paddingBlock: 10,
        },
      },
    },
  },
});

export default theme;
