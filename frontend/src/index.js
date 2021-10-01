import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes/routes";
import './index.css';
import Header from './Components/Header';
import Footer from './Components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Routes/>
    <Footer sx={{ mt: 8, mb: 4 }} />
  </React.StrictMode>,
  document.getElementById('root')
);