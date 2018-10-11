This component renders a semantic label tag. This is used internally in the following components if the label prop is specified:

- Input
- DatePicker
- Select
- Textarea

`LabelText` is used internally, but is also exposed if you want to use it standalone with other components to achieve visual consistency with surrounding labeled input fields.

## Usage

```jsx
<LabelText for="male">Male</LabelText>
<input type="radio" name="gender" id="male" value="male"><br>
<LabelText for="female">Female</LabelText>
<input type="radio" name="gender" id="female" value="female"><br>
```
