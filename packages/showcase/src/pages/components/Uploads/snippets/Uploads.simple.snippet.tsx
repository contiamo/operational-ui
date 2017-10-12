import * as React from "react"
import { Upload, Icon, Button } from "contiamo-ui-components"

export default (() => {
  class ComponentWithUploader extends React.Component {
    state: any = {
      files: []
    }

    uploaderProps = {
      action: "//jsonplaceholder.typicode.com/posts/",
      data: { x: 1, y: 2 },
      headers: {
        authorization: "authorization-text"
      },
      multiple: true,
      onBeforeUpload: (file: File, files: File[]) => {
        this.setState({ files })
      },
      onStartUpload: (file: File) => {
        const files = this.updateStatus(file, "uploading")
        this.setState({ files })
      },
      onSuccess: (response: {}, file: File) => {
        const files = this.updateStatus(file, "success")
        this.setState({ files })
      },
      onError: (error: Error, file: File) => {
        const files = this.updateStatus(file, "error")
        this.setState({ files })
      }
    }

    getColor = (status: string) => {
      const colorsMap: any = {
        uploading: "#1499CE",
        success: "#00b34d",
        warning: "#FFAE00",
        error: "#DE1A1A"
      }
      return colorsMap[status]
    }

    getIconName = (status: string) => {
      const iconsMap: any = {
        uploading: "Loader",
        success: "CheckCircle",
        error: "AlertCircle"
      }
      return iconsMap[status]
    }

    updateStatus = (file: any, status: string) =>
      this.state.files.map((item: any) => {
        if (item.name === file.name) {
          item.status = status
        }
        return item
      })

    renderFileList = () => {
      const { files } = this.state
      return (
        <ul style={{ padding: 0 }}>
          {files.map((file: any, i: number) => (
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
