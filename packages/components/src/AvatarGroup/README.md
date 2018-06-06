### Display a group of avatars
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

<>
    <AvatarGroup avatars={avatars.slice(0, 3)} />
    <AvatarGroup avatars={avatars.slice(0, 4)} />
    <AvatarGroup avatars={avatars.slice(0, 5)} />
    <AvatarGroup avatars={avatars} />
</>
```

### Provide a custom onMoreClick action
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

<>
    <AvatarGroup avatars={avatars} onMoreClick={() => alert("onMore was clicked!")}/>
</>
```

### Customize how many avatars is on screen
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

<>
    <AvatarGroup avatars={avatars} maximumToDisplay={2} />
    <AvatarGroup avatars={avatars} maximumToDisplay={5} />
    <AvatarGroup avatars={avatars} maximumToDisplay={8} />
</>
```

### Should also works with the old API
```jsx
const Avatar = require("../Avatar/Avatar").default;

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

<AvatarGroup>
    {avatars.map(({name, photo}) => <Avatar name={name} photo={photo} />)}
</AvatarGroup>
```