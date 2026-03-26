import { ComponentsCard } from "../components/ComponentCard"
import { type GalleryGridProps } from "../types"

export const GalleryPanel = ({
  state,
  onRefresh
}: GalleryGridProps) => {
  return (
    <aside className="w-50 bg-linear-180 from-black via-black/2 to-teal-700 border-l border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="px-3 py-3 border-b border-gray-800 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-300">Saved Components</span>
        <button
          onClick={onRefresh}
          className="text-xs text-gray-500 hover:text-white disabled:opacity-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {state.status === 'idle' || state.status === 'loading'
          ? (Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="aspect-3/4 bg-teal-950/35 rounded-lg animate-pulse" />
          )))
          : (state.status === 'error'
            ? (<div>
              <p>{state.message}</p>
              <button
                onClick={onRefresh}
              >
                Retry
              </button>
            </div>
            )
            : (state.components.length === 0
              ? (<div>
                <p>No saved components</p>
                <p>Generate and save components</p>
              </div>
              )
              : (state.components.map((comp) => (
                <ComponentsCard key={comp.id} component={comp} />
              )))
            ))}
      </div>
    </aside>
  )
}
