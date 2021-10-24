import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../services/api";
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EditLessonECourse = props =>{       

  const [course, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDialog, setDataDialog] = useState(
    {
      id: "",
      title: "",
      description: "",
      step: "",
      url_video: "",
  })
  
  const [objCourse, setObjCourse] = useState({
    id: "",
    title: "",
    desc: "",
    image_url: "",
    price: ""
  })

  const getCourse = async() =>{
    return await api.get(`/me/teacher/courses/${props.id}`)
    .then(response => response)
    .catch(error => error)
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenCourse = (element) => {
    setDataDialog(element)
    handleClickOpen()
  }

  const handleGetCourse = async() => {
      const result = await getCourse()
      result.data.lessons.length >= 0 ? setLessons(result.data.lessons) : setLessons([]);
      setCourse(result.data)
      const obj ={
        id : result.data.id,
        title: result.data.title,
        desc: result.data.description,
        image_url: result.data.image_url,
        price: result.data.price
      }
      setObjCourse(obj)
  }

  useEffect(() => {
    handleGetCourse();
  },[])

  const handleUpdateInputs = (event) => {
    const op = event.target.id;
    const obj ={
      title: objCourse.title,
      desc: objCourse.desc,
      image_url: objCourse.image_url,
      price: objCourse.price
    }
    switch(op){
      case "title":
        obj.title = event.target.value
        break;
      case "desc":
        obj.desc = event.target.value
        break;
      case "url_image":
        obj.image_url = event.target.value
        break;
      case "price":
        obj.price = event.target.value
        break;
    }
    setObjCourse(obj)
 
  }

  const handlePutClass = async () => {
   
    try {
      //Modificar
      const response = await api.put(`/me/teacher/courses/${course.id}/lesson/${dataDialog.id}/`,dataDialog).then(()=>{
        handleGetCourse();
        handleClose();
      })
     
    }catch(err){
      alert("Erro ao atualizar aula")
    }  
  }

  const handleUpdateInputsClass = (event) => {
    const op = event.target.id;
    const obj ={
      title: dataDialog.title,
      description: dataDialog.description,
      step: dataDialog.step,
      url_video: dataDialog.url_video,
      id: dataDialog.id
    }
    switch(op){
      case "title":
        obj.title = event.target.value
        break;
      case "desc":
        obj.description = event.target.value
        break;
      case "url_video":
        obj.url_video = event.target.value
        break;
    }
    setDataDialog(obj)
  }

  const handleDeleteClass = async(event) => {
    const lessonId = event.id
    try {
      //Modificar
      const response = await api.delete(`/me/teacher/courses/${course.id}/lesson/${lessonId}/`)
      handleGetCourse();
    }catch(err){
      console.log(err)
    }
  }
    
  return(
      <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dataDialog.title}
        </DialogTitle>
        <DialogContentText id="alert-dialog-description" style={{padding: "20px"}}>
          <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => handleUpdateInputsClass(e)}
              id="title"
              label="Titulo"
              name="title"
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={dataDialog.title}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="Descrição"
              label="Description"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleUpdateInputsClass(e)}
              id="desc"
              value={dataDialog.description}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="Url do vídeo"
              label="url_video"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleUpdateInputsClass(e)}
              id="url_video"
              value={dataDialog.url_video}
            />
            
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose}>Voltar</Button>
          <Button onClick={() => handlePutClass()}>
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>
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

          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => handleUpdateInputs(e)}
              id="title"
              label="Titulo"
              name="title"
              autoFocus
              InputLabelProps={{ shrink: true }}
              value={objCourse.title}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleUpdateInputs(e)}
              id="desc"
              value={objCourse.desc}
            />
          
            <TextField
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="url_image"
              label="URL da imagem"
              id="url_image"
              onChange={(e) => handleUpdateInputs(e)}
              type="url"
              value={objCourse.image_url}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="price"
              label="Preço"
              onChange={(e) => handleUpdateInputs(e)}
              id="price"
              type="number"
              value={objCourse.price}
            />

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Titulo</StyledTableCell>
                      <StyledTableCell align="center">Description</StyledTableCell>
                      <StyledTableCell align="center">Editar</StyledTableCell>
                      <StyledTableCell align="center">Excluir</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {lessons.map((e) => (
                      <StyledTableRow key={e.id}>
                        <StyledTableCell component="th" scope="row">
                          {e.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{e.description}</StyledTableCell>
                        <StyledTableCell align="center"> 
                            <CreateIcon style={{cursor: "pointer"}} onClick={() => handleOpenCourse(e)}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <DeleteForeverIcon style={{cursor: "pointer"}} onClick={() => handleDeleteClass(e)}/>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Atualizar Dados
            </Button>

            
            <Button
              href={"/new-lesson/" + objCourse.id}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Adicionar nova aula
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Voltar
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
  
}

export default EditLessonECourse;