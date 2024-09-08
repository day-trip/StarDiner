import OpenAI from 'openai'
import type { ChatCompletion } from 'openai/resources/index'

const openai = new OpenAI()

interface LLMMessage {
  role: 'user' | 'system' | 'assistant'
  content: string
}

export interface PrismaMessage {
  id: bigint
  created_at: Date
  session_id: bigint
  content: string
  is_user: boolean
}


// Convert database row to LLM message
export const llmMessage = (message: PrismaMessage): LLMMessage => ({
  role: message.is_user ? 'user' : 'assistant',
  content: message.content,
})

// Generate model completion
export const promptModel = (messages: LLMMessage[]): Promise<ChatCompletion> =>
  openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
  })
