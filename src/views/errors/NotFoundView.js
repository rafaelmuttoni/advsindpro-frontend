import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import Page from "src/components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
            gutterBottom
          >
            404: Página não encontrada
          </Typography>
          <Link to="/">
            <Button variant="contained" color="primary">
              Clique aqui para voltar para a Página Inicial
            </Button>
          </Link>

          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
