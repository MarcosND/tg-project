import React from 'react';
import { createContext, useContext, useState } from 'react';
import { NPCKey } from '../data/npcs';

interface GameContextType {
  unlockedNPCs: NPCKey[];
  unlockNPC: (npc: NPCKey) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [unlockedNPCs, setUnlockedNPCs] = useState<NPCKey[]>(['richard']);

  const unlockNPC = (npc: NPCKey) => {
    if (!unlockedNPCs.includes(npc)) {
      setUnlockedNPCs([...unlockedNPCs, npc]);
    }
  };

  return (
    <GameContext.Provider value={{ unlockedNPCs, unlockNPC }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de GameProvider');
  }
  return context;
};
