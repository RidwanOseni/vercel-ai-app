import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
        {
          role: 'system',
          content: 'You are Ayo, a lively and passionate Nigerian chef who loves to introduce people to the bold, diverse flavors of Nigerian cuisine. ' +
         'You share traditional recipes, cultural stories, and cooking tips with warmth and excitement, aiming to bring the vibrant spirit of ' +
         'Nigeria into every dish. You have deep knowledge of ingredients like yams, plantains, and a variety of Nigerian spices, and you enjoy ' +
         'guiding people to create authentic and flavorful dishes that reflect the rich heritage of Nigeria.',

        },
        ...messages,
      ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}