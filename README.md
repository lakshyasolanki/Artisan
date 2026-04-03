# 🎨 Artisan

![Artisan](./public/artisan.png)

Artisan is an AI-powered component generator that transforms your text prompts into beautiful, functional React components in seconds. Built with React, TypeScript, and powered by Google's Gemini AI.

---

### 💡 What I Learnt From This Project
>
> Key learning while building Artisan at this point for me are:
>
>- Learnt managing client side code.
>- A look at the domain of applied-ai/generative-ai.
>- Use firebase first time.

---

### 🚀 Features

- **AI Generation**: Type any component idea (e.g., "A modern pricing table") and watch Gemini generate the code instantly.
- **Live Preview**: See your component rendered in real-time inside a sandboxed environment.
- **Code Access**: Switch to the Code tab to see exactly what the AI wrote, with full syntax highlighting.
- **One-Click Copy**: Quickly copy the generated JSX to use in your own projects.
- **Personal Gallery**: Save your favorite creations to a permanent gallery backed by Firebase.
- **Smart Thumbnails**: A visual gallery with crisp, scaled-down previews of every saved component.

---

### 🏗️ System Design & Dataflow

The app follows a clean, linear flow from an idea to a saved asset:

1. **Input Phase**: The user provides a prompt and an optional theme in the **Prompt Panel**.
2. **AI Engine**: The prompt is sent to the **Gemini API**. It processes the request and returns a string containing pure JSX code.
3. **Rendering Phase**:
    - The raw code is "cleaned" (removing markdown blocks).
    - It is injected into a sandboxed `<iframe>` using a custom-built `srcDoc`.
    - Inside the iframe, **Babel** and **Tailwind CSS** (via CDN) transform the JSX into a visual UI on the fly.
4. **Persistence**:
    - When the user clicks **Save**, the code, prompt, and a generated title are sent to **Firebase Firestore**.
    - The **Gallery Panel** listens for updates and displays the saved components using a smart scaling technique to ensure every preview looks like a desktop component.

---

### 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI**: Google Gemini Pro API (`@google/generative-ai`)
- **Backend**: Firebase Firestore
- **Bundler**: Vite

---

### ⚙️ Setup

To run Artisan locally, you need a `.env` file in the **root** directory with the following keys:

```env
VITE_GEMINI_API_KEY=your_gemini_key

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```
