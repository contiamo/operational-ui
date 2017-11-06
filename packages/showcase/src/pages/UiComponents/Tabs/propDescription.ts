export default {
  Tabs: [
    {
      name: "active",
      description: "Index of the active tab.",
      defaultValue: "0",
      type: "number",
      optional: true
    },
    {
      name: "activeColor",
      description: "Active color. It can be a hex value or a named theme color.",
      defaultValue: "info",
      type: "string",
      optional: true
    },
    {
      name: "onChange",
      description: "Function to be called once the tab index changes.",
      defaultValue: "() => {}",
      type: "func",
      optional: true
    }
  ],
  Tab: [
    {
      name: "disabled",
      description: "Make the tab and its content inaccessible.",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "title",
      description: "Title to be displayed in the tab button.",
      defaultValue: '""',
      type: "string",
      optional: true
    }
  ]
}
