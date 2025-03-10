import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Box,
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

    setInput('');
    setLoading(false);
  };

  const renderMessage = (msg: Message, index: number) => (
    <motion.div
      key={index}
      style={{
        padding: 8,
        borderRadius: 8,
        backgroundColor: msg.role === 'user' ? '#1976d2' : '#f0f0f0',
        color: msg.role === 'user' ? 'white' : 'black',
        textAlign: msg.role === 'user' ? 'right' : 'left',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <strong>{msg.role === 'user' ? 'Você' : npcKey.toUpperCase()}:</strong>{' '}
      {msg.content}
    </motion.div>
  );

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
      sx={{ p: 2, width: '100%', borderRadius: '8px', boxSizing: 'border-box' }}
    >
      <Typography variant="h5" pl={2}>
        {NPCS[npcKey].name}
      </Typography>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          height="400px"
          p={1}
          border="1px solid #ccc"
          borderRadius={2}
          gap={1.5}
          overflow="auto"
          id="chat-container"
        >
          {messages.map((msg, index) => renderMessage(msg, index))}
          <div ref={messagesEndRef} />
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Pergunte algo..."
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
