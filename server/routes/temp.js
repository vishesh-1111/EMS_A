
const { createGroq} = require('@ai-sdk/groq');
const { z } = require('zod');
const { streamObject } = require('ai');
const { config } = require('dotenv');
config();
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

const { elementStream } = streamObject({
  model: groq('gemma2-9b-it'),
  output: 'array',
  schema: z.object({
    name: z.string(),
    class: z
      .string()
      .describe('Character class, e.g. warrior, mage, or thief.'),
    description: z.string(),
  }),
  prompt: 'Generate 3 hero descriptions for a fantasy role playing game.',
});

for await (const hero of elementStream) {
  console.log(hero);
}