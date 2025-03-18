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
        {
          role: "user",
          content: `
          Avalie as respostas do jogador com base nas respostas corretas.
          
          **Regras de pontuação:**
          - A pontuação total é de 100 pontos.
          - Cada questão tem peso igual (divida 100 pelo número total de questões).
          - Se a resposta estiver completamente correta, dê a pontuação máxima para a questão.
          - Se a resposta estiver parcialmente correta, dê uma pontuação proporcional com base na similaridade semântica.
          - Se estiver errada ou ausente, a pontuação para aquela pergunta é 0.

          **Respostas do jogador:** 
          ${JSON.stringify(answers)}

          **Respostas corretas:** 
          ${JSON.stringify(questionsData)}
          
          Retorne apenas um objeto JSON com a chave score que representa a pontuação total. Se as respostas do jogador estiverem vazias ou ausentes retorne 0.
          `
        }
      ],
      max_tokens: 50,
      response_format: {type: "json_object" }
    });


    const content = response.choices[0].message.content;
    if (content) {
      const scoreData = JSON.parse(content);
      const score = scoreData.score;
      return Number(score);
    } else {
      throw new Error("Response content is null");
    }
  } catch (error) {
    console.error("Erro ao avaliar respostas:", error);
    return "Erro ao calcular pontuação.";
  }
};