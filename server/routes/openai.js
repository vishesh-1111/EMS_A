const { createGroq } = require('@ai-sdk/groq');
const { streamText } = require('ai');
const { config } = require('dotenv');
const { Router } = require('express');
config();

const StreamRouter = Router();
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

// Stream function to handle streaming chunks to the client
async function streamHolidayDescription(res, prompt) {
  try {
    const { textStream } = streamText({
      model: groq('llama-3.1-8b-instant'),
      prompt,
    });

    // Send streaming chunks to the client
    for await (const textPart of textStream) {
      console.log('Streaming chunk:', textPart);
      res.write(` ${textPart}\n\n`); // Send chunk as SSE data
    }

    // End the stream after completion
    res.end();
  } catch (error) {
    console.error('Error streaming text:', error);
    res.write(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`);
    res.end();
  }
}

// Define the streaming endpoint
StreamRouter.post('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  console.log('Received prompt:', req.body.prompt);

  await streamHolidayDescription(res, req.body.prompt);
});

module.exports = StreamRouter;
