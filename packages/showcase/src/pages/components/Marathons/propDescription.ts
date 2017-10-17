export default [
  {
    name: "test",
    description: "test function to be executed. See playground example.",
    defaultValue: "void",
    type: "func",
    optional: false
  },
  {
    name: "timeout",
    description: "Timeout in milliseconds between each test case execution.",
    defaultValue: "0",
    type: "number",
    optional: true
  }
]
