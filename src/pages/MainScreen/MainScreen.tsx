import React, { FC, useState } from 'react';

import { GameBody, QuizDialog } from '../../components';
import { Box, Button } from '@mui/material';
import { ScreenState } from '../../App';
import { evaluateAnswers } from '../../utils/openai';

export interface Answers {
  [key: string]: string;
}

interface MainScreenProps {
  setScreen: (screen: ScreenState) => void;
  setScore: (score: number) => void;
}

const correctAnswers: Answers = {
  'Quem assassinou Fabrício Lehmann?': 'Laura Hermann',
  'Qual foi a arma utilizada e onde foi encontrada?':
    'Revólver calibre .38, encontrada no carro de Paulo Yohen',
  'Qual foi a motivação para o crime?':
    'Laura desejava obter o controle da empresa e era contra a sua venda, ela também queria incriminar Paulo Yohen para que ele não conseguisse comprar a empresa e tivesse que se livrar das suas ações',
  'Qual o horário aproximado do assassinato?': 'Entre 22h e 23h',
  'Onde o assassinato aconteceu?':
    'Na área externa da piscina da mansão de Fabrício Lehmann',
  'Quem mais esteve diretamente envolvido no assassinato?':
    'Alfredo, o mordomo',
  'Quem foi incriminado?': 'Paulo Yohen, o sócio',
  'Informe sua melhor teoria sobre qual foi o plano para realizar o crime.':
    'Laura combinou com Alfredo para que ele colocasse um sonífero no suco de Paulo, enquanto ele dormia Alfredo pegou a chave do carro de Paulo e a arma que estava no porta-luvas, então ele colocou a arma no bolso de um casaco de Laura e o entregou para ela durante a conversa deles na área externa. Laura atirou em Fabrício à queima roupa através do bolso do casaco.',
};

const MainScreen: FC<MainScreenProps> = ({ setScreen, setScore }) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    console.log('Respostas enviadas: ', answers);
    const result = await evaluateAnswers(answers, correctAnswers);
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
          bgcolor: '#186815',
        }}
      >
        Resolver Mistério
      </Button>
      <QuizDialog
        open={open}
        setOpen={setOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default MainScreen;
