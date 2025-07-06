import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export async function generateEmail({ prompt }: { prompt: string }): Promise<string> {
  const llm = new ChatOpenAI({ temperature: 0.85 });

  const messages = [
    new SystemMessage("You are a top-tier email copywriting AI in the medical aesthetics industry, specializing in creating compelling marketing content."),
    new HumanMessage(prompt)
  ];

  const res = await llm.invoke(messages);
  const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
  return content;
}
