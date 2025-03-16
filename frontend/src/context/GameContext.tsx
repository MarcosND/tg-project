import React, { createContext, useContext, useState } from 'react';
import { NPCKey } from '../data/npcs';

interface GameContextType {
  unlockedNPCs: NPCKey[];
  unlockNPC: (npc: NPCKey) => void;
  sessionId: string | null;
  setSessionId: (sessionId: string | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [unlockedNPCs, setUnlockedNPCs] = useState<NPCKey[]>(['ricardo']);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const unlockNPC = (npc: NPCKey) => {
    if (!unlockedNPCs.includes(npc)) {
      setUnlockedNPCs([...unlockedNPCs, npc]);
    }
  };

  return (
    <GameContext.Provider
      value={{ unlockedNPCs, unlockNPC, sessionId, setSessionId }}
    >
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
