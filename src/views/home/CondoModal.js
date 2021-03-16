import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  useMediaQuery,
  useTheme,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

import { useAlert } from "src/context/AlertContext";

const CondoModal = ({ open, close }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    initial_date: moment().format(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // 1. FOrmat Date
    // 2. ADd water, energy and gas to extra
  };

  return (
    <Dialog open={open} onClose={close} fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Novo Condomínio</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Razão Social"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={form.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="CNPJ"
            margin="normal"
            name="code"
            onChange={handleChange}
            value={form.code}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Endereço"
            margin="normal"
            name="address"
            onChange={handleChange}
            value={form.address}
            variant="outlined"
          />
          <DatePicker
            fullWidth
            label="Data de Início"
            format="LL"
            margin="normal"
            name="initial_date"
            onChange={(date) => setForm({ ...form, initial_date: date })}
            value={form.initial_date}
            inputVariant="outlined"
          />
          <TextField
            fullWidth
            label="Número da UC (CEEE/RGE)"
            margin="normal"
            name="energy"
            onChange={handleChange}
            value={form.energy}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ramal de água (DMAE/Corsan)"
            margin="normal"
            name="water"
            onChange={handleChange}
            value={form.water}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Código do cliente (Cia de gás)"
            margin="normal"
            name="gas"
            onChange={handleChange}
            value={form.gas}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CondoModal;
