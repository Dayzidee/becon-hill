
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResume = async (resumeText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following resume text and provide a JSON response with a short summary and a 'fitScore' from 0-100 based on a general technical role. Resume: ${resumeText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            fitScore: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
          },
          required: ["summary", "fitScore", "feedback"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return {
      summary: "Manual review required.",
      fitScore: 50,
      feedback: "We are currently experiencing high traffic. Our team will review your resume shortly."
    };
  }
};
