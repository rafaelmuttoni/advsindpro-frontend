import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface AlertProviderProps {
  children: ReactNode;
}

type Severity = "success" | "info" | "warning" | "error";

type AlertFunction = (msg: string, type: Severity) => void;

interface AlertContextData {
  alert: AlertFunction;
}

interface MessageProps {
  open: boolean;
  text: string;
  severity: Severity;
  time?: number;
  action?: string;
}

const AlertContext = createContext({} as AlertContextData);

export const useAlert = () => {
  const context = useContext(AlertContext);

  return context;
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [message, setMessage] = useState({
    open: false,
    text: "Sucesso!",
    severity: "success",
  } as MessageProps);

  const alert: AlertFunction = (msg, type) => {
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
