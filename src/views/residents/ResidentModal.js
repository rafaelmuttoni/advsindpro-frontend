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
  MenuItem,
} from "@material-ui/core";

import { useAlert } from "src/context/AlertContext";
import { useData } from "src/context/DataContext";
import api from "src/services/api";

const ResidentModal = ({ open, close, editingResident }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { alert } = useAlert();
  const { data, updateData } = useData();

  const [form, setForm] = useState({});

  const closeAndClear = () => {
    setForm({});
    close();
  };

  useEffect(() => {
    !!editingResident && setForm(editingResident);
  }, [editingResident]);

  const handleChange = (target) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = !!editingResident
        ? await api.patch("/residents", form)
        : await api.post("/residents", form);
      !!editingResident
        ? updateData("update", "residents", data)
        : updateData("add", "residents", data);
      alert();
      closeAndClear();
    } catch (err) {
      alert("Ocorreu um erro na sua solicitação", "error");
    }
  };

  console.log(form);

  return (
    <Dialog open={open} onClose={closeAndClear} fullScreen={fullScreen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {!!editingResident ? "Editando" : "Novo"} Condômino
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            name="name"
            onChange={({ target }) => handleChange(target)}
            value={form.name || ""}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="CPF"
            margin="normal"
            name="document"
            onChange={({ target }) => handleChange(target)}
            value={form.document || ""}
            variant="outlined"
          />
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
            fullWidth
            label="Endereço"
            margin="normal"
            name="address"
            onChange={({ target }) => handleChange(target)}
            value={form.address || ""}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="E-mail"
            margin="normal"
            name="email"
            onChange={({ target }) => handleChange(target)}
            value={form.email || ""}
            variant="outlined"
            type="email"
          />
          <TextField
            fullWidth
            label="Telefone"
            margin="normal"
            name="phone"
            onChange={({ target }) => handleChange(target)}
            value={form.phone || ""}
            variant="outlined"
            type="phone"
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

export default ResidentModal;