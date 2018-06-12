Cards are used to group and lay out content on the interface - in fact, non-scrolling interfaces with a number of cards laid out in a grid are the most common use-cases of this project.

### Usage

Simply add any content inside the card.

```jsx
<Card title="Card title" actionComponents={() => <>More details: <a href="#card">click here</a> </>}>
    <p>Here is a bare card with custom padding.</p>
    <img
        alt="Cat"
        src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500"
    />
</Card>
```
