import React, { Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";
import AppRouter from "./Router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import lazy from React
const { lazy } = React;

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

// Define a function that dynamically imports the ZokratesProvider component
const loadZokratesProvider = () => import("./contexts/ZokratesContext");

function App() {
  // Use React.lazy to create a Lazy component
  const ZokratesProviderLazy = lazy(loadZokratesProvider);

  return (
    <div style={{ margin: "0 auto" }}>
      <WagmiConfig config={wagmiConfig}>
        {/* Wrap Suspense around the dynamically loaded component */}
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider theme={theme}>
            {/* Render the Lazy component */}
            <ZokratesProviderLazy>
              <AppRouter />
            </ZokratesProviderLazy>
          </ThemeProvider>
          <ToastContainer />
        </Suspense>
      </WagmiConfig>
    </div>
  );
}

export default App;
