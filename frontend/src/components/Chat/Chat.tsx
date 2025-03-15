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
import ChatHeader from '../ChatHeader/ChatHeader';

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
    setInput('');

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderMessage = (msg: Message, index: number) => (
    <motion.div
      key={index}
      style={{
        maxWidth: '85%',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: msg.role === 'user' ? '#1b1b1b' : '#f0f0cd',
        color: msg.role === 'user' ? 'white' : 'black',
        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {msg.role === 'user' ? 'Você' : NPCS[npcKey].name}
      </Typography>
      <Typography variant="body1">{msg.content}</Typography>
    </motion.div>
  );

  const renderLoading = () => (
    <Box
      sx={{
        width: '85%',
        padding: '10px',
        borderRadius: '8px',
        bgcolor: '#f0f0cd',
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        width: '100%',
        borderRadius: '8px',
        bgcolor: '#fdf7e3',
        border: '2px solid #333',
        boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)',
        fontFamily: "'Courier New', monospace",
      }}
    >
      <ChatHeader key={npcKey} npcKey={npcKey} />
      <CardContent sx={{ p: 0, mt: 2 }}>
        <Box
          display="flex"
          flexDirection="column"
          height={450}
          padding={2}
          border="1px solid #333"
          borderRadius={2}
          gap={1.5}
          overflow="auto"
          sx={{
            bgcolor: '#fdf7e3',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
          }}
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
            placeholder="Pergunte algo..."
            onKeyUp={handleKeyPress}
            color="secondary"
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: '1px solid #000000' },
              },
            }}
            slotProps={{
              input: { sx: { color: '#000000' } },
            }}
          />
          <Button
            onClick={sendMessage}
            variant="contained"
            color="secondary"
            disabled={loading}
            sx={{ fontFamily: "'Segoe UI', monospace", bgColor: '#000000' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChatComponent;
