import { useState } from "react"
import { ErrorState, IdlePlaceholder, LoadingState } from "../components/PreviewPanelStateComp"
import { type PreviewPanelProps } from "../types"
import { WebPreview } from "../components/WebPreview"
import { CodeBlock } from "../components/CodeBlock"
import { CopyButton, TabButton } from "../components/TabNCopyBtn"

export const PreviewPanel = ({
  state,
  onSave,
  isSaving,
}: PreviewPanelProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 ">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <TabButton
              active={activeTab === 'preview'}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </TabButton>
            <TabButton
              active={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
            >
              Code
            </TabButton>
          </div>
          {state.status === 'success' && (
            <span className="text-xs text-gray-500 border-l border-gray-700 pl-3">
              Live render
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {state.status === 'success' && (
            <>
              <CopyButton code={state.code} />
              <button
                onClick={onSave}
                disabled={isSaving}
                className="text-xs px-3 py-1.5 font-medium text-teal-400 bg-teal-600/75 rounded-lg hover:bg-teal-800  active:scale-98  disabled:opacity-50 transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-950/50 p-6 overflow-auto">
        {state.status === 'idle' && <IdlePlaceholder />}
        {state.status === 'loading' && <LoadingState />}
        {state.status === 'error' && <ErrorState message={state.message} />}
        {state.status === 'success' && (
          activeTab === 'preview' ?
            <WebPreview code={state.code} /> :
            <CodeBlock code={state.code} />
        )}
      </div>
    </div>
  )
}
