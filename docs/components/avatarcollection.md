# AvatarCollection

An avatar collection represents an group of identities in an Operational User Interface.

## Example ([Live Demo](https://operational-ui.js.org/#avatar%20collections))

![Example](https://user-images.githubusercontent.com/9947422/39761579-c7afe1dc-52d8-11e8-9738-d32de9df734f.png)

## Usage

This component accepts one prop of type `Person[]` that can be represented with the following interface/schema/shape:

```ts
interface Person {
  name: string;
  photo?: string;
}
```

If the `photo` is empty, the initials are used, similar to [`Avatar`](https://github.com/contiamo/operational-ui/blob/master/docs/components/avatar.md).

### Usage Example

```jsx
<AvatarCollection
  people={[
    { name: "Peter Szerzo" },
    { name: "Tejas Kumar", photo: "https://tej.as/selfie.png" }
  ]}
/>
```

## Props

| Name   | Description                                           | Type     | Default | Required |
| :----- | :---------------------------------------------------- | :------- | :------ | :------- |
| people | A collection of `Person`s, each with a name and photo | Person[] | null    | Yes      |
| size   | A size, in pixels, of the avatar                      | number   | 32      | No       |
