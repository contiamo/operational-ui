Box for displaying formatted code snippets.

### Usage

#### JSON

```jsx
<Code syntax="json">
  {`{
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
}`}
</Code>
```

#### TypeScript

```jsx
<Code syntax="ts">{`interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);`}</Code>
```
