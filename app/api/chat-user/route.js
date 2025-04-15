import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // 🧠 Properly structured chat history with "parts" using { text }
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            { text: "You are a helpful and knowledgeable AI assistant. Always provide clear, structured, and detailed answers, especially for technical terms like OOP, HTTP, Java, etc." },
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Sure! I'm ready to help with any technical or general topic." },
          ],
        },
      ],
    });

    // Send user message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const botResponse = response.text();

    console.log("🔍 User message:", message);
    console.log("🤖 Gemini response:", botResponse);

    return NextResponse.json({
      role: "bot",
      text: botResponse,
    });
  } catch (error) {
    console.error("❌ Error fetching AI response:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
