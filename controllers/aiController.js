import { GoogleGenerativeAI } from "@google/generative-ai";
import { appConfig } from "../config/appConfig.js";

const genAI = new GoogleGenerativeAI(appConfig.googleApiKey);

export const aiController = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      response: result.response.text(),
    });
  } catch (error) {
    console.error("Error from Gemini API:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
