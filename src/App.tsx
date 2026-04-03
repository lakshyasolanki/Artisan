import { useEffect, useState } from "react";
import { GalleryPanel } from "./panels/Gallery";
import { PreviewPanel } from "./panels/Preview";
import { PromptPanel } from "./panels/Prompt";
import { type GenerationState, type GalleryState } from "./types";
import handleGenerate from "./utils/handleGenerate";
import { isFirebaseConfigured, listComponent, saveComponent } from "./libs/firebase";


const App = () => {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("gemini_api_key") ?? ''
  })
  const [generationState, setGenerationState] = useState<GenerationState>({ status: "idle" })
  const [isSaving, setSaving] = useState(false)
  const [galleryState, setGalleryState] = useState<GalleryState>({ status: "idle" })
  useEffect(() => {
    fetchGallery()
  }, [])

  const onGenerate = (prompt: string, theme: string) => {
    const history = generationState.status === 'success' ? generationState.history : []

    handleGenerate(apiKey, setGenerationState, prompt, theme, history)
  }

  const handleSave = async () => {
    if (generationState.status !== 'success') return
    if (!isFirebaseConfigured()) return
    setSaving(true)
    try {
      await saveComponent(generationState.prompt, generationState.code, generationState.title);
      await fetchGallery();
    } catch (e) {
      console.error('Failed to save component', e)
    } finally {
      setSaving(false)
    }
  }

  const fetchGallery = async () => {
    if (!isFirebaseConfigured()) return
    setGalleryState({ status: "loading" })
    try {
      const components = await listComponent();
      console.log(components)
      setGalleryState({ status: 'success', components });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load gallery';
      setGalleryState({ status: 'error', message: msg });
    }
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
