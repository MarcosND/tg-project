export type NPCKey = "ricardo" | "alfredo" | "laura" | "paulo";

export interface Message {
  role: 'user' | 'assistant' | 'developer';
  content: string;
}

export interface Answers {
  [key: string]: string;
}

export enum NPCEnum {
  Ricardo = "ricardo",
  Alfredo = "alfredo",
  Laura = "laura",
  Paulo = "paulo",
}

export const questionsData: Answers = {
  'Quem assassinou Fabrício Lehmann?': 'Laura Hermann',
  'Qual foi a arma utilizada e onde foi encontrada?':
    'Revólver calibre .38, encontrada no carro de Paulo Yohen',
  'Qual foi a motivação para o crime?':
    'Laura desejava obter o controle da empresa e era contra a sua venda, ela também queria incriminar Paulo Yohen para que ele não conseguisse comprar a empresa e tivesse que se livrar das suas ações',
  'Qual o horário aproximado do assassinato?': 'Entre 22h e 23h',
  'Onde o assassinato aconteceu?':
    'Na área externa da piscina da mansão de Fabrício Lehmann',
  'Quem mais esteve diretamente envolvido no assassinato?':
    'Alfredo, o mordomo',
  'Quem foi incriminado?': 'Paulo Yohen, o sócio',
  'Qual foi o plano elaborado para realização do crime?':
    'Laura combinou com Alfredo para que ele colocasse um sonífero no suco de Paulo, enquanto ele dormia Alfredo pegou a chave do carro de Paulo e a arma que estava no porta-luvas, então ele colocou a arma no bolso de um casaco de Laura e o entregou para ela durante a conversa deles na área externa. Laura atirou em Fabrício à queima roupa através do bolso do casaco.',
};

export const configContent = [
  "Você faz parte da investigação do assassinato de Fabrício Lehmann. Responda às perguntas do detetive com base nas informações que você possui.",
  "Não tente inventar informações que você não tem conhecimento. Se forem feitas perguntas que você não sabe responder, diga que isso não é relevante para o caso.",
  "Responda apenas estritamente o que lhe foi perguntado, sem adicionar informações desnecessárias. Responda sempre em menos de três frases.",
  "Responda com as informações informadas apenas se algo tiver sido especificamente perguntado.",
  "Evite perguntar a todo momento se o detetive tem algo mais a perguntar, para que a conversa soe de forma mais natural.",
  "Tente responder de uma forma que soe natural, como se você estivesse conversando com o detetive.",
  "Adicione reticências e pausas em suas respostas para que a conversa soe mais natural.",
  "Se forem feitas perguntas vagas, responda de uma forma vaga para que o detetive possa pedir mais detalhes, ou faça perguntas mais específicas.",
]

export const evaluatorConfig = [
  "Você é um avaliador de semelhança. Avalie as respostas do jogador comparando com as respostas corretas e atribua um score de 0 a 100.",
  "Você deve retornar apenas o score. Dê mais importância a semelhança de contexto e não na escrita ser completamente igual.",
  "Se tiverem respostas faltantes, pontue proporcionalmente com a quantidade de perguntas total ainda considerando a sua semelhança com as respostas corretas.",
]

export const configPrompt: Message = {
  role: "developer",
  content: configContent.join(" "),
}
