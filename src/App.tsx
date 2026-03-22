import { useState } from "react";
import { GalleryPanel } from "./panels/Gallery";
import { PreviewPanel } from "./panels/Preview";
import { PromptPanel } from "./panels/Prompt";
import { GenerationState } from "./types";
import handleGenerate from "./utils/handleGenerate";
import handleSave from "./utils/handleSave";
import { type GalleryState } from "./types";
import fetchGallery from "./utils/fetchGallery";

function App() {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("gemini_api_key") ?? ''
  })
  const [generationState, setGenerationState] = useState<GenerationState>({ status: "idle" })
  const [isSaving, setSaving] = useState(false)
  const [galleryState, setGalleryState] = useState<GalleryState>({ status: "idle" })

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <PromptPanel
        apiKey={apiKey}
        onApiKeySave={setApiKey}
        isLoading={generationState.status === 'loading'}
        onGenerate={handleGenerate}
      />
      <PreviewPanel
        state={generationState}
        onSave={handleSave}
        isSaving={isSaving}
      />
      <GalleryPanel
        state={galleryState}
        onRefresh={fetchGallery}
      />
    </div>
  )
}

export default App;
