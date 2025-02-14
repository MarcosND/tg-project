import React, { useState } from 'react';
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
}

const ChatComponent: React.FC<ChatComponentProps> = ({ npcKey }) => {
  const { unlockNPC } = useGame();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá, detetive! Como posso ajudar?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    // Add character limit here in the future
    if (!input.trim()) return;
    setLoading(true);

    const newMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];

    try {
      const response = await chatWithNPC(npcKey, updatedMessages);

      if (response) {
        setMessages([
          ...updatedMessages,
          { role: 'assistant', content: response },
        ]);

        if (response.includes('Alfredo')) {
          unlockNPC('alfredo');
        }
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
      <strong>{msg.role === 'user' ? 'Você' : 'NPC'}:</strong> {msg.content}
    </motion.div>
  );

  return (
    <Card sx={{ maxWidth: 650, p: 2, width: '100%' }}>
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
        >
          {messages.map((msg, index) => renderMessage(msg, index))}
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
