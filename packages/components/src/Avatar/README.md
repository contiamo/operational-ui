### Simple avatar with name (initial only)
```jsx
<Avatar name="Franklin Green" />
```

### Show full name next to the avatar circle
```jsx
<Avatar showName name="Franklin Green" />
```

### Color the avatar circle with a custom or named color
```jsx
<Avatar showName color="#142222" name="Franklin Green" />
```

### Automatically assign colors that are deterministic by name
```jsx
<Avatar showName assignColor name="Franklin Green" />
```

### Display a photo instead of solid colors. This will automatically hide the initials
```jsx
<Avatar photo="http://thecatapi.com/api/images/get?format=src&size=small" name="Franklin Green" />
```
