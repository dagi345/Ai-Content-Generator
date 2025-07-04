// // geminiApi.ts
// import { GoogleGenAI } from '@google/genai';

// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_GEMINI_API_KEY,
// });

// const config = {
//   thinkingConfig: {
//     thinkingBudget: -1,
//   },
//   responseMimeType: 'text/plain',
// };

// const model = 'gemini-2.5-pro';

// // ✅ This function accepts `promptText` from outside
// export async function generateContentStream(promptText: string) {
//   const contents = [
//     {
//       role: 'user',
//       parts: [{ text: promptText }],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });

//   return response;
// }
