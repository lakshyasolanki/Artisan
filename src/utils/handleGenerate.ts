import { GoogleGenerativeAI } from "@google/generative-ai";
import { type GenerationState } from "../types";

const extractTitle = (prompt: string): string => {
  const words = prompt.split(/\s+/).slice(0, 6).join(' ');
  return words.length > 50 ? words.slice(0, 50) + '...' : words;
};
// strip markdown fences and import/export lines from ai response
const cleanGeneratedCode = (raw: string): string => {
  let code = raw.trim();
  // remove markdown code fences like ```jsx ... ```
  code = code.replace(/^```(?:jsx|tsx|javascript|typescript)?\s*\n?/i, '');
  code = code.replace(/\n?```\s*$/i, '');
  // remove import/export lines
  code = code.replace(/^import\s+.*;\s*\n?/gm, '');
  code = code.replace(/^export\s+(default\s+)?/gm, '');
  // remove function/const component wrappers if AI wraps in a component definition
  const fnMatch = code.match(/(?:function|const)\s+\w+\s*(?:=\s*)?(?:\([^)]*\)\s*(?:=>)?\s*)?[({]\s*\n?\s*return\s*\(\s*\n?([\s\S]*?)\n?\s*\)\s*;?\s*\n?\s*[})]\s*;?\s*$/);
  if (fnMatch?.[1]) {
    code = fnMatch[1].trim();
  }
  return code.trim();
};

const sysPromptWithTheme = (theme: string) => {
  return `Return only raw JSX for a single React component. Make sure the component is in ${theme} theme. No imports, no exports, no function wrapper, no explanations, no markdown code fences. Use only Tailwind CSS classes for styling. The JSX should be a single root element. Use realistic placeholder content.`
}

async function handleGenerate(
  apiKey: string,
  setGenerationState: ({ }: GenerationState) => void,
  prompt: string,
  theme: string
) {
  if (!apiKey) return;
  setGenerationState({ status: "loading" });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = sysPromptWithTheme(theme)
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{
            text: `${systemPrompt}\n\n User request: ${prompt}`
          }]
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 5000,
      },
    });

    const raw = result.response.text();
    const code = cleanGeneratedCode(raw)

    if (!code) {
      setGenerationState({ status: "error", message: "No code was generated. Try a different prompt." })
      return
    }

    setGenerationState({ status: 'success', code, prompt });
    console.log(code)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Generation Failed'
    console.log(message)
    setGenerationState({ status: 'error', message })
  }
}

export default handleGenerate;
