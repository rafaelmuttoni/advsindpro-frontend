import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import theme from "src/theme";
import Routes from "src/routes/index";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <AlertProvider>
          <DataProvider>
            <Routes />
          </DataProvider>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
