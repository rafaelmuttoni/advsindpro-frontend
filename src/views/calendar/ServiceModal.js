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
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import moment from "moment";
import { DateTimePicker } from "@material-ui/pickers";

import { useAlert } from "src/context/AlertContext";
import { useData } from "src/context/DataContext";

const ServiceModal = ({ creatingEvent, close, editingService }) => {
  const open = creatingEvent === "service";

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { alert } = useAlert();
  const { data, submit } = useData();

  const [form, setForm] = useState({ date: moment().format() });
  const [date, setDate] = useState(moment().format());

  const closeAndClear = () => {
    setForm({ date: moment().format() });
    close();
  };

  useEffect(() => {
    !!editingService && setForm(editingService);
  }, [editingService]);

  const handleChange = (target) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = await submit("services", form, Boolean(editingService));

    if (err) {
      alert("Ocorreu um erro na sua solicitação", "error");
    } else {
      alert();
      closeAndClear();
    }
  };

  return (
    <Dialog open={open} onClose={closeAndClear} fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {!!editingService ? "Editando" : "Novo"} Serviço
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            variant="outlined"
            margin="normal"
            name="condo_id"
            label="Condomínio"
            type="text"
            fullWidth
            value={form.condo_id || ""}
            onChange={({ target }) => handleChange(target)}
            required
          >
            {data &&
              data.condos.map((condo) => (
                <MenuItem key={condo.id} value={condo.id}>
                  {condo.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            select
            variant="outlined"
            margin="normal"
            name="provider_id"
            label="Provedor"
            type="text"
            fullWidth
            value={form.provider_id || ""}
            onChange={({ target }) => handleChange(target)}
            required
          >
            {data &&
              data.providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            fullWidth
            label="Nome do serviço"
            margin="normal"
            name="name"
            onChange={({ target }) => handleChange(target)}
            type="text"
            value={form.name || ""}
            variant="outlined"
            required
          />

          <DateTimePicker
            fullWidth
            ampm={false}
            label="Data"
            format="LLL"
            margin="normal"
            name="date"
            onChange={(dateTime) => {
              setDate(dateTime);
              let date = {};
              date.value = dateTime.format();
              date.name = "date";
              handleChange(date);
            }}
            value={date}
            inputVariant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Preço"
            margin="normal"
            name="price"
            type="number"
            onChange={({ target }) => handleChange(target)}
            value={form.price || ""}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            required
          />

          <TextField
            fullWidth
            label="Descrição"
            margin="normal"
            name="description"
            onChange={({ target }) => handleChange(target)}
            value={form.description || ""}
            variant="outlined"
            multiline
            rows={4}
          />

          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel id="priority-label">Prioridade</InputLabel>
            <Select
              labelId="priority-label"
              name="priority"
              onChange={({ target }) => handleChange(target)}
              value={form.priority || ""}
              label="Prioridade"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
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

export default ServiceModal;
