import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

// Create custom OpenAI-compatible provider for wisdom-ai models
const wisdomAI = createOpenAICompatible({
  name: 'wisdom-ai',
  baseURL: 'https://wisdom-gate.juheapi.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'wisdom-ai-gpt5': chatModel,
        'wisdom-ai-gpt5-mini': chatModel,
        'wisdom-ai-gpt5-nano': chatModel,
        'wisdom-ai-dsv3': chatModel,
        'wisdom-ai-dsr1': reasoningModel,
        'wisdom-ai-claude-sonnet-4': artifactModel,
        'wisdom-ai-gemini-2.5-flash': chatModel,
        // Legacy models for backward compatibility
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'wisdom-ai-gpt5': wisdomAI('wisdom-ai-gpt5'),
        'wisdom-ai-gpt5-mini': wisdomAI('wisdom-ai-gpt5-mini'),
        'wisdom-ai-gpt5-nano': wisdomAI('wisdom-ai-gpt5-nano'),
        'wisdom-ai-dsv3': wisdomAI('wisdom-ai-dsv3'),
        'wisdom-ai-dsr1': wrapLanguageModel({
          model: wisdomAI('wisdom-ai-dsr1'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'wisdom-ai-claude-sonnet-4': wisdomAI('wisdom-ai-claude-sonnet-4'),
        'wisdom-ai-gemini-2.5-flash': wisdomAI('wisdom-ai-gemini-2.5-flash'),
        // Legacy models for backward compatibility
        'chat-model': wisdomAI('wisdom-ai-gpt5'),
        'chat-model-reasoning': wrapLanguageModel({
          model: wisdomAI('wisdom-ai-dsr1'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': wisdomAI('wisdom-ai-gpt5-mini'),
        'artifact-model': wisdomAI('wisdom-ai-claude-sonnet-4'),
      },
      imageModels: {
        'small-model': wisdomAI.imageModel('dall-e-3'),
      },
    });
