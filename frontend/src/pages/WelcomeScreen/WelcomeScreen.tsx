import React, { FC, useEffect } from 'react';

import { Button, Typography } from '@mui/material';
import { ScreenState } from '../../App';
import { BasePage } from '../../components';
import { useGame } from '../../context/GameContext';

interface WelcomeScreenProps {
  setScreen: (screen: ScreenState) => void;
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({ setScreen }) => {
  const { setSessionId } = useGame();
  useEffect(() => {
    setSessionId(null);
  }, []);

  return (
    <BasePage>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 500, fontFamily: 'Cinzel, sans' }}
      >
        Assassinato na Mansão Lehmann
      </Typography>
      <Typography textAlign="justify" mb={3}>
        O corpo do empresário <b>Fabrício Lehmann</b> foi encontrado boiando na
        piscina de sua mansão. A polícia foi chamada algumas horas depois, mas o
        culpado ainda não foi identificado. <b>Três suspeitos</b> foram levados
        à delegacia, e <b>você</b>, como detetive principal do caso, precisa
        interrogar cada um deles para descobrir a <b>verdade</b>.
      </Typography>
      <Typography textAlign="justify">
        O policial <b>Ricardo</b>, responsável pela investigação inicial,
        coletou provas e reuniu os suspeitos, mas agora cabe a você resolver o
        caso. Converse com ele para obter mais informações. <b>Boa sorte!</b>
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setScreen(ScreenState.GAME)}
        style={{ marginTop: 20 }}
      >
        Começar Jogo
      </Button>
    </BasePage>
  );
};

export default WelcomeScreen;
