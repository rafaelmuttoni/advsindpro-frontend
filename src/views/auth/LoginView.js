import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import Page from 'src/components/Page'
import { useAuth } from 'src/context/AuthContext'
import { useAlert } from 'src/context/AlertContext'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}))

const LoginView = () => {
  const classes = useStyles()
  const { state } = useLocation()
  const { loading, signed, login } = useAuth()
  const alert = useAlert()

  if (!loading && signed) {
    return <Redirect to={state ? state.from : '/'} />
  }

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Deve ser um email válido')
                .max(255)
                .required('Email é obrigatório'),
              password: Yup.string().max(255).required('Senha é obrigatória'),
            })}
            onSubmit={async (user) => {
              const err = await login(user.email, user.password)
              if (err) {
                alert('error', 'Ocorreu um erro na sua solicitação.')
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Entrar
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  )
}

export default LoginView
