import React, { useState } from 'react';
import { EndScreen, MainScreen, WelcomeScreen } from './pages';
import { Box } from '@mui/material';

export enum ScreenState {
  WELCOME = 'WELCOME',
  GAME = 'GAME',
  END = 'END',
}

const App = () => {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.WELCOME);
  const [score, setScore] = useState<number>(0);

  const renderScreen = () => {
    switch (screen) {
      case ScreenState.WELCOME:
        return <WelcomeScreen setScreen={setScreen} />;
      case ScreenState.GAME:
        return <MainScreen setScreen={setScreen} setScore={setScore} />;
      case ScreenState.END:
        return <EndScreen setScreen={setScreen} score={score} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.4s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>{renderScreen()}</Box>
    </Box>
  );
};

export default App;
