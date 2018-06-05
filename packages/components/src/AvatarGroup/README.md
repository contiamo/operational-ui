### Display a group of avatars. This will ignore the `showName` attribute
```jsx
<AvatarGroup>
    <Avatar name="Franklin Green" />
    <Avatar name="Franklin Green" />
</AvatarGroup>
```

### Use the shorter API
```jsx
const avatars = [
    {name: "Peter Pan", photo: "http://www.robots-and-dragons.de/sites/default/files/field/image/preview/disney-peter_pan.jpg"},
    {name: "Wendy Darling"},
    {name: "John Darling"},
    {name: "Micheal Darling"},
    {name: "George Darling"},
    {name: "Tiger Lily"},
    {name: "Tinker Bell"},
    {name: "The Crocodile"},
    {name: "Captain Hook"},
    {name: "Mr. Smee"},
];

<AvatarGroup avatars={avatars}/>
```
