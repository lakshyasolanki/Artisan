//firestore document model for saved components
export interface ComponentDocument {
  id: string;
  prompt: string;
  code: string;
  title: string;
  createdAt: number
}

//ai generation state
export type GenerationState =
  { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; code: string; prompt: string }
  | { status: 'error'; message: string };

//gallery fetch state
export type GalleryState =
  { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; components: ComponentDocument[] }
  | { status: 'error'; message: string };

//Component Props
export interface PromptInputProps {
  apiKey: string;
  onApiKeySave: (key: string) => void;
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export interface PreviewPanelProps {
  state: GenerationState;
  onSave: () => void;
  isSaving: boolean;
}

export interface GalleryGridProps {
  state: GalleryState;
  onRefresh: () => void;
}
