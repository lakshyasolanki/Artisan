import z from "zod";

export const ComponentResponseSchema = z.object({
  title: z.string().describe('A short descriptive title for the component (3-6 words)'),
  code: z.string().describe('Raw JSX code for the component. Single root element. Use Tailwind CSS classes. No imports, exports, or function wrappers.'),
});

