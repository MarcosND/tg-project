import { buildPrompt } from "./prompts";

export type NPCKey = "ricardo" | "alfredo" | "laura" | "paulo";

export enum NPCEnum {
  Ricardo = "ricardo",
  Alfredo = "alfredo",
  Laura = "laura",
  Paulo = "paulo",
}

type NPCSData = Record<NPCKey, { name: string; prompt: string, initialMessage?: string }>;



export const NPCS: NPCSData = {
  ricardo: {
    name: "Ricardo, o Policial",
    prompt: buildPrompt("ricardo"),
    initialMessage: 'Olá, detetive. Eu sou o Policial Ricardo e estou aqui para ajudá-lo na investigação do assassinato de Fabrício Lehmann. Como posso ajudar?',
  },
  alfredo: {
    name: "Alfredo, o Mordomo",
    prompt: buildPrompt("alfredo"),
  },
  laura: {
    name: "Laura Lehmann, a Esposa",
    prompt: buildPrompt("laura"),
  },
  paulo: {
    name: "Paulo Yohen, o Sócio",
    prompt: buildPrompt("paulo"),
  },
};