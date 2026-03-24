import { useState } from "react"
import { ErrorState, IdlePlaceholder, LoadingState } from "../components/PreviewPanelComponents"
import { type PreviewPanelProps } from "../types"
import { preview } from "vite"
import { WebPreview } from "../components/WebPreview"
import { CodeBlock } from "../components/CodeBlock"

export const PreviewPanel = ({
  state,
  onSave,
  isSaving,
}: PreviewPanelProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-950/50 p-6 overflow-auto">
        {state.status === 'idle' && <IdlePlaceholder />}
        {state.status === 'loading' && <LoadingState />}
        {state.status === 'error' && <ErrorState message={state.message} />}
        {state.status === 'success' && (
          activeTab === 'preview' ?
            <WebPreview code="" /> :
            <CodeBlock code="" />
        )}
      </div>
    </div>
  )
}
