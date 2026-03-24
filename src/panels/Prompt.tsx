import { useState } from "react"
import { type PromptInputProps } from "../types"
import { type FormEvent } from "react"
import { Logo } from "../components/Logo"

const EXAMPLE_PROMPTS = [
  'A dark pricing card with monthly/annual toggle',
  'A user profile card with avatar and social links',
  'A notification toast with progress bar',
  'A login form with email and password',
  'A testimonial card with star ratings',
  'A stats dashboard card with charts',
];

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

  const handleChipClick = (prompt: string) => {
    setPrompt(prompt)
    if (!isLoading) onGenerate(prompt)
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
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <textarea
            rows={7}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            placeholder="Describe your component..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="w-full py-2.5 text-sm font-medium text-teal-300 bg-linear-to-r from-teal-700 to-emerald-700 rounded-lg hover:from-teal-600 hover:to-emerald-600 hover:text-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-99"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              'Generate Component'
            )}
          </button>
        </form>

        {/* Example Chips */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Try an example:</p>
          <div className="flex flex-col gap-1.5">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleChipClick(prompt)}
                disabled={isLoading}
                className="text-left text-xs px-3 py-2 bg-teal-900/25 text-teal-600 rounded-lg border border-teal-600 hover:border-teal-700 hover:text-teal-200 disabled:opacity-50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3">
        <p className="text-xs text-teal-900">Key stored locally in browser only</p>
      </div>
    </aside >
  )
}
