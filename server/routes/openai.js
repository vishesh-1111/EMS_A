
const { MongoDBAtlasVectorSearch } = require('@langchain/mongodb');
const { HuggingFaceInferenceEmbeddings } = require('@langchain/community/embeddings/hf');
const { createGroq } = require('@ai-sdk/groq');
const { streamText } = require('ai');
const { Router } = require('express');
const {collection} = require('../mongodb/connection')
const dotenv = require('dotenv');
dotenv.config();


  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey : process.env.HF_TOKEN,
    model: 'sentence-transformers/all-mpnet-base-v2',

  });


  const vectorStore = new MongoDBAtlasVectorSearch(embeddings,{
    collection:collection,
    indexName:'index3',
  });

async function getcontext(query) {
    try {
        const docs = await vectorStore.similaritySearch(query);
        if (!docs || docs.length === 0) {
            return "No relevant documents found";
        }

        const context = docs[0].pageContent;
       return context;
    } catch (err) {
        console.error('Error querying data:', err);
        return "An error occurred";
    }
    
}


const StreamRouter = Router();
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

async function streamHolidayDescription(res, prompt) {
  const context =await getcontext(prompt);

  const newprompt = `Use the following pieces of context to answer the question at the end.\n\n${context}\n\nQuestion: ${prompt}`;
  console.log(newprompt);
  try {
    const { textStream } = streamText({
      model: groq('llama-3.1-8b-instant'),
      prompt:newprompt,
      temperature : 0.1,
    });
  
    for await (const textPart of textStream) {
      res.write(` ${textPart}\n\n`); 
    }

    res.end();
  } catch (error) {
    console.error('Error streaming text:', error);
    res.write(`data: ${error}  ${JSON.stringify({ errors: 'Streaming failed' })}\n\n`);
    res.end();
  }
}

// Define the streaming endpoint
StreamRouter.post('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');



  await streamHolidayDescription(res, req.body.prompt);
});

module.exports = StreamRouter;
