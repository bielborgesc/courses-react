import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Header from  "../Components/Header"
import Footer from  "../Components/Footer"

import api from "../services/api";

const theme = createTheme();

const Input = styled('input')({
    display: 'none',
  });

const CreateCourse = props =>{       

    const handleGetValidate = async () => {
      try {
        const response = await api.get("/me/teacher");
        
      }catch(err){
        props.history.push("/");
      }
    }
  
    useEffect(() => {
      handleGetValidate();
    },[])


    const sendCourse = async (title, description, image_url, price) => {
        const data = {
            title : title,
            description : description,
            image_url : image_url,
            price : price
        };

        const config = {
          headers : {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + localStorage.getItem('isAuthenticated')
          }
        }
        
        return await api.post("/me/teacher/courses/", data)
                    .then((res) => {
                      props.history.push(`/new-lesson/${res.data.id}` );
                     // console.log("RESPONSE RECEIVED: ", res);
                    })
                    .catch((err) => {
                      console.log("AXIOS ERROR: ", err);
                    })
     }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let name = event.target.querySelector("#name").value;
        let desc = event.target.querySelector("#desc").value;
        let price = event.target.querySelector("#price").value;
        let thumbnail = event.target.querySelector("#imageUrl").value;
        const result = await sendCourse(name, desc, thumbnail, price);
    };
    
    return(
        <ThemeProvider theme={theme}>
          <Header/>
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
              Registrar Curso
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                name="price"
                label="Price"
                id="price"
                type="decimal"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="video"
                label="Image Url"
                id="imageUrl"
                type="url"
            />
             <Stack direction="row" alignItems="center" spacing={2}>
            
            </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrar
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer/>
      </ThemeProvider>
      );
    
}

export default CreateCourse;