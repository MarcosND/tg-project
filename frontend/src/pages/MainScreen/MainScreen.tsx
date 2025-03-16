import React, { FC, useEffect, useState } from 'react';

import { GameBody, QuizDialog } from '../../components';
import { Box, Button } from '@mui/material';
import { ScreenState } from '../../App';
import { Answers, questions } from '../../utils/openai';
import { evaluateAnswers, startGame } from '../../api/api';
import { useGame } from '../../context/GameContext';

interface MainScreenProps {
  setScreen: (screen: ScreenState) => void;
  setScore: (score: number) => void;
}

const MainScreen: FC<MainScreenProps> = ({ setScreen, setScore }) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const { sessionId, setSessionId } = useGame();

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const data = await startGame();
        setSessionId(data.sessionId);
      } catch (error) {
        console.error('Error starting game:', error);
      }
    };

    if (!sessionId) {
      initializeGame();
    }
  }, []);

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    if (!sessionId) throw new Error('Session ID not found');

    const result = await evaluateAnswers(sessionId, answers);

    setSessionId(null);
    setOpen(false);
    setScreen(ScreenState.END);
    setScore(result);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      width="100%"
      maxWidth={700}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="auto"
    >
      <GameBody />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: '0 0 8px 8px',
          alignSelf: 'flex-end',
          bgcolor: '#247e22',
          height: 40,
          '&:hover': { bgcolor: '#1e5f17' },
        }}
      >
        Resolver Mistério
      </Button>
      <QuizDialog
        open={open}
        questions={questions}
        setOpen={setOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default MainScreen;
