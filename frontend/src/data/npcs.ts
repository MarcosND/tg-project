export type NPCKey = "ricardo" | "alfredo" | "laura" | "paulo";

export enum NPCEnum {
  Ricardo = "ricardo",
  Alfredo = "alfredo",
  Laura = "laura",
  Paulo = "paulo",
}

type NPCSData = Record<NPCKey, { name: string; avatar: string, occupation: string, gender: string, initialMessage?: string }>;

export const NPCS: NPCSData = {
  ricardo: {
    name: "Ricardo",
    avatar: '/assets/policeman.png',
    occupation: 'Policial',
    gender: 'Masculino',
    initialMessage: 'Olá, detetive. Eu sou o Policial Ricardo e estou aqui para ajudá-lo na investigação do assassinato de Fabrício Lehmann. Como posso ajudar?',
  },
  alfredo: {
    name: "Alfredo",
    avatar: '/assets/steward.png',
    occupation: 'Mordomo',
    gender: 'Masculino',
  },
  laura: {
    name: "Laura Lehmann",
    avatar: '/assets/woman.png',
    gender: 'Feminino',
    occupation: 'Empresária',
  },
  paulo: {
    name: "Paulo Yohen",
    avatar: '/assets/manager.png',
    gender: "Masculino",
    occupation: 'Empresário',
  },
};