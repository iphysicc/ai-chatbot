import { z } from 'zod';

const textPartSchema = z.object({
  type: z.enum(['text']),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(['file']),
  mediaType: z.enum(['image/jpeg', 'image/png']),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    role: z.enum(['user']),
    parts: z.array(partSchema),
  }),
  selectedChatModel: z.enum([
    // New wisdom-ai models
    'wisdom-ai-gpt5',
    'wisdom-ai-gpt5-mini',
    'wisdom-ai-gpt5-nano',
    'wisdom-ai-dsv3',
    'wisdom-ai-dsr1',
    'wisdom-ai-claude-sonnet-4',
    'wisdom-ai-gemini-2.5-flash',
    // Legacy models for backward compatibility
    'chat-model',
    'chat-model-reasoning',
  ]),
  selectedVisibilityType: z.enum(['public', 'private']),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
