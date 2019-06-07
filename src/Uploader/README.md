The uploader element is used to upload files to the platform, usually data files, but can also be used for other file types depending on the context of the feature.

The contents displayed by the Uploader are fully determined by the user.

### Initial with drag-over effect

Drag a file to see the effect.

```jsx
import * as React from "react"
import { Uploader, styled } from "@operational/components"

const InitialContentContainer = styled("div")(({ theme }) => ({
  lineHeight: "18px",
  textAlign: "center",
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  "& label": {
    color: theme.color.primary,
    fontWeight: theme.font.weight.bold,
    cursor: "pointer",
  },
  "& input": {
    display: "none",
  },
}))

const DragOverContentContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
}))

const MyComponent = () => {
  const [isDragging, setIsDragging] = React.useState(false)
  // Target is cached when dragenter is fired.
  // When dragleave is fired, if the event target is the same as the cached target,
  // this means the file has been dragged outside the browser.
  const cachedTarget = React.useRef(null)

  React.useEffect(() => {
    const dragEnterListener = e => {
      cachedTarget.current = e.target
    }

    const dragLeaveListener = e => {
      if (e.target === cachedTarget.current) {
        setIsDragging(false)
      }
    }

    const dragDropListener = e => {
      e.preventDefault()
      setIsDragging(false)
    }
    const dragOverListener = e => {
      e.preventDefault()
      setIsDragging(true)
    }

    document.addEventListener("dragenter", dragEnterListener)
    document.addEventListener("dragleave", dragLeaveListener)
    document.addEventListener("dragover", dragOverListener)
    document.addEventListener("drop", dragDropListener)

    return () => {
      document.removeEventListener("dragenter", dragEnterListener)
      document.removeEventListener("dragleave", dragLeaveListener)
      document.removeEventListener("dragover", dragOverListener)
      document.removeEventListener("drop", dragDropListener)
    }
  }, [])

  return (
    <Uploader dragActive={isDragging}>
      {isDragging ? (
        <DragOverContentContainer>Drop your file here</DragOverContentContainer>
      ) : (
        <InitialContentContainer>
          Drop your file here
          <br />
          or
          <br />
          <label htmlFor="browse">browse files</label>
          <input id="browse" type="file" />
        </InitialContentContainer>
      )}
    </Uploader>
  )
}

;<MyComponent />
```

### Uploading state

```jsx
import * as React from "react"
import { Progress, Uploader } from "@operational/components"

const UploadingContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.text.lighter,
  alignItems: "center",
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
}))

;<Uploader>
  <UploadingContentContainer>
    <Progress inline width={196} />
    <p>Uploading...</p>
  </UploadingContentContainer>
</Uploader>
```

### Completed state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"

const CompletedContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.primary,
  fontWeight: theme.font.weight.bold,
  textAlign: "center",
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
}))

;<Uploader>
  <CompletedContentContainer>Completed</CompletedContentContainer>
</Uploader>
```

### Error state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"

const ErrorContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.error,
  lineHeight: "22px",
  textAlign: "center",
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  "& span": {
    color: theme.color.primary,
    fontWeight: theme.font.weight.bold,
    cursor: "pointer",
  },
}))

;<Uploader>
  <ErrorContentContainer>
    Upload failed
    <br />
    <span onClick={console.log}>Try again</span>
  </ErrorContentContainer>
</Uploader>
```
