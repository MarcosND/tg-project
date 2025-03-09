import OpenAI from "openai";
import { NPCKey, NPCS } from "../data/npcs";
import { Answers } from "../pages/MainScreen/MainScreen";

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
  "Se forem feitas perguntas vagas, responda de uma forma vaga para que o detetive possa pedir mais detalhes, ou faça perguntas mais específicas.",
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

export const evaluateAnswers = async (answers: Answers, correctAnswers: Answers) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "developer", content: "Você é um avaliador de semelhança. Avalie as respostas do jogador comparando com as respostas corretas e atribua um score de 0 a 100. Você deve retornar apenas o score. Dê mais importância a semelhança de contexto e não na escrita ser completamente igual." },
        { role: "user", content: `Respostas do jogador: ${JSON.stringify(answers)}` },
        { role: "user", content: `Respostas corretas: ${JSON.stringify(correctAnswers)}` }
      ],
      max_tokens: 50
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao avaliar respostas:", error);
    return "Erro ao calcular pontuação.";
  }
};