import { useState } from "react";
import { GalleryPanel } from "./panels/Gallery";
import { PreviewPanel } from "./panels/Preview";
import { PromptPanel } from "./panels/Prompt";
import { type GenerationState, type GalleryState } from "./types";
import handleGenerate from "./utils/handleGenerate";
import handleSave from "./utils/handleSave";

function App() {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("gemini_api_key") ?? ''
  })
  const [generationState, setGenerationState] = useState<GenerationState>({ status: "idle" })
  const [isSaving, setSaving] = useState(false)
  const [galleryState, setGalleryState] = useState<GalleryState>({ status: "idle" })

  const onGenerate = (prompt: string, theme: string) => {
    handleGenerate(apiKey, setGenerationState, prompt, theme)
  }

  const onSave = () => {

  }

  const onRefresh = () => {

  }

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <PromptPanel
        apiKey={apiKey}
        onApiKeySave={setApiKey}
        isLoading={generationState.status === 'loading'}
        onGenerate={onGenerate}
      />
      <PreviewPanel
        state={generationState}
        onSave={onSave}
        isSaving={isSaving}
      />
      <GalleryPanel
        state={galleryState}
        onRefresh={onRefresh}
      />
    </div>
  )
}

export default App;
