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

const CreateLesson = props =>{       

   const [course, setCourse] = useState([])
   const idCourse = props.match.params.idCourse;

   const handleGetValidate = async () => {
      try {
        const response = await api.get("/me/teacher");        
      }catch(err){
        props.history.push("/");
      }
    }
  

    const getCourse = async() =>{
      return await api.get(`/courses/${idCourse}`)
      .then(response => response)
      .catch(error => error)
    }

    const handleGetCourse = async() => {
        const result = await getCourse()
        console.log(result.data)
        setCourse(result.data)
    
    }

    useEffect(() => {
      handleGetValidate();
      handleGetCourse();
    },[])

  

    const sendLesson = async (title, step, description, url_video) => {
        const data = {
            title : title,
            step : step,
            description : description,
            url_video : url_video
        };

        return await api.post(`/me/teacher/courses/${idCourse}/lesson`, data)
                    .then((res) => {
                      props.history.push(`/new-lesson/${idCourse}`);
                      console.log("RESPONSE RECEIVED: ", res);
                    })
                    .catch((err) => {
                      console.log("AXIOS ERROR: ", err);
                    })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let title = event.target.querySelector("#title").value;
        let step = event.target.querySelector("#step").value;
        let description = event.target.querySelector("#desc").value;
        let url_video = event.target.querySelector("#url_video").value;
        const result = await sendLesson(title, step, description, url_video);
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
              {course.title}
            </Typography>
            
            <Typography component="h3" variant="h7">
              Nova aula
            </Typography>
            

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Titulo"
                name="title"
                autoFocus
              />

               <TextField
                margin="normal"
                required
                fullWidth
                name="step"
                label="Nº da Aula"
                id="step"
                type="number"
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
                name="url_video"
                label="URL do vídeo"
                id="url_video"
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
                Inserir aula no curso
              </Button>
            
            </Box>
          </Box>
        </Container>
        <Footer/>
      </ThemeProvider>
      );
    
}

export default CreateLesson;