import * as React from "react"
import { Upload, Card, CardHeader, Icon, Button, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const simpleSnippet = `
(() => {
  class ComponentWithUploader extends React.Component {
    state = {
      files: []
    }

    uploaderProps = {
      action: "//jsonplaceholder.typicode.com/posts/",
      data: { x: 1, y: 2 },
      headers: {
        authorization: "authorization-text"
      },
      multiple: true,
      onBeforeUpload: (file, files) => {
        this.setState({ files })
      },
      onStartUpload: (file) => {
        const files = this.updateStatus(file, "uploading")
        this.setState({ files })
      },
      onSuccess: (response, file) => {
        const files = this.updateStatus(file, "success")
        this.setState({ files })
      },
      onError: (error, file) => {
        const files = this.updateStatus(file, "error")
        this.setState({ files })
      }
    }

    getColor = (status) => {
      const colorsMap = {
        uploading: "#1499CE",
        success: "#00b34d",
        warning: "#FFAE00",
        error: "#DE1A1A"
      }
      return colorsMap[status]
    }

    getIconName = (status) => {
      const iconsMap = {
        uploading: "Loader",
        success: "CheckCircle",
        error: "AlertCircle"
      }
      return iconsMap[status]
    }

    updateStatus = (file, status) =>
      this.state.files.map(item => {
        if (item.name === file.name) {
          item.status = status
        }
        return item
      })

    renderFileList = () => {
      const { files } = this.state
      return (
        <ul style={{ padding: 0 }}>
          {files.map((file, i) => (
            <li
              key={i}
              style={{
                listStyle: "none",
                color: this.getColor(file.status),
                padding: "6px 0",
                display: "flex",
                alignItems: "center",
                transition: "color .5s ease"
              }}
            >
              <Icon name={this.getIconName(file.status)} />
              <span style={{ marginLeft: 8 }}>{file.name}</span>
            </li>
          ))}
        </ul>
      )
    }

    render() {
      return (
        <div>
          <Upload {...this.uploaderProps}>
            <Button>
              <Icon name="Upload" /> Upload
            </Button>
          </Upload>
          {this.renderFileList()}
        </div>
      )
    }
  }

  return (
    <div>
      <ComponentWithUploader />
    </div>
  )
})()
`

const propDescription = [
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

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Uploads are great components!</p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Upload, Icon, Button }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
