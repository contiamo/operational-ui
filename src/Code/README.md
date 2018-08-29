Box for displaying formatted code snippets.

### Usage

#### JSON

**Default**

```jsx
<Code
  syntax="json"
  src={{
    properties: {
      startAt: {
        type: "string",
        format: "date-time",
      },
      endAt: {
        type: "string",
        format: "date-time",
      },
    },
  }}
/>
```

**With custom collapse options**

| Name             | Type                   | Default | Description                                                                                                                           |
| :--------------- | :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `collapsed`      | `boolean` or `integer` | `false` | When set to `true`, all nodes will be collapsed by default. Use an integer value to collapse at a particular depth.                   |
| `shouldCollapse` | `(field)=>{}`          | `false` | Callback function to provide control over what objects and arrays should be collapsed by default. An object is passed to the callback |

Extract from: https://github.com/mac-s-g/react-json-view

```jsx
<Code
  syntax="json"
  src={{
    properties: {
      startAt: {
        type: "string",
        format: "date-time",
      },
      endAt: {
        type: "string",
        format: "date-time",
      },
    },
  }}
  collapsed={2}
/>
```

#### TypeScript

```jsx
<Code syntax="typescript">{`interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);`}</Code>
```
