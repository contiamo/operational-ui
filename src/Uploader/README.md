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
  position: "relative",
  top: "50%",
  transform: "translate(0, -50%)",
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
  position: "relative",
  top: "50%",
  transform: "translate(0, -50%)",
}))

const MyComponent = () => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [isFileListOpen, setIsFileListOpen] = React.useState(false)

  React.useEffect(() => {
    const dragListener = () => setIsDragging(true)
    const dragEndListener = () => setIsDragging(false)

    document.addEventListener("drag", dragListener)
    document.addEventListener("dragend", dragEndListener)

    return () => {
      document.removeEventListener("drag", dragListener)
      document.removeEventListener("dragend", dragListener)
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
  textAlign: "center",
  position: "relative",
  top: "50%",
  transform: "translate(0, -50%)",
  "& div": {
    display: "inline-flex",
  },
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
  position: "relative",
  top: "50%",
  transform: "translate(0, -50%)",
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
  position: "relative",
  top: "50%",
  transform: "translate(0, -50%)",
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
