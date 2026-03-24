import { useState } from "react";

export const TabButton = ({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (

    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors
              ${active ? 'bg-gray-800 text-while' : 'text-gray-500 hover:text-gray-300'}`}
    >
      {children}
    </button>
  )
}

export const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:text-white"
    >
      {copied ? 'Copied' : 'Copy Code'}
    </button>
  )
}
