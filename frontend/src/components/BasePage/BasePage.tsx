import React from 'react';
import { Box, Card, CardContent } from '@mui/material';

interface BasePageProps {
  children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="auto"
    >
      <Card
        sx={{
          maxWidth: 650,
          p: 1,
          width: '100%',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasePage;
