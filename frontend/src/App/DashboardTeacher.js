import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from  "../Components/Header"
import Footer from  "../Components/Footer"
import api from "../services/api";
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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


const DashboardTeacher = props =>{    
  const [courses, setCourses] = useState([])

  const handleGetCourse = async () => {
    try {
      const response = await api.get("/me/teacher/courses/")
      setCourses(response.data)
      console.log(courses)
      
    }catch(err){
      props.history.push("/");
    }
  }
  
  useEffect(() => {
    handleGetCourse();
  },[])

    return(
        <ThemeProvider theme={theme}>
          <Header/>
          <CssBaseline />
          <Typography component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              padding="20px 0"
            >
              Aqui estão os cursos produzidos por você
          </Typography>
          <Box style={{padding: "50px"}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Titulo</StyledTableCell>
                    <StyledTableCell align="center">Preço</StyledTableCell>
                    <StyledTableCell align="center">Adicionar Aula</StyledTableCell>
                    <StyledTableCell align="center">Editar</StyledTableCell>
                    <StyledTableCell align="center">Excluir</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {courses.map((course) => (
                 
                    <StyledTableRow key={course.id}>
                      <StyledTableCell component="th" scope="row">
                        {course.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">{"R$ " + course.price}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Link href={"/new-lesson/" + course.id} variant="body2">
                          <AddBoxIcon/>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                       <Link href={"course/" + course.id + "/edit"} variant="body2">
                          <CreateIcon/>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link href={"course/" + course.id + "/remove"} variant="body2">
                          <DeleteForeverIcon/>
                        </Link>
                      </StyledTableCell>
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

export default DashboardTeacher;