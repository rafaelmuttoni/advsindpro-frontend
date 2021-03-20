import React, { createContext, useContext, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);

  return context;
};

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState({
    open: false,
    text: "Sucesso!",
    severity: "success",
  });

  const alert = (msg, type) => {
    setMessage({
      open: true,
      text: msg ? msg : "Requisição realizada com sucesso",
      severity: type ? type : "success",
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
      }}
    >
      {children}
      <Snackbar
        open={message.open}
        onClose={() => setMessage({ ...message, open: false })}
        autoHideDuration={message.time || 3000}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setMessage({ ...message, open: false })}
          severity={message.severity}
          action={message.action || null}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
