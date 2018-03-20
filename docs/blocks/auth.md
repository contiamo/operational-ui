# Auth

The Auth block supports general authentication needs. It expects generic props for username, password, passwordConfirmation etc., rendering corresponding form fields only they are supplied. The onChange callback takes care of sending updates to the parent, and onSubmit is called every time the component is submitted.

Auth is purely presentational. It can display loading states and error messages, but it doesn't handle side effects or internal state.


## Usage

Here is a simple stateless example to help you get a feel for the props:

```js
<Auth
  title="Log in"
  username=""
  password=""
  error="Trouble logging in"
/>
```

## Props

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| title | Auth form title, e.g. 'Log in' or 'Reset password' | string |  | Yes |
| username | User name input field value. The corresponding input field is not rendered if not present (supply empty string if there is no value but the form field should be displayed). | string |  | Yes |
| password | Password input field value. The corresponding input field is not rendered if not present (supply empty string if there is no value but the form field should be displayed). | string |  | Yes |
| passwordConfirmation | Password confirmation input field value. The corresponding input field is not rendered if not present (supply empty string if there is no value but the form field should be displayed). | string |  | Yes |
| processing | Set this boolean prop to indicate that the form data is being processed. This fades the form, disables user interaction and renders a spinner. | boolean | false | Yes |
| error | Authentication error message. | string |  | Yes |
