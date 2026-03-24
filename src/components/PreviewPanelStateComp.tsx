export const IdlePlaceholder = () => {
  return (
    <div>
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p>Describe a component to see a live preview</p>
      <p>Your generated UI will appear here</p>
    </div>
  )
}

export const LoadingState = () => {
  return (
    <div>
      <div className="size-10 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
      <div>
        <p>Generating Component...</p>
        <p>This usually takes a few seconds</p>
      </div>
    </div>
  )
}

export const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="text-center max-w-sm">
      <div className="size-10 mx-auto mb-3">
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p>{message}</p>
      <p>Try a different prompt or check your API key</p>
    </div>
  )
}

