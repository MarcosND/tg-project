import React, { FC } from 'react';

import { BasePage } from '../../components';
import { Typography, Button } from '@mui/material';
import { ScreenState } from '../../App';

interface WelcomeScreenProps {
  score: number;
  setScreen: (screen: ScreenState) => void;
}

const getEndingMessage = (score: number) => {
  if (score > 65) {
    `Você conseguiu ter um ótimo desempenho e entendimento do caso.
      Demonstrou ter ótimas habilidades de investigação e dedução.
      Parabéns!`;
  }
  if (score < 65 && score > 30) {
    return 'Você conseguiu desvendar alguns detalhes importantes, mas ainda há espaço para melhorias. Se desejar pode tentar novamente!';
  }

  return 'Você não conseguiu desvendar muitos detalhes do caso. Não desanime, você pode tentar novamente se desejar!';
};

const MainScreen: FC<WelcomeScreenProps> = ({ setScreen, score }) => {
  return (
    <BasePage>
      <Typography variant="h4" gutterBottom>
        Parabéns por ter concluído o jogo!
      </Typography>
      <Typography textAlign="justify" mb={3}>
        {getEndingMessage(score)}
      </Typography>
      <Typography>
        Muito obrigado por jogar! Se quiser, você pode tentar jogar novamente
        clicando no botão abaixo.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setScreen(ScreenState.GAME)}
        style={{ marginTop: 20 }}
      >
        Tentar Novamente
      </Button>
    </BasePage>
  );
};

export default MainScreen;
