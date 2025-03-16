import { Request, Response } from 'express';
import * as gameService from '../services/gameService';

export const startGame = async (_req: Request, res: Response): Promise<void> => {
  try {
    const session = await gameService.startGame();
    res.json({ sessionId: session.id, message: 'Game started' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start game' });
  }
};

export const askQuestion = async (req: Request, res: Response): Promise<void> => {
  const { sessionId, npcKey, messages } = req.body;
  
  if (!sessionId || !npcKey || !messages) {
    res.status(400).json({ error: 'Session ID, NPC key, and messages are required' });
    return;
  }


  try {
    const result = await gameService.askQuestion(sessionId, npcKey, messages);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question count' });
  }
};

export const finishGame = async (req: Request, res: Response): Promise<void> => {
  const { sessionId, answers } = req.body;
  if (!sessionId || !answers) {
    res.status(400).json({ error: 'Session ID and answers are required' });
    return;
  }

  try {
    const result = await gameService.finishGame(sessionId, answers);
    res.json(result.score );
  } catch (error) {
    res.status(500).json({ error: 'Failed to finish game' });
  }
};
