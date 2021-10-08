import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {`Copyright © Courses ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const theme = createTheme();

const Login = props => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    if(!email || !password ) {
      alert("Preencha todos os campos")
      return;
    }
    const result = await verifyLoginInApi(email, password)
    if(result.status === 200){
      localStorage.setItem("isAuthenticated",result.data.token)
      props.history.push("/")
    }else{
      alert("Dados incorretos");
    }
  };

  const verifyLoginInApi = async (email, password) => {
    return await axios.post("http://localhost:3000/auth/login",{
      email: email,
      password: password
    })
    .then(response => response)
    .catch(error => error)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/create-login" variant="body2">
                  {"Não tem uma conta?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login