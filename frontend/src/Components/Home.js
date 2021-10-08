import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Grid from '@mui/material/Grid';
export default function Home() {

  return (
    <Grid item xs={12}>
      <Header/>
        <Grid style={{margin: "20px 0"}}>
            <h1>Conteudos</h1>
        </Grid>
      <Footer/>
    </Grid>
  );
}