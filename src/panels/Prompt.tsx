import { useState } from "react"
import { type PromptInputProps } from "../types"
import { type FormEvent } from "react"
import { Logo } from "../components/Logo"
import { getRandomPrompts } from "../utils/egPromptChips"

export const PromptPanel = ({
  apiKey,
  onApiKeySave,
  onGenerate,
  isLoading
}: PromptInputProps) => {
  const [hide, setHide] = useState(false)
  const [key, setKey] = useState(apiKey)
  const [prompt, setPrompt] = useState('')
  const [theme, setTheme] = useState('dark')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return
    onGenerate(prompt.trim(), theme);
  }

  const handleChipClick = (prompt: string) => {
    setPrompt(prompt)
    if (!isLoading) onGenerate(prompt, theme)
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
            className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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

      {/* Example Chips */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <p className="text-xs text-gray-500 mb-2">Try an example:</p>
        <div className="flex flex-col gap-1.5">
          {getRandomPrompts(7).map((prompt) => (
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

      {/* Prompt Input */}
      <form
        onSubmit={handleSubmit}
        className="m-1 border border-gray-700 bg-black/80 rounded-lg space-y-3"
      >
        <textarea
          rows={5}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Describe your component..."
          className="w-full border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-300 placeholder-gray-500 resize-none focus:outline-none"
        />
        <div className="p-1 flex items-center justify-between">
          <select
            name="theme"
            defaultValue='dark'
            className="text-xs text-gray-400"
            onChange={(e) => setTheme(e.target.value)}
          >
            <optgroup label="Modes" className="bg-gray-900">                                                                                                                                    │
              <option value='dark'>Dark Mode</option>                                                                                                                                           │
              <option value='light'>Light Mode</option>                                                                                                                                         │
            </optgroup>                                                                                                                                                                         │
            <optgroup label="Safe Styles" className="bg-gray-900">                                                                                                                              │
              <option value='modern'>Modern Clean</option>                                                                                                                                      │
              <option value='corporate'>Corporate Blue</option>                                                                                                                                 │
              <option value='minimalist'>Minimalist</option>                                                                                                                                    │
              <option value='high-contrast'>High Contrast</option>                                                                                                                              │
              <option value='soft-pastel'>Soft Pastel</option>                                                                                                                                  │
              <option value='monochrome'>Monochrome</option>                                                                                                                                    │
            </optgroup>                                                                                                                                                                         │
          </select>
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="p-1 px-2 text-xs font-medium text-teal-400 bg-teal-600/75 rounded-full hover:bg-teal-800 transition-colors active:scale-98"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="size-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
              </span>
            ) : (
              '↑'
            )}
          </button>
        </div>
      </form>
    </aside >
  )
}
