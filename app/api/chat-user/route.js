import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate response from AI
    const result = await model.generateContent(message);
    const response = await result.response;
    const botResponse = response.text(); // Gemini AI usually returns formatted markdown or HTML

    return NextResponse.json({
      role: "bot",
      text: botResponse, // Ensure it's a well-structured response
    });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
