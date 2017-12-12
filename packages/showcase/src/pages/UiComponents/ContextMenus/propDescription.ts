export default {
  contextMenu: [
    {
      name: "openOnHover",
      description: "Specifies whether the context menu should open on hover.",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "keepOpenOnItemClick",
      description: "Suppresses the default behavior of closing the context menu when one of its items is clicked.",
      defaultValue: "false",
      type: "boolean",
      optional: true
    }
  ],
  contextMenuItem: [
    {
      name: "onClick",
      description: "Click handler.",
      defaultValue: "-",
      type: "() => void",
      optional: true
    }
  ]
}
