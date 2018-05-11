# Avatar

An avatar represents an identity in an Operational User Interface.

## Examples ([Live Demo](https://operational-ui.js.org/#avatars))

![Example](https://user-images.githubusercontent.com/9947422/39760796-9dcfd7b6-52d6-11e8-832e-3cdcfe2ddb04.png)

![Example using a `showName` prop](https://user-images.githubusercontent.com/9947422/39761303-0ad863f4-52d8-11e8-9890-041306821200.png)

## Usage

```jsx
// Simple avatar with name (initials only)
<Avatar name="Franklin Green" />

// Show full name next to the avatar circle
<Avatar showName name="Franklin Green" />

// Color the avatar circle with a custom or named color
<Avatar showName color="#142222" name="Franklin Green" />

// Automatically assign colors that are deterministic by name
<Avatar showName assignColor name="Franklin Green" />

// Display a photo instead of solid colors. This will automatically hide the initials
<Avatar photo="https://tej.as/selfie.png" name="Franklin Green" />

// Display a group of avatars. This will ignore the `showName` attribute
<AvatarGroup>
  <Avatar name="Franklin Green" />
  <Avatar name="Franklin Green" />
</AvatarGroup>
```

## Props

| Name        | Description                                                                 | Type    | Default | Required |
| :---------- | :-------------------------------------------------------------------------- | :------ | :------ | :------- |
| name        | Name of the person                                                          | string  | null    | Yes      |
| title       | Title of the person                                                         | string  | null    | No       |
| showName    | Optionally display the full name next to the avatar                         | boolean | false   | No       |
| color       | Color assigned to the avatar circle.                                        | string  | null    | No       |
| assignColor | Automatically assign a deterministic color. Invalidates `color` assignment. | boolean | false   | No       |
| photo       | A URL to an image of the person                                             | string  | null    | No       |
