import { model } from "../utils/GeminiApi.js";
export const askGemini = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({
      success: true,
      jawaban: text
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err_message: err.message
    });
  }
};
