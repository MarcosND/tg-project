import React from 'react';
import { useGame } from './context/GameContext';

import { BasePage, Chat, EndButton } from './components';
import { Box, Stack } from '@mui/material';

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
      <Box display="flex" justifyContent="center" mt={3}>
        <EndButton />
      </Box>
    </BasePage>
  );
};

export default App;
