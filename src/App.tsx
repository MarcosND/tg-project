import React from 'react';
import { useGame } from './context/GameContext';

import { BasePage, Chat } from './components';

const App = () => {
  const { unlockedNPCs } = useGame();

  return (
    <BasePage>
      {unlockedNPCs.map((npc) => (
        <Chat key={npc} npcKey={npc} />
      ))}
    </BasePage>
  );
};

export default App;
