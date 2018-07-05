This component provides a Contiamo logo for use out of the box. It is typically used in the [HeaderBar](#headerbar) and provides context to our internal apps.

### Usage

#### With Colors

```jsx
<div style={{ display: "flex", justifyContent: "space-around" }}>
  <ContiamoLogo color="primary" />
  <ContiamoLogo color="error" />
  <ContiamoLogo color="success" />
  <ContiamoLogo color="#feb901" />
  <ContiamoLogo color="#ff00ff" />
</div>
```

#### With size

```jsx
<ContiamoLogo color="black" size={200} />
```

#### Stacked

```jsx
<ContiamoLogo size={35} color="#747474" stack />
```
