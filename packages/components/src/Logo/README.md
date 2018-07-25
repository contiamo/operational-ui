This component provides brand logos for use out of the box. It is typically used in the [HeaderBar](#headerbar) and provides context to our internal apps.

### Usage

#### With Colors

```jsx
<div style={{ display: "flex", justifyContent: "space-around" }}>
  <Logo name="Contiamo" color="primary" />
  <Logo name="Pantheon" color="error" />
  <Logo name="Labs" color="success" />
  <Logo name="Frontier" color="#feb901" />
</div>
```

#### With size

```jsx
<Logo color="black" size={200} name="Contiamo" />
```

#### Stacked

```jsx
<Logo size={100} color="#747474" name="ContiamoStacked" />
```
