import React from 'react';  
import { Box, Typography } from '@mui/material';  

const NotFound = () => {  
  return (  
    <Box  
      display="flex"  
      flexDirection="column"  
      alignItems="center"  
      justifyContent="center"  
      minHeight="100vh"  
    >  
      <Typography variant="h4" gutterBottom>  
        404 - Page Not Found  
      </Typography>  
      <Typography variant="body1">  
        The page you are looking for does not exist.  
      </Typography>  
    </Box>  
  );  
};  

export default NotFound;  
