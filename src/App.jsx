import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";
import AppRouter from "./Router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      s: 361,
      xsl: 500,
      sm: 600,
      xsm: 768,
      md: 900,
      mdx: 1180,
      lg: 1200,
      lgx: 1300,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <div style={{ margin: "0 auto" }}>
      <WagmiConfig config={wagmiConfig}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
        <ToastContainer />
      </WagmiConfig>
    </div>
  );
}

export default App;
