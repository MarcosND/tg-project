import { PrismaClient } from '@prisma/client';
import { Answers, Message, NPCKey } from '../openai/utils';
import { chatWithNPC, evaluateAnswers } from '../openai/apis';

const prisma = new PrismaClient();

export const startGame = async () => {
  return await prisma.gameSession.create({ data: {
    startTime: new Date(),
    questionsAsked: 0,
    questionsPerCharacter: {
      create: { ricardo: 0, laura: 0, alfredo: 0, paulo: 0 },
    },
  } });
};

export const askQuestion = async (sessionId: string, npcKey: NPCKey, messages: Message[]) => {
  const gameSession = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: { questionsPerCharacter: true },
  });

  if (!gameSession) {
    throw new Error('Game session not found');
  }

  await prisma.gameSession.update({
    where: { id: sessionId },
    data: { questionsAsked: { increment: 1 } },
  });
  
  const questionsPerCharacter = gameSession.questionsPerCharacter;
  if (questionsPerCharacter) {
    await prisma.questionsPerCharacter.update({
      where: { gameId: sessionId },
      data: { [npcKey]: questionsPerCharacter[npcKey] + 1 },
    });
  }

  const npcResponse = await chatWithNPC(npcKey, messages);

  return npcResponse;
};

export const finishGame = async (sessionId: string, answers: Answers) => {
  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: { questionsPerCharacter: true },
  });
  if (!session) throw new Error('Game session not found');

  const score = await evaluateAnswers(answers);

  const endTime = new Date();
  const duration = Math.round((endTime.getTime() - session.startTime.getTime()) / 1000);

  if (typeof score !== 'number') {
    throw new Error('Invalid score');
  }

  return await prisma.gameSession.update({
    where: { id: sessionId },
    data: { endTime, duration, score },
  });
};
