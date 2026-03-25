import { Highlight, themes } from "prism-react-renderer"

export const CodeBlock = ({ code }: { code: string }) => {
  return (
    <div className="w-full max-w-4xl max-h-full overflow-auto rounded-xl border border-gray-800">
      <Highlight language="jsx" code={code} theme={themes.nightOwl}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={{ ...style, margin: 0, padding: '16px', fontSize: '12px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-right mr-4 text-gray-600 select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
