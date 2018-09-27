This component renders a navigable list.

## Usage

```jsx
<List
  items={goToStep => [
    {
      photo: "https://placehold.it/140x60",
      description: "We will ask you to authenticate yourself with OAuth.",
      onClick: () => goToStep("next"),
    },
    {
      photo: "https://placehold.it/140x60",
      description: "We will ask you to authenticate yourself with OAuth.",
      onClick: () => alert("You chose the second item!"),
    },
    {
      title: "Manual Setup",
      photo: "https://placehold.it/140x60",
      description: "Provide the URL to any accessible git repository and set up the required keys for access.",
      onClick: () => alert("You chose the third item!"),
    },
  ]}
/>
```
