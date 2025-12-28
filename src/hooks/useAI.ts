
import { useState } from 'react';
import { aiSmartFill, aiPriceInsight, aiDescriptionAssistant } from '../services/aiService';

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const analyzeProduct = async (image: string, title?: string) => {
    setIsProcessing(true);
    try {
      const result = await aiSmartFill(image, title);
      return result;
    } catch (error) {
      console.error("AI Analysis failed", error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const suggestDescription = async (details: any) => {
    setIsProcessing(true);
    try {
      const result = await aiDescriptionAssistant(details);
      return result.description;
    } catch (error) {
      return "";
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, analyzeProduct, suggestDescription };
};
