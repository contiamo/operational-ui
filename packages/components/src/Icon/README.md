Operational's SVG icon set as a single component. It abstracts over different types of icons ([Feather Icons](https://feathericons.com) and custom shapes) to provide a consistent API as the icon set evolves.

### Usage

```jsx
<div>
  <p>
    Here are some <a href="https://feathericons.com">Feather Icons</a>:
  </p>
  <Icon name="Play" size={36} />
  <Icon name="Pause" size={36} />
  <Icon name="Check" size={36} color="#00bb00" />
  <Icon name="X" size={36} color="error" />
  <p>And here some brand icons:</p>
  <Icon name="OperationalUI" size={36} />
  <Icon name="Pantheon" size={36} colored />
  <Icon name="Labs" size={36} />
</div>
```
