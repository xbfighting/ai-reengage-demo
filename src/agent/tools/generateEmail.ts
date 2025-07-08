import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export async function generateEmail({ prompt }: { prompt: string }): Promise<string> {
  if (process.env.NODE_ENV === 'development' && !process.env.OPENAI_API_KEY) {
    return `Dear Valued Customer,

This is a professionally crafted marketing email generated in development mode.

Based on your profile and preferences, we've tailored this message specifically for you. Our advanced AI system has analyzed your beauty goals, treatment history, and personal traits to create this personalized experience.

Key highlights for you:
• Personalized treatment recommendations
• Exclusive offers based on your preferences
• Professional medical aesthetics expertise
• Trusted by customers like you

We appreciate your loyalty and look forward to helping you achieve your beauty goals.

Best regards,
Your Medical Aesthetics Team

[Generated in development mode - Prompt preview: ${prompt.slice(0, 100)}...]`;
  }
  const llm = new ChatOpenAI({ temperature: 0.85 });

  const messages = [
    new SystemMessage("You are a top-tier email copywriting AI in the medical aesthetics industry, specializing in creating compelling marketing content."),
    new HumanMessage(prompt)
  ];

  const res = await llm.invoke(messages);
  const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
  return content;
}
