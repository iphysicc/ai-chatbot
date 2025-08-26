export const DEFAULT_CHAT_MODEL: string = 'wisdom-ai-gpt5';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'wisdom-ai-gpt5',
    name: 'GPT-5',
    description: 'Primary model for all-purpose chat (via Gpt5)',
  },
  {
    id: 'wisdom-ai-gpt5-mini',
    name: 'GPT-5 Mini',
    description: 'Faster, lightweight model (via Gpt5 Mini)',
  },
  {
    id: 'wisdom-ai-gpt5-nano',
    name: 'GPT-5 Nano',
    description: 'Ultra-fast, minimal model (via Gpt5 Nano)',
  },
  {
    id: 'wisdom-ai-dsv3',
    name: 'DeepSeek V3',
    description: 'Advanced reasoning model (via DeepseekV3)',
  },
  {
    id: 'wisdom-ai-dsr1',
    name: 'DeepSeek R1',
    description: 'Advanced reasoning with chain-of-thought (via DeepseekR1)',
  },
  {
    id: 'wisdom-ai-claude-sonnet-4',
    name: 'Claude Sonnet 4',
    description: 'High-quality text generation (via Claude Sonnet 4)',
  },
  {
    id: 'wisdom-ai-gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Fast multimodal model (via Gemini 2.5 Flash)',
  },
];
