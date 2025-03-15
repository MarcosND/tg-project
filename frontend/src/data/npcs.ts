import { buildPrompt } from "./prompts";

export type NPCKey = "ricardo" | "alfredo" | "laura" | "paulo";

export enum NPCEnum {
  Ricardo = "ricardo",
  Alfredo = "alfredo",
  Laura = "laura",
  Paulo = "paulo",
}

type NPCSData = Record<NPCKey, { name: string; prompt: string, avatar: string, occupation: string, gender: string, initialMessage?: string }>;

export const NPCS: NPCSData = {
  ricardo: {
    name: "Ricardo",
    avatar: '/assets/policeman.png',
    occupation: 'Policial',
    gender: 'Masculino',
    prompt: buildPrompt("ricardo"),
    initialMessage: 'Olá, detetive. Eu sou o Policial Ricardo e estou aqui para ajudá-lo na investigação do assassinato de Fabrício Lehmann. Como posso ajudar?',
  },
  alfredo: {
    name: "Alfredo",
    avatar: '/assets/steward.png',
    occupation: 'Mordomo',
    gender: 'Masculino',
    prompt: buildPrompt("alfredo"),
  },
  laura: {
    name: "Laura Lehmann",
    avatar: '/assets/woman.png',
    gender: 'Feminino',
    occupation: 'Empresária',
    prompt: buildPrompt("laura"),
  },
  paulo: {
    name: "Paulo Yohen",
    avatar: '/assets/manager.png',
    gender: "Masculino",
    occupation: 'Empresário',
    prompt: buildPrompt("paulo"),
  },
};