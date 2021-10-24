import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import api from "../services/api";
import Header from  "../Components/Header"
import Footer from  "../Components/Footer"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const theme = createTheme();

export default function Courses(props) {
    const history = useHistory();
    const [courses, setCourses] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const [isTeacher, setIsTeacher] = useState(false)
    const [open, setOpen] = useState(false);
    const [dataDialog, setDataDialog] = useState({length: 0, lessons: []})
    const isAuth = localStorage.getItem("isAuthenticated") ? true : false

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const getCourses = async () => {
        return await axios.get("http://localhost:3000/courses",{

        })
        .then(response => response)
        .catch(error => error)
    }

    const getCourse = async (id) => {
      return await axios.get(`http://localhost:3000/courses/${id}`,{

      })
      .then(response => response)
      .catch(error => error)
    }

    const handleGetCourses = async () => {
        const result = await getCourses()
        setCourses(result.data)
    }

    const handleInputSearch = (value) => {
      setInputSearch(value)
      value === "" ? handleGetCourses() : searchCourses()
    }

    const searchCourses = () =>{
      const values = courses.filter((element) =>  element.title.includes(inputSearch))
      values.length !== 0 ?setCourses(values) : handleGetCourses()
    }

    const handleOpenCourse = async (event) => {
      const result = await getCourse(event.target.id)
      setDataDialog(result.data)
      handleClickOpen()
    }

    const handleShop = (id) =>{
      handleClose()
      isAuth ? handlePutCourse(id) :
      history.push({pathname: `/login`});    
    }

    const handlePutCourse = async (id) => {
      try {
        const response = await api.get(`me/student/courses/buy/${id}`)
        // if(response.status !== 200){
        //   alert("Você já possui esse curso")
        // }
      }catch(err){
        props.history.push("/dashboard-student");
      }
    }

    const verifyTeacher = async() =>{
        let response = await api.get("/me/teacher");
        if(response.status === 200){
          setIsTeacher(true)
        }
       
    }
    
    useEffect(() => {
      verifyTeacher();  
      handleGetCourses();
    },[])

  return (
      <ThemeProvider theme={theme}>
      <Header updateSearch={handleInputSearch}/>
        <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <img src={`${dataDialog.image_url}`} style={{height:"1%", width:"100%"}}/>
          <DialogTitle id="alert-dialog-title">
            {dataDialog.title}
          </DialogTitle>
          <DialogContentText id="alert-dialog-description" style={{padding: "20px"}}>
            {dataDialog.description}
            <div style={{margin:"10px 0"}}>R$ {dataDialog.price}</div>
            <div>
            {dataDialog.lessons.length > 0 ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Passo</StyledTableCell>
                      <StyledTableCell align="right">Título</StyledTableCell>
                      <StyledTableCell align="right">Descrição</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {dataDialog.lessons.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.step}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>: "Não há aulas ainda" }
            </div>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Voltar</Button>
            {!isTeacher ?
            <Button onClick={() => handleShop(dataDialog.id)}>
              Comprar
            </Button>
            : false
            }
          </DialogActions>
        </Dialog>
        </div>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Cursos
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Seja bem vindo ao nosso catalogo de cursos
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    
                    image={course.image_url}
                    alt="random"
                   style={{height: "170px"}}/>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.title}
                    </Typography>
                    <Typography>
                      {course.description}
                    </Typography>
                    <Typography>
                      {course.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleOpenCourse} id={course.id}>Visualizar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer size="10px"/>
    </ThemeProvider>
  );
}