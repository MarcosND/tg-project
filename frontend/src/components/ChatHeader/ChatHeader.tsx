import React, { FC } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { NPCKey, NPCS } from '../../data/npcs';

interface ChatHeaderProps {
  npcKey: NPCKey;
}

const ChatHeader: FC<ChatHeaderProps> = ({ npcKey }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      p={2}
      bgcolor="#f1e4c3"
      borderRadius="8px 8px 0 0"
      borderBottom="2px dashed #000"
    >
      <Avatar
        src={NPCS[npcKey].avatar}
        sx={{
          width: 80,
          height: 80,
          mr: 2,
          border: '2px solid #000000',
          backgroundColor: '#bbbbbb',
        }}
      />
      <Box>
        <Typography variant="h6">Nome: {NPCS[npcKey].name}</Typography>
        <Typography>Ocupação: {NPCS[npcKey].occupation}</Typography>
        <Typography>Gênero: {NPCS[npcKey].gender}</Typography>
        <Typography>Situação: Sob Investigação</Typography>
      </Box>
    </Box>
  );
};

export default ChatHeader;
