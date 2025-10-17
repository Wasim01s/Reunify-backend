import { GoogleGenerativeAI } from "@google/generative-ai";
import { appConfig } from "../config/appConfig.js";

const genAI = new GoogleGenerativeAI(appConfig.apiKey);

export const aiController = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    res.status(200).json({ message: aiResponse });
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
