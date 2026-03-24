import { useState } from "react"
import { type PromptInputProps } from "../types"
import { type FormEvent } from "react"
import { Logo } from "../components/Logo"

export const PromptPanel = ({
  apiKey,
  onApiKeySave,
  onGenerate,
  isLoading
}: PromptInputProps) => {
  const [hide, setHide] = useState(false)
  const [key, setKey] = useState(apiKey)
  const [prompt, setPrompt] = useState('')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return
    onGenerate(prompt.trim());
  }

  return (
    <aside className="w-72 bg-linear-180 from-black via-black/2 to-teal-700 border-r-teal-600 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-800">
        <Logo />
      </div>

      {/* Api Key */}
      <div className="px-4 py-3 border-b border-gray-800">
        <label className="block text-xs font-medium text-gray-400 mb-1.5">Gemini API Key</label>
        <div className="flex gap-1.5">
          <input
            type={hide ? "password" : "text"}
            onChange={(e) => setKey(e.target.value)}
            value={key}
            placeholder="AIza..."
            className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
          <button
            onClick={() => setHide(!hide)}
            className="px-2 py-1.5 text-xs text-gray-400 bg-gray-800 border border-gray-700 rounded-lg hover:text-white transition-colors"
          >
            {hide ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => {
              localStorage.setItem('gemini_api_key', key)
              onApiKeySave(key)
            }}
            className="px-2.5 py-1.5 text-xs font-medium text-teal-400 bg-teal-600/75 rounded-lg hover:bg-teal-800 transition-colors active:scale-98"
          >
            Save
          </button>
        </div>
      </div>

      {/* Prompt Input */}
      <div>

      </div>

      {/* Example Chips */}

      {/* Footer */}
    </aside >
  )
}
