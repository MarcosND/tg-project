import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { chatWithNPC, Message } from '../../utils/openai';
import { NPCKey } from '../../data/npcs';

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

        if (response.includes('Alfred')) {
          unlockNPC('alfred');
        }
      }
    } catch (error) {
      console.error(error);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <CardContent>
        <div
          style={{
            height: 400,
            overflowY: 'auto',
            padding: 8,
            border: '1px solid #ccc',
            borderRadius: 8,
          }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              style={{
                padding: 8,
                borderRadius: 8,
                marginBottom: 8,
                backgroundColor: msg.role === 'user' ? '#1976d2' : '#f0f0f0',
                color: msg.role === 'user' ? 'white' : 'black',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <strong>{msg.role === 'user' ? 'Você' : 'NPC'}:</strong>{' '}
              {msg.content}
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatComponent;
