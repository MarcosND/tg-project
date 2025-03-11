import { buildPrompt } from "./prompts";

export type NPCKey = "ricardo" | "alfredo" | "laura" | "paulo";

export enum NPCEnum {
  Ricardo = "ricardo",
  Alfredo = "alfredo",
  Laura = "laura",
  Paulo = "paulo",
}

type NPCSData = Record<NPCKey, { name: string; prompt: string, avatar: string, occupation: string, initialMessage?: string }>;



export const NPCS: NPCSData = {
  ricardo: {
    name: "Ricardo",
    avatar: '',
    occupation: 'Mordomo',

    prompt: buildPrompt("ricardo"),
    initialMessage: 'Olá, detetive. Eu sou o Policial Ricardo e estou aqui para ajudá-lo na investigação do assassinato de Fabrício Lehmann. Como posso ajudar?',
  },
  alfredo: {
    name: "Alfredo",
    avatar: '',
    occupation: 'Mordomo',
    prompt: buildPrompt("alfredo"),
  },
  laura: {
    name: "Laura Lehmann",
    avatar: '',

    occupation: 'Mordomo',

    prompt: buildPrompt("laura"),
  },
  paulo: {
    name: "Paulo Yohen",
    avatar: '',

    occupation: 'Mordomo',

    prompt: buildPrompt("paulo"),
  },
};