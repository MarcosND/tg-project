export interface Answers {
  [key: string]: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'developer';
  content: string;
}

export const questions = [
  'Quem assassinou Fabrício Lehmann?',
  'Qual foi a arma utilizada e onde foi encontrada?',
  'Qual foi a motivação para o crime?',
  'Qual o horário aproximado do assassinato?',
  'Onde o assassinato aconteceu?',
  'Quem mais esteve diretamente envolvido no assassinato?',
  'Quem foi incriminado?',
  'Qual foi o plano elaborado para realização do crime?',
];
