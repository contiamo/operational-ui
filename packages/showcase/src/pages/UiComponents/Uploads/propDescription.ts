export default [
  {
    name: "action",
    description: "URL of the action to be performed.",
    defaultValue: "",
    type: "string",
    optional: false
  },
  {
    name: "accept",
    description: "Takes a comma-separated list of allowed file extensions or MIME types.",
    defaultValue: '""',
    type: "string",
    optional: true
  },
  {
    name: "data",
    description: "Aditional data to be sent in the body of the request.",
    defaultValue: "{ }",
    type: "object",
    optional: true
  },
  {
    name: "disabled",
    description: "Indicates that the uploader is not available for interaction.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  },
  {
    name: "headers",
    description: "Request headers",
    defaultValue: "{ }",
    type: "object",
    optional: true
  },
  {
    name: "multiple",
    description: "Indicates whether the user can enter more than one file.",
    defaultValue: "false",
    type: "boolean",
    optional: true
  },
  {
    name: "name",
    description: "Name of the file input control.",
    defaultValue: '"file"',
    type: "string",
    optional: true
  },
  {
    name: "onBeforeUpload",
    description: "Function to be executed before uploading the files.",
    defaultValue: "void",
    type: "func",
    optional: true
  },
  {
    name: "onStartUpload",
    description: "Function to be executed right before the uploading process starts.",
    defaultValue: "void",
    type: "func",
    optional: true
  },
  {
    name: "onError",
    description: "Function to be executed when a file is successfully uploaded.",
    defaultValue: "void",
    type: "func",
    optional: true
  },
  {
    name: "onSuccess",
    description: "Function to be executed when a file is successfully uploaded.",
    defaultValue: "void",
    type: "func",
    optional: true
  }
]
