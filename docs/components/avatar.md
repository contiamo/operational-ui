# Avatar

An avatar represents an identity in an Operational User Interface.

## Examples ([Live Demo](https://operational-ui.js.org/#avatars))

![Example](https://user-images.githubusercontent.com/9947422/39760796-9dcfd7b6-52d6-11e8-832e-3cdcfe2ddb04.png)

![Example using a `withName` prop](https://user-images.githubusercontent.com/9947422/39761303-0ad863f4-52d8-11e8-9890-041306821200.png)

## Usage

```jsx
<Avatar name="Peter Szerzo" />
<Avatar withName name="Peter Szerzo" />
<Avatar photo="https://tej.as/selfie.png" name="Tejas Kumar" />
```

## Props

| Name     | Description                                         | Type    | Default | Required |
| :------- | :-------------------------------------------------- | :------ | :------ | :------- |
| name     | Name of the person                                  | string  | null    | Yes      |
| withName | Optionally display the full name next to the avatar | boolean | false   | No       |
| photo    | A URL to an image of the person                     | string  | null    | No       |
| size     | A size, in pixels, of the avatar                    | number  | 32      | No       |
