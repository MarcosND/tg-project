import OpenAI from "openai";
import { NPCKey, NPCS } from "../data/npcs";

export interface Message {
  role: 'user' | 'assistant' | 'developer';
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const chatWithNPC = async (npcKey: NPCKey, messages: Message[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: NPCS[npcKey].prompt },
        ...messages,
      ],
      max_completion_tokens: 100,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro na API:", error);
    return "Desculpe, algo deu errado.";
  }
};