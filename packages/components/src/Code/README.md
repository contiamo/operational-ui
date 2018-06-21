Box for displaying formatted code snippets.

### Usage

```jsx
<h3>JSON</h3>
<Code syntax="json" code={`{
  "properties": {
    "startAt": {
      "type": "string",
      "format": "date-time"
    },
    "endAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}`}></Code>
```

```jsx
<h3>TypeScript</h3>
<Code syntax="ts" code={`interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);`}></Code>
```
