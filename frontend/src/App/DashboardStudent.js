import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from  "../Components/Header"
import Footer from  "../Components/Footer"
import api from "../services/api";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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


const DashboardStudent = props =>{    
  const [courses, setCourses] = useState([])
  const [open, setOpen] = useState(false);
    const [dataDialog, setDataDialog] = useState({length: 0, lessons: []})

  const handleGetCourse = async () => {
    try {
      const response = await api.get("/me/student/courses/")
      if(response.data.length >= 0) setCourses(response.data)
      else setCourses([])      
    }catch(err){
      props.history.push("/");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWatchVideo = async (id) => {
    const result = await api.get(`/me/student/courses/${id}`)
    setDataDialog(result.data)
    handleClickOpen()
  }

  useEffect(() => {
    handleGetCourse();
  },[])

    return(
        <ThemeProvider theme={theme}>
          <Header/>
          <CssBaseline />
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <img src={`${dataDialog.image_url}`} style={{height:"250px", width:"100%"}}/>
          <DialogTitle id="alert-dialog-title">
            {dataDialog.title}
          </DialogTitle>
          <DialogContentText id="alert-dialog-description" style={{padding: "20px"}}>
            {dataDialog.description}
            <div style={{marginTop: "10px"}}>
            {dataDialog.lessons.length > 0 ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Passo</StyledTableCell>
                      <StyledTableCell align="right">Título</StyledTableCell>
                      <StyledTableCell align="right">Play</StyledTableCell>
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
                    <TableCell align="right">
                        <Link to="route" target="_blank"href={row.url_video} variant="body2">
                            <PlayArrowIcon/>
                        </Link>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>: "Não há aulas ainda" }
            </div>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Voltar</Button>
          </DialogActions>
        </Dialog>
          <Typography component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              padding="20px 0"
            >
              Aqui estão os seus cursos
          </Typography>
          <Box style={{padding: "50px"}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Titulo</StyledTableCell>
                    <StyledTableCell align="center">Ação</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {courses.map((course) => (
                 
                    <StyledTableRow key={course.id}>

                      <StyledTableCell component="th" scope="row">{course.title}</StyledTableCell>
                      <StyledTableCell align="center"><AddBoxIcon style={{cursor: "pointer"}} onClick={() => handleWatchVideo(course.id)}/></StyledTableCell>

                    </StyledTableRow>
                  ))}                  
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        <Footer/>
      </ThemeProvider>
      );
    
}

export default DashboardStudent;