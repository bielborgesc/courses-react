import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Cadastro = () =>{
    const handleSubmit = (event) => {
        event.preventDefault();
        let name = event.target.querySelector("#name").value;
        let desc = event.target.querySelector("#desc").value;
        let teacher = event.target.querySelector("#teacher").value;
        let price = event.target.querySelector("#price").value;
        
      };
      return(
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
            <Typography component="h1" variant="h5">
              Register Course
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="desc"
              />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="teacher"
                    label="Teacher"
                    id="teacher"
                />
            <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                id="price"
                type="number"
            />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      );
    
}

export default Cadastro;