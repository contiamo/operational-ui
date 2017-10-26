export default {
  contextMenu: [
    {
      name: "expandOnHover",
      description: "Specifies whether a menu should expand on hover.",
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
