import React, { FC, useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';

import { Chat } from '../../components';
import { Tab, Tabs } from '@mui/material';
import { Message } from '../../utils/openai';
import { NPCKey, NPCS } from '../../data/npcs';

export interface Answers {
  [key: string]: string;
}

const getInitialMessage = (npcKey: NPCKey): Message[] => {
  const npc = NPCS[npcKey].initialMessage;
  return npc ? [{ role: 'assistant', content: npc }] : [];
};

const GameBody: FC = () => {
  const { unlockedNPCs } = useGame();
  const [activeTab, setActiveTab] = useState<NPCKey>(unlockedNPCs[0]);
  const [highlightedTabs, setHighlightedTabs] = useState<NPCKey[]>([]);

  const prevUnlockedRef = useRef<NPCKey[]>(unlockedNPCs);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: NPCKey) => {
    setActiveTab(newValue);
    setHighlightedTabs((prev) => prev.filter((npc) => npc !== newValue));
  };

  const [npcMessages, setNpcMessages] = useState<Record<NPCKey, Message[]>>(
    unlockedNPCs.reduce((acc, npc) => {
      acc[npc] = getInitialMessage(npc);
      return acc;
    }, {} as Record<NPCKey, Message[]>),
  );

  useEffect(() => {
    setNpcMessages((prev) =>
      unlockedNPCs.reduce((acc, npc) => {
        acc[npc] = prev[npc] || getInitialMessage(npc);
        return acc;
      }, {} as Record<NPCKey, Message[]>),
    );

    const newUnlocks = unlockedNPCs.filter(
      (npc) => !prevUnlockedRef.current.includes(npc),
    );

    if (newUnlocks.length > 0) {
      setHighlightedTabs(newUnlocks);

      newUnlocks.forEach((npc) => {
        setTimeout(() => {
          setHighlightedTabs((prev) => prev.filter((tab) => tab !== npc));
        }, 6000);
      });
      prevUnlockedRef.current = unlockedNPCs;
    }
  }, [unlockedNPCs]);

  const handleSendMessage = (npc: NPCKey, newMessage: Message) => {
    setNpcMessages((prev) => ({
      ...prev,
      [npc]: [...prev[npc], newMessage],
    }));
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          width: '100%',
          color: '#FFFFFF',
        }}
      >
        {unlockedNPCs.map((npc) => (
          <Tab
            key={npc}
            value={npc}
            label={npc}
            sx={{
              animation: highlightedTabs.includes(npc)
                ? 'highlight 0.65s infinite alternate'
                : 'none',
            }}
          />
        ))}
      </Tabs>
      {unlockedNPCs.map(
        (npc) =>
          activeTab === npc && (
            <Chat
              key={npc}
              npcKey={npc}
              messages={npcMessages[npc]}
              onSendMessage={handleSendMessage}
            />
          ),
      )}
    </>
  );
};

export default GameBody;
