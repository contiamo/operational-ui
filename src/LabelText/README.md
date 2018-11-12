This component renders a semantic label tag. This is used internally in the following components if the label prop is specified:

- Input
- DatePicker
- Select
- Textarea

`LabelText` is used internally, but is also exposed if you want to use it standalone with other components to achieve visual consistency with surrounding labeled input fields.

## Usage

```jsx
<div>
  <LabelText htmlFor="male">Male</LabelText>
  <input type="radio" readOnly name="gender" id="male" value="male" />
  <br />

  <LabelText htmlFor="female">Female</LabelText>
  <input checked type="radio" readOnly name="gender" id="female" value="female" />
</div>
```
