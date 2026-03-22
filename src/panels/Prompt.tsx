import { type PromptInputProps } from "../types"
export const PromptPanel = ({
  apiKey,
  onApiKeySave,
  onGenerate,
  isLoading
}: PromptInputProps) => {
  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col h-screen sticky top-0">
      PromptPanel
    </aside>
  )
}
