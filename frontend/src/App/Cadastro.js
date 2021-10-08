import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const theme = createTheme();

const Input = styled('input')({
    display: 'none',
  });

const Cadastro = () =>{
    const [image, setImage] = useState(null);

    const handleImageChange = event =>{
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
              image: URL.createObjectURL(img)
            });
        }
    };

    const sendCourse = async (title, description, image_url, price) => {
        const data = {
            title : title,
            description : description,
            image_url : image_url,
            price : price
        };
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json;charset=utf-8'"
            }
        }
        return await axios.post("http://localhost:3000/me/teacher/courses/", data, config)
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let name = event.target.querySelector("#name").value;
        let desc = event.target.querySelector("#desc").value;
        let teacher = event.target.querySelector("#teacher").value;
        let price = event.target.querySelector("#price").value;
        let thumbnail = image;
        let url = event.target.querySelector("#video").value;
        const result = await sendCourse(name, desc, price, thumbnail);
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
            <TextField
                margin="normal"
                required
                fullWidth
                name="video"
                label="Youtube URL"
                id="video"
                type="url"
            />
             <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="thumbnail">
                <Input accept="image/*" id="thumbnail" multiple type="file" onChange={handleImageChange} />
                <Button variant="contained" component="span">
                Upload Image
                </Button>
            </label>
            </Stack>
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