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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DashboardTeacher = props =>{    
    
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
                    <StyledTableCell align="right">Preço</StyledTableCell>
                    <StyledTableCell align="right">Adicionar Aula</StyledTableCell>
                    <StyledTableCell align="right">Editar</StyledTableCell>
                    <StyledTableCell align="right">Excluir</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                      <StyledTableCell align="right">{row.protein}</StyledTableCell>
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