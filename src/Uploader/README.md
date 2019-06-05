The uploader element is used to upload files to the platform, usually data files, but can also be used for other file types depending on the context of the feature.

### Initial state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"
;<Uploader currentState="initial" />
```

### Drag-over state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"
;<Uploader currentState="dragOver" onMouseUp={console.log}/>
```

### Uploading state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"
;<Uploader currentState="uploading"/>
```

### Completed state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"
;<Uploader currentState="completed" />
```

### Error state

```jsx
import * as React from "react"
import { Uploader } from "@operational/components"
;<Uploader currentState="error" clickHandler={console.log}/>
```
