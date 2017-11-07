/* eslint max-len: 0 */
import * as React from "react"

export default {
  sidebarItem: [
    {
      name: "label",
      description: "The label of the SidebarItem.",
      defaultValue: "",
      type: "string",
      optional: false
    },
    {
      name: "open",
      description: "Is the item open or closed by default?",
      defaultValue: "false",
      type: "boolean",
      optional: false
    },
    {
      name: "onClick",
      description:
        "A function to pass to the item that executes before the item expands. If a function returning a Promise is passed in, the item only expands after the Promise resolves.",
      defaultValue: <pre>() => this.open = !this.open</pre>,
      type: "func",
      optional: true
    }
  ],
  sidebarLink: [
    {
      name: "to",
      description: "Created to work with react-router, this wraps the children in a <Link> to your route.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "onClick",
      description:
        "A function called on click of this component, to be used instead of the `to` prop to do more than just navigate.",
      defaultValue: "",
      type: "func",
      optional: true
    },
    {
      name: "symbol",
      description:
        "A symbol to display at the right-hand side of the link, such as a `%` sign to suggest a unit of measure.",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "color",
      description:
        "Different links can have different colors to communicate different use-cases or purposes. This can be a hex value, or a named color in your theme.",
      defaultValue: "The primary color of your theme.",
      type: "string",
      optional: true
    }
  ]
}
