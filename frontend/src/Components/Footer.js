import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer = (props) => {
    return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: props.size,
      }}>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {`Copyright © Courses ${new Date().getFullYear()}.`}
          </Typography>
        </Container>
      </Box>
    </Box>
    );
}

export default Footer;