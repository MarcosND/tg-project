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

const configContent = [
  "Você faz parte da investigação do assassinato de Fabrício Lehmann. Responda às perguntas do detetive com base nas informações que você possui.",
  "Não tente inventar informações que você não tem conhecimento. Se forem feitas perguntas que você não sabe responder, diga que isso não é relevante para o caso.",
  "Responda apenas estritamente o que lhe foi perguntado, sem adicionar informações desnecessárias. Responda sempre em menos de três frases.",
  "Responda com as informações informadas apenas se algo tiver sido especificamente perguntado.",
  "Evite perguntar a todo momento se o detetive tem algo mais a perguntar, para que a conversa soe de forma mais natural.",
  "Tente responder de uma forma que soe natural, como se você estivesse conversando com o detetive.",
  "Adicione reticências e pausas em suas respostas para que a conversa soe mais natural.",
]

const configPrompt: Message = {
  role: "developer",
  content: configContent.join(" "),
}

export const chatWithNPC = async (npcKey: NPCKey, messages: Message[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        configPrompt,
        { role: "developer", content: NPCS[npcKey].prompt },
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