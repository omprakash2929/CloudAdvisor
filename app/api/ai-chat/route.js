import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    // For text-only input, use the gemini-1.5-flash-latest model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // System prompt to specialize the AI for cloud advising
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a specialized AI Cloud Advisor. Your goal is to provide helpful, accurate, and concise advice on cloud computing services, best practices, cost optimization, and solutions. Focus on major cloud providers like AWS, Azure, and GCP unless specified otherwise. Do not go off-topic." }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am your AI Cloud Advisor, ready to help with your cloud computing questions." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 800, // Adjust as needed
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Error processing message with Gemini:", error);
    let errorMessage = 'Failed to process message with Gemini.';
    if (error.message) {
        errorMessage = error.message;
    }
    if (error.details) { // Specific to Google API errors
        errorMessage = error.details;
    } else if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) { // For other HTTP client errors
        errorMessage = error.response.data.error.message;
    }

    return NextResponse.json({ error: errorMessage, details: error.toString() }, { status: 500 });
  }
}