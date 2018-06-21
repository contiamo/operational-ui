import * as React from "react"
import { Code } from "@operational/components"
import * as constants from "../../constants"

export const title = "Codes"

export const docsUrl = `${constants.docsBaseUrl}/#code`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Codes.tsx`

export const Component = () => (
  <Code
    syntax="typescript"
    code={`interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);`}
  />
)
