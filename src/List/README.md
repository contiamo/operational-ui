This component renders a navigable list.

## Usage

```jsx
<List
  items={[
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

## With Icon

```jsx
<List
  items={[
    {
      photo: <Logo color="black" name="Pantheon" />,
      description:
        "Pantheon is a data hub that integrates with your existing data landscape and provides a central point of access for business, data science and operational use.",
      onClick: () => goToStep("next"),
    },
    {
      photo: <Logo color="black" name="Labs" />,
      description:
        "Labs is a flexible, consistent, and simple data science environment enabling data scientists to seamlessly explore data and deploy models.",
      onClick: () => alert("You chose the second item!"),
    },
  ]}
/>
```
