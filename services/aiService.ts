
/**
 * Frontend client for Gemini AI features.
 * Calls a proxy serverless function /api/gemini to avoid exposing API keys.
 */

export type AITask = 'smartFill' | 'priceInsight' | 'description';

interface AIRequest {
  task: AITask;
  payload: any;
}

export const callGeminiAI = async (task: AITask, payload: any) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, payload }),
    });

    if (!response.ok) {
      throw new Error(`AI API failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    throw error;
  }
};

export const aiSmartFill = async (imageData: string, title?: string) => {
  return await callGeminiAI('smartFill', { imageData, title });
};

export const aiPriceInsight = async (price: number, category: string, recentPrices: number[]) => {
  return await callGeminiAI('priceInsight', { price, category, recentPrices });
};

export const aiDescriptionAssistant = async (data: { title: string, price: number, category: string, condition: string }) => {
  return await callGeminiAI('description', data);
};
