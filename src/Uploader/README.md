The uploader element is used to upload files to the platform, usually data files, but can also be used for other file types depending on the context of the feature.

The contents displayed by the Uploader are fully determined by the user.

### Initial

```jsx
import * as React from "react"
import { Uploader, styled } from "@operational/components"

const InitialContentContainer = styled("div")(({ theme }) => ({
  lineHeight: "18px",
  "& label": {
    color: theme.color.primary,
    fontWeight: theme.font.weight.bold,
    cursor: "pointer",
  },
  "& input": {
    display: "none",
  },
}))

;<Uploader>
  <InitialContentContainer>
    Drop your file here
    <br />
    or
    <br />
    <label htmlFor="browse">browse files</label>
    <input onChange={console.log} id="browse" type="file" />
  </InitialContentContainer>
</Uploader>
```

### Drag-over state

```jsx
import * as React from "react"
import { Uploader, styled } from "@operational/components"

const DragOverContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.primary,
}))

;<Uploader dragging onMouseUp={console.log}>
  <DragOverContentContainer>Drop your file here</DragOverContentContainer>
</Uploader>
```

### Uploading state

```jsx
import * as React from "react"
import { Progress, Uploader } from "@operational/components"

const UploadingContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.text.lighter,
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
