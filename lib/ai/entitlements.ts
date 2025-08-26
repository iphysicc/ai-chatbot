import type { UserType } from '@/app/(auth)/auth';
import type { ChatModel } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: [
      'wisdom-ai-gpt5',
      'wisdom-ai-gpt5-mini',
      'wisdom-ai-gpt5-nano',
    ],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: [
      'wisdom-ai-gpt5',
      'wisdom-ai-gpt5-mini',
      'wisdom-ai-gpt5-nano',
      'wisdom-ai-dsv3',
      'wisdom-ai-dsr1',
      'wisdom-ai-claude-sonnet-4',
      'wisdom-ai-gemini-2.5-flash',
    ],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
