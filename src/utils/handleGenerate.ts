import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { type GenerationState, type Message } from "../types";
import { ComponentResponseSchema } from "../validation.ts";

const componentSchema = {
  type: SchemaType.OBJECT as const,
  properties: {
    title: {
      type: SchemaType.STRING as const,
      description: 'A short descriptive title for the component (3-6 words)',
    },
    code: {
      type: SchemaType.STRING as const,
      description: 'Raw JSX code for the component. Single root element. Use Tailwind CSS classes. No imports, exports, or function wrappers.',
    },
  },
  required: ['title', 'code'],
};

const sysPromptWithTheme = (theme: string) => {
  return `You are a React component generator. When given a description, generate a single React component using JSX and Tailwind CSS classes. Always return the FULL updated JSX code for the component, even if only a small change was
  requested. The code should be raw JSX (a single root element), with no imports, no exports, and no function wrapper. Use realistic placeholder content. Make sure the component is in ${theme} theme.`
}

async function handleGenerate(
  apiKey: string,
  setGenerationState: (state: GenerationState) => void,
  prompt: string,
  theme: string,
  history: Message[] = []
) {
  if (!apiKey) return;
  setGenerationState({ status: "loading" });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: sysPromptWithTheme(theme)
    });

    //Initialize the chat with the history passed in,
    const chat = model.startChat({
      history: history, //this is the 'memory'
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 5000,
        responseMimeType: "application/json",
        responseSchema: componentSchema
      }
    })

    //Send new prompt through a chat session
    const result = await chat.sendMessage(`User request: ${prompt}`)
    const response = result.response;
    const raw = response.text();

    const parsed = ComponentResponseSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) {
      setGenerationState({ status: 'error', message: `AI returned invalid data format ${parsed.error.issues}` })
      return
    }

    //Update the history list
    const updatedHistory: Message[] = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] },
      { role: 'model', parts: [{ text: raw }] }
    ]
    setGenerationState({
      status: 'success',
      code: parsed.data.code,
      prompt,
      title: parsed.data.title,
      history: updatedHistory
    });
  } catch (e) {
    if (e instanceof SyntaxError) {
      setGenerationState({ status: 'error', message: 'AI returned invalid response. Try again.' });
      return;
    }
    const message = e instanceof Error ? e.message : 'Generation Failed'
    console.log(message)
    setGenerationState({ status: 'error', message })
  }
}

export default handleGenerate;
