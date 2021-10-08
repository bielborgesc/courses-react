import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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

const CreateLogin = props => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [teacher, setTeacher] = useState("")

  const handleSubmit = async (event) => {
    if(!email || !name || !password || !teacher) {
      alert("Preencha todos os campos")
      return;
    }

    const result = await verifyLoginInApi(email, password)

    if(result.status === 200){
      alert("Você já possui uma conta!")
      localStorage.setItem("isAuthenticated",result.data.token)
      props.history.push("/")
      return;
    }
    const create = await registerUserInApi(name,email,password, teacher)
    if(create.status === 200){
      alert("Conta criada com sucesso")
      props.history.push("/login")
    }else{
      alert("Dados incorretos, por favor revise-os")
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

  const registerUserInApi = async(name,email,password, teacher) =>{
    return await axios.post("http://localhost:3000/auth/register",{
      name: name,
      email: email,
      password: password,
      is_teacher: teacher
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Nome"
              type="name"
              id="name"
              autoComplete="text"
              color="secondary"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
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
              color="secondary"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl component="fieldset" required>
              <FormLabel component="legend" color="secondary">Você é um professor?</FormLabel>
              <RadioGroup row aria-label="professor" name="row-radio-buttons-group" onChange={(e) => setTeacher(e.target.value)}>
                <FormControlLabel value={false} control={<Radio color="secondary" />} label="Não"/>
                <FormControlLabel value={true} control={<Radio color="secondary" />} label="Sim"/>
              </RadioGroup>
            </FormControl>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Registrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2" color="secondary">
                  {"Já possui conta?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default CreateLogin