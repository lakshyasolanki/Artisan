import { useState } from "react"
import type { ComponentDocument } from "../types"
import { buildSrcdoc } from "./WebPreview"

export const ComponentsCard = ({ component }: { component: ComponentDocument }) => {
  const [copied, setCopied] = useState(false)

  const srcdoc = buildSrcdoc(component.code)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(component.code)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group rounded-lg border border-gray-800 overflow-hidden hover:border-gray-600 transition-colors cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-3/4 overflow-hidden bg-white">
        <div className="absolute inset-0 origin-top-left w-[400%] h-[400%] scale-[0.25]">
          <iframe
            srcDoc={srcdoc}
            sandbox="allow-scripts"
            title={component.title}
            scrolling="no"
            className="w-full h-full pointer-events-none"
            tabIndex={-1}
          />
        </div>

        {/* Copy Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-colors flex items-center justify-center">
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 text-xs px-2.5 py-1 bg-white text-gray-900 rounded-md font-medium transition-opacity"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        {/* Label */}
        <div className="px-2 py-1.5 bg-gray-900">
          <p className="text-xs text-gray-400 truncate">{component.title}</p>
        </div>
      </div>
    </div>
  )
}
