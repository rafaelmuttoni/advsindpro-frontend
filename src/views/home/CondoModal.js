import React, { useEffect, useState } from "react";
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
import { useData } from "src/context/DataContext";
import api from "src/services/api";

const CondoModal = ({ open, close, editingCondo }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { alert } = useAlert();
  const { updateData } = useData();

  const [form, setForm] = useState({ initial_date: moment().format() });
  const [date, setDate] = useState(moment().format());

  const closeAndClear = () => {
    setForm({ initial_date: moment().format() });
    close();
  };

  useEffect(() => {
    !!editingCondo && setForm(editingCondo);
  }, [editingCondo]);

  const handleChange = (target) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = !!editingCondo
        ? await api.patch("/condos", form)
        : await api.post("/condos", form);
      !!editingCondo
        ? updateData("update", "condos", data)
        : updateData("add", "condos", data);
      alert();
      closeAndClear();
    } catch (err) {
      alert("Ocorreu um erro na sua solicitação", "error");
    }
  };

  return (
    <Dialog open={open} onClose={closeAndClear} fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {!!editingCondo ? "Editando" : "Novo"} Condomínio
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Razão Social"
            margin="normal"
            name="name"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.name || ""}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="CNPJ"
            margin="normal"
            name="code"
            onChange={({ target }) => handleChange(target)}
            value={form.code || ""}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Endereço"
            margin="normal"
            name="address"
            onChange={({ target }) => handleChange(target)}
            value={form.address || ""}
            variant="outlined"
            required
          />
          <DatePicker
            fullWidth
            label="Data de Início"
            format="LL"
            margin="normal"
            name="initial_date"
            onChange={(dateTime) => {
              setDate(dateTime);
              let date = {};
              date.value = dateTime.format();
              date.name = "initial_date";
              handleChange(date);
            }}
            value={date}
            inputVariant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Número da UC (CEEE/RGE)"
            margin="normal"
            name="energy"
            onChange={({ target }) => handleChange(target)}
            value={form.energy || ""}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ramal de água (DMAE/Corsan)"
            margin="normal"
            name="water"
            onChange={({ target }) => handleChange(target)}
            value={form.water || ""}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Código do cliente (Cia de gás)"
            margin="normal"
            name="gas"
            onChange={({ target }) => handleChange(target)}
            value={form.gas || ""}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAndClear} color="primary">
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
