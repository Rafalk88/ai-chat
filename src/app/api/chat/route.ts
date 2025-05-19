import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4'),
      system: 'You are a helpful assistant',
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while generating response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
