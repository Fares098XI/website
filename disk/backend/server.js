require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://rootnripple.netlify.app'
}));
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// Rate Limiting (100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later'
});
app.use('/api', limiter);

// OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 15000
});

// AI Assistant Endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.length > 500) {
      return res.status(400).json({ error: 'Invalid message length (1-500 chars)' });
    }

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a competition assistant. Be concise and helpful.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    res.json({
      reply: response.choices[0].message.content,
      model: response.model,
      tokens: response.usage.total_tokens
    });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      error: 'AI service unavailable',
      suggestion: error.status === 429 ? 'Wait before retrying' : null
    });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString() 
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AI Model: ${process.env.AI_MODEL || 'gpt-3.5-turbo'}`);
});