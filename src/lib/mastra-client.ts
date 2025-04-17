import { createClient } from '@mastra/client-js';
import { openai } from '@ai-sdk/openai';

// Create a Mastra client instance
export const mastraClient = createClient({
  apiKey: process.env.OPENAI_API_KEY || '',
  llm: openai({
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
  }),
});

// Export a function to get the client
export function getMastraClient() {
  return mastraClient;
}
