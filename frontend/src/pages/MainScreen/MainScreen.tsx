import React, { FC, useState } from 'react';

import { GameBody, QuizDialog } from '../../components';
import { Box, Button } from '@mui/material';
import { ScreenState } from '../../App';
import { Answers, evaluateAnswers, questionsData } from '../../utils/openai';

interface MainScreenProps {
  setScreen: (screen: ScreenState) => void;
  setScore: (score: number) => void;
}

const MainScreen: FC<MainScreenProps> = ({ setScreen, setScore }) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    console.log('Respostas enviadas: ', answers);
    const result = await evaluateAnswers(answers, questionsData);
    console.log('Seu score foi: ', result);
    setOpen(false);
    setScreen(ScreenState.END);
    setScore(Number(result));
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
        questions={Object.keys(questionsData)}
        setOpen={setOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default MainScreen;
