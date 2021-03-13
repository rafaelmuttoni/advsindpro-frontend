import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import theme from "src/theme";
import Routes from "src/routes/index";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <AlertProvider>
          <Routes />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
