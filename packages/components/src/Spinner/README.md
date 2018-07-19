Spinners are used to indicate loading state in a smaller element, such as a card or a single, smaller form.

### Usage

Spinners render in custom sizes and colors.

```js
<>
  <Spinner />
  <br />
  <Spinner color="primary" />
  <br />
  <Spinner color="#f0f" />
  <br />
  <Spinner size={12} />
</>
```

### Bouncing mode

In addition to the regular spinning animation, there is a bouncing one that is designed to indicate that data already displayed on the page is being updated.

```js
<>
  <Spinner bounce />
  <br />
  <Spinner color="success" bounce />
  <br />
  <Spinner color="#f0f" bounce />
</>
```

### Fun mode

```js
<div style={{ position: "relative" }}>
  <svg width="365" height="185">
    <rect x="70" y="10" width="220" height="130" fill="transparent" rx="150" stroke="#1499cc" strokeWidth="10" />
    <rect x="10" y="70" width="340" height="80" fill="#1499cc" rx="30" />
    <line x1="145" y1="10" x2="145" y2="80" stroke="#1499cc" strokeWidth="10" />
    <line x1="215" y1="10" x2="215" y2="80" stroke="#1499cc" strokeWidth="10" />
    <rect x="0" y="110" width="40" height="20" fill="#999" rx="10" />
    <rect x="325" y="110" width="40" height="20" fill="#999" rx="10" />
    <circle r="15px" fill="gold" cx="340" cy="90" />
    <circle r="10px" fill="orange" cx="15" cy="90" />
  </svg>
  <div style={{ position: "absolute", bottom: 11, left: 60 }}>
    <Spinner color="black" size={60} />
  </div>
  <div style={{ position: "absolute", bottom: 11, left: 240 }}>
    <Spinner color="black" size={60} />
  </div>
</div>
```
