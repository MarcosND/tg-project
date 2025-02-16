import React from 'react';
import { useGame } from './context/GameContext';

import { BasePage, Chat } from './components';
import { Stack } from '@mui/material';

const App = () => {
  const { unlockedNPCs } = useGame();

  return (
    <BasePage>
      <Stack
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap={2}
      >
        {unlockedNPCs.map((npc) => (
          <Chat key={npc} npcKey={npc} />
        ))}
      </Stack>
    </BasePage>
  );
};

export default App;
