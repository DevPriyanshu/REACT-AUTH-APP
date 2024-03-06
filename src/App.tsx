import "./App.css";
import RoutingConfig from "./routes-config/RoutingConfiguration";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Suspense } from "react";
import { SnackbarProvider } from "./context/snackbar-context";

import ThemePrimaryColor from "./component/ThemePrimaryColor";
import ThemeConfig from "./theme";

function App() {
  return (
    <SnackbarProvider>
      <CssBaseline />
      <ThemeConfig>
        <ThemePrimaryColor>
          <StyledEngineProvider injectFirst>
            <Suspense>
              <RoutingConfig />
            </Suspense>
          </StyledEngineProvider>
        </ThemePrimaryColor>
      </ThemeConfig>
    </SnackbarProvider>
  );
}

export default App;
