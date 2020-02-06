### Simple avatar with name (initial only)

```jsx
import * as React from "react"
import { Avatar } from "@operational/components"
;<>
  <Avatar showName name="Franklin Green" />
  <Avatar showName name="Tejas Kumar" />
  <Avatar showName name="Fabien Bernard" />
</>
```

### Simple avatar with name (different sizes)

```jsx
import * as React from "react"
import { Avatar } from "@operational/components"
;<>
  <Avatar showName size="medium" name="Franklin Green" />
  <Avatar showName size="small" name="Tejas Kumar" />
  <Avatar showName size="x-small" name="Fabien Bernard" />
</>
```

### Show full name next to the avatar circle

```jsx
import * as React from "react"
import { Avatar } from "@operational/components"
;<Avatar showName name="Franklin Green" />
```

### Color the avatar circle with a custom or named theme color

```jsx
import * as React from "react"
import { Avatar } from "@operational/components"
;<>
  <Avatar showName color="#002395" name="Franklin Green" />
  <Avatar showName color="#FFFFFF" name="Franklin Green" />
  <Avatar showName color="#ED2939" name="Franklin Green" />
</>
```

### Display a photo instead of solid colors.

This will automatically hide the initials

```jsx
import * as React from "react"
import { Avatar } from "@operational/components"
;<Avatar photo="https://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
```

### Should be also beautiful on a dark background

```jsx
import * as React from "react"
import { Avatar } from "@operational/components"
;<div style={{ backgroundColor: "#333333", padding: 10 }}>
  <Avatar photo="https://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
</div>
```

### Should not shrink with long neighbors

```jsx
import * as React from "react"
import { HeaderMenu, HeaderBar, Avatar, Logo } from "@operational/components"
;<HeaderBar
  logo={<Logo name="Contiamo" />}
  end={
    <HeaderMenu items={[{ label: "Hello" }, { label: "Merci" }]} onClick={() => alert("sup")} withCaret>
      <Avatar showName name="Franklingreenchimichangaroosevelt Aaron Theodore Knettle" />
    </HeaderMenu>
  }
/>
```
