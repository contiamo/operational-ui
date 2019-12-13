import React, { useState, Suspense } from "react"
import Preview from "react-styleguidist/lib/client/rsg-components/Preview/Preview"

import { styled, Button, NoIcon, PlayIcon, ResourceName, Code, Spinner } from "../src"
import ShinyMessage from "./ShinyMessage"
import OperationalDocsErrorBoundary from "./ErrorBoundary"
import { bootstrapMonaco } from "./bootstrapMonaco"

const MonacoEditor = React.lazy(async () => {
  await bootstrapMonaco()
  return import("./MonacoEditor")
})

const PlayButton = styled(Button)`
  margin-top: ${({ theme }) => theme.space.small}px;
  margin-bottom: ${({ theme }) => theme.space.element}px;
`

const Playground: React.FC<{
  code: string
  evalInContext: () => {}
  index: number
  name: string
  exampleMode: string
  settings: object
}> = ({ code: inputCode, evalInContext }) => {
  const [code, setCode] = useState(inputCode)
  const [isPlaying, setIsPlaying] = useState(false)

  // If it's a JSX/TSX snippet,
  // Show a smart example
  return (
    <>
      <OperationalDocsErrorBoundary key={code}>
        <Preview code={code} evalInContext={evalInContext} />
      </OperationalDocsErrorBoundary>
      <PlayButton
        icon={isPlaying ? NoIcon : PlayIcon}
        textColor={isPlaying ? "error" : undefined}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Close" : "View Code"}
      </PlayButton>
      {isPlaying && (
        <>
          <ShinyMessage
            title="Self-Documentation"
            type="info"
            body={
              <>
                ✨ Press <ResourceName>alt + Space</ResourceName> inside a{" "}
                <ResourceName>&lt;Component /&gt;</ResourceName> for available props and documentation.
              </>
            }
          />

          <Suspense fallback={<Spinner />}>
            <MonacoEditor component={"component"} code={code} onChange={setCode} />
          </Suspense>
        </>
      )}
    </>
  )
}

export default Playground
