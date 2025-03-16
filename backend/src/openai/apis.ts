import OpenAI from "openai";
import { Answers, configPrompt, evaluatorConfig, Message, NPCKey, questionsData } from "./utils";
import { buildPrompt } from "./prompts";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithNPC = async (npcKey: NPCKey, messages: Message[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        configPrompt,
        { role: "developer", content: buildPrompt(npcKey) },
        ...messages,
      ],
      max_completion_tokens: 256,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro na API:", error);
    return "Desculpe, algo deu errado.";
  }
};

export const evaluateAnswers = async (answers: Answers) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "developer", content: evaluatorConfig.join(" ") },
        { role: "user", content: `Respostas do jogador: ${JSON.stringify(answers)}` },
        { role: "user", content: `Respostas corretas: ${JSON.stringify(questionsData)}` }
      ],
      max_tokens: 50
    });
    
    const score = response.choices[0].message.content;
    return Number(score);
  } catch (error) {
    console.error("Erro ao avaliar respostas:", error);
    return "Erro ao calcular pontuação.";
  }
};