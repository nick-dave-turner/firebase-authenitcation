import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body, #root": {
          height: "100%",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#f7f9fc",
    },
  },
});
