### Simple avatar with name (initial only)
```jsx
const Avatar = require("./Avatar").default;
<Avatar name="Franklin Green" />
```

### Show full name next to the avatar circle
```jsx
const Avatar = require("./Avatar").default;
<Avatar showName name="Franklin Green" />
```

### Color the avatar circle with a custom or named color
```jsx
const Avatar = require("./Avatar").default;
<Avatar showName color="#142222" name="Franklin Green" />
```

### Automatically assign colors that are deterministic by name
```jsx
const Avatar = require("./Avatar").default;
<Avatar showName assignColor name="Franklin Green" />
```

### Display a photo instead of solid colors. This will automatically hide the initials
```jsx
const Avatar = require("./Avatar").default;
<Avatar photo="http://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
```

### Should be also beautifull on a dark background
```jsx
const Avatar = require("./Avatar").default;

<div style={{backgroundColor: "#333333", padding: 10}}>
  <Avatar photo="http://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
</div>
```
