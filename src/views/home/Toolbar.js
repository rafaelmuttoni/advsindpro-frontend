import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ filter, setFilter, openModal }) => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="flex-start">
        <Button color="primary" variant="contained" onClick={openModal}>
          Adicionar Condomínio
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Procurar condomínio"
                variant="outlined"
                value={filter}
                onChange={({ target }) => setFilter(target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Toolbar;
