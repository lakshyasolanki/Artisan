import { GalleryPanel } from "./panels/Gallery";
import { PreviewPanel } from "./panels/Preview";
import { PromptPanel } from "./panels/Prompt";

function App() {
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <PromptPanel />
      <PreviewPanel />
      <GalleryPanel />
    </div>
  )
}

export default App;
