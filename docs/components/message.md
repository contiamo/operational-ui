# Messages

Messages are the primitive building blocks for notification systems common in frontend applications. A single message simply includes some body (any html/React element) and an optional close icon.

## Usage

```js
<Message color="info">
  This is an important message from the New York City Police Department. Keep
  your belongings in sight at all times. Protect yourself. If you see a
  suspicious activity on the platform or train, do not keep it to yourself. Tell
  a police officer or an MTA employee. Remain alert and have a safe day!
</Message>
```

## Props

| Name     | Description                                                                                   | Type         | Default | Required |
| :------- | :-------------------------------------------------------------------------------------------- | :----------- | :------ | :------- |
| onClose  | Called when close icon is clicked. Icon is not rendered at all if this prop is not specified. | () => void   |         | Yes      |
| children | Message contents, can be any html element/React fragment.                                     | ReactElement |         | Yes      |
