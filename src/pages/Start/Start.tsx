import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import OpenAI from 'openai';

interface Message {
  role: 'user' | 'assistant' | 'developer';
  content: string;
}

const ChatComponent = () => {
  const systemMessage: Message = {
    role: 'developer',
    content:
      'You are only the beggining of a long journey, please respond all the messages with Hello, world and some variations',
  };

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [messages, setMessages] = useState<Message[]>([systemMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage: Message = { role: 'user', content: input };
    const inputMessages = [...messages, userMessage];
    setInput('');

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: inputMessages,
      });

      const answer = response.choices[0].message.content;

      if (answer) {
        setMessages([
          ...messages,
          userMessage,
          { role: 'assistant', content: answer },
        ]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
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
              <strong>{msg.role === 'user' ? 'You' : 'NPC'}:</strong>{' '}
              {msg.content}
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the NPC something..."
            variant="outlined"
          />
          <Button
            onClick={sendMessage}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatComponent;
