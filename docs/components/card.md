# Cards

Cards are used to group and lay out content on the interface - in fact, non-scrolling interfaces with a number of cards laid out in a grid are the most common use-cases of this project.

## Usage

Simply add any content inside the card.

```
<Card width={260}>
  <CardHeader>Title for my card</CardHeader>
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
```

## Card headers

Using a CardHeader component is the standard way to add a title element to the card. This may include not just the card title, but also navigation on the right-hand side.

```js
<Card padding={32} width={260}>
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| width | How wide would you like your card to be? | number | 100% | Yes |
| padding | How much space do we apply to the inside of the card? | number | 0 | Yes |
