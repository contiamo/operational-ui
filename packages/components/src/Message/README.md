Messages are the primitive building blocks for notification systems common in frontend applications. A single message simply includes some body (any html/React element) and an optional close icon.

### Usage

### Short message
```jsx
<Message color="error">
  Oh no… An error occured :(
</Message>
```

### Long message
```jsx
<Message color="info">
  This is an important message from the New York City Police Department. Keep
  your belongings in sight at all times. Protect yourself. If you see a
  suspicious activity on the platform or train, do not keep it to yourself. Tell
  a police officer or an MTA employee. Remain alert and have a safe day!
</Message>
```