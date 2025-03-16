import axios from 'axios';
import { NPCKey } from '../data/npcs';
import { Answers, Message } from '../utils/openai';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const startGame = async () => {
  const response = await api.post('/start-game');
  return response.data;
};

export const chatWithNPC = async (sessionId: string, npcKey: NPCKey, messages: Message[]) => {
 const response = await api.post('/chat-with-npc', { sessionId, npcKey, messages });

 return response.data;
};

export const evaluateAnswers = async (sessionId: string, answers: Answers) => {
  const response = await api.post('/finish-game', { sessionId, answers });

  return response.data;
};
