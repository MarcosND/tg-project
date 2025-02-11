import React from 'react';
import { motion } from 'framer-motion';
import { Box, Paper } from '@mui/material';

interface BasePageProps {
  children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#121212',
          color: '#ffffff',
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: '800px',
            p: 3,
            bgcolor: '#1e1e1e',
            borderRadius: 2,
          }}
        >
          {children}
        </Paper>
      </Box>
    </motion.div>
  );
};

export default BasePage;
