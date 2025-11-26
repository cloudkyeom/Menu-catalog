import dotenv from "dotenv";
import {GoogleGenerativeAI} from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
dotenv.config();
const key = process.env.GEMINI_API_KEY;
let client = null;

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});


if (key) {
  client = new GoogleGenerativeAI(key);
}

async function generateDescription(name, ingredients) {
  if (!client) return null;

  try {
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `bikinin deskripsi menu singkat aja(maks 25 kata)
                    nama: ${name}
                    bahan-bahan: ${Array.isArray(ingredients) ? ingredients.join(', ') : ingredients}`;

    const response = await model.generateContent({ prompt });
    if (response?.response?.text) {
      return response.response.text().trim();
    } else if (response?.candidates && response.candidates[0]) {
      return (response.candidates[0].content || '').trim();
    }
    return null;
  } catch (err) {
    console.error('gemini error:', err.message);
    return null;
  }
}

export default generateDescription;
