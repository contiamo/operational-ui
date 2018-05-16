### Simple avatar with name (initial only)
```js
<OperationalUI withBaseStyles>
    <Avatar name="Franklin Green" />
</OperationalUI>
```

### Show full name next to the avatar circle
```js
<OperationalUI withBaseStyles>
    <Avatar showName name="Franklin Green" />
</OperationalUI>
```

### Color the avatar circle with a custom or named color
```js
<OperationalUI withBaseStyles>
    <Avatar showName color="#142222" name="Franklin Green" />
</OperationalUI>
```

### Automatically assign colors that are deterministic by name
```js
<OperationalUI withBaseStyles>
    <Avatar showName assignColor name="Franklin Green" />
</OperationalUI>
```

### Display a photo instead of solid colors. This will automatically hide the initials
```js
<OperationalUI withBaseStyles>
    <Avatar photo="http://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
</OperationalUI>
```

### Display a group of avatars. This will ignore the `showName` attribute
```js
const AvatarGroup = require("../AvatarGroup").default;

<OperationalUI withBaseStyles>
    <AvatarGroup>
        <Avatar name="Franklin Green" />
        <Avatar name="Franklin Green" />
    </AvatarGroup>
</OperationalUI>
```