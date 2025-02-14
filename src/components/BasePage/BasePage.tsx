import React from 'react';
import { Box } from '@mui/material';

interface BasePageProps {
  children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#121212"
      height="100vh"
    >
      <Box width="100%" margin="auto">
        {children}
      </Box>
    </Box>
  );
};

export default BasePage;
