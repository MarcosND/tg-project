import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Box,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { chatWithNPC, Message } from '../../utils/openai';
import { NPCKey, NPCS } from '../../data/npcs';

interface ChatComponentProps {
  npcKey: NPCKey;
  messages: Message[];
  onSendMessage: (npc: NPCKey, msg: Message) => void;
}

const NPCsToUnlock: NPCKey[] = ['alfredo', 'laura', 'paulo'];

const ChatComponent: React.FC<ChatComponentProps> = ({
  npcKey,
  messages,
  onSendMessage,
}) => {
  const { unlockNPC } = useGame();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];
    onSendMessage(npcKey, newMessage);

    try {
      const response = await chatWithNPC(npcKey, updatedMessages);

      if (response) {
        onSendMessage(npcKey, { role: 'assistant', content: response });

        NPCsToUnlock.forEach((key) => {
          if (response.toLowerCase().includes(key)) {
            unlockNPC(key);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const renderMessage = (msg: Message, index: number) => (
    <motion.div
      key={index}
      style={{
        maxWidth: '85%',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: msg.role === 'user' ? '#000000' : '#e0e0e0c1',
        color: msg.role === 'user' ? 'white' : 'black',
        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
          mb: 0.5,
        }}
      >
        {msg.role === 'user' ? 'Você' : NPCS[npcKey].name}
      </Typography>
      <Typography variant="body1">{msg.content}</Typography>
    </motion.div>
  );

  const renderLoading = () => {
    return (
      <Box
        sx={{
          width: '85%',
          padding: '10px',
          borderRadius: '8px',
          bgcolor: '#e0e0e0c1',
          alignSelf: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Skeleton variant="text" width="25%" height={20} />
        <Skeleton variant="text" width="85%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />
      </Box>
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        width: '100%',
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h5" pl={2}>
        {NPCS[npcKey].name}
      </Typography>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          height="450px"
          padding={2}
          border="1px solid #ccc"
          borderRadius={2}
          gap={1.5}
          overflow="auto"
        >
          {messages.map((msg, index) => renderMessage(msg, index))}
          {loading && renderLoading()}
          <div ref={messagesEndRef} />
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Pergunte algo..."
            slotProps={{ input: { style: { borderRadius: '8px' } } }}
          />
          <Button
            onClick={sendMessage}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatComponent;
