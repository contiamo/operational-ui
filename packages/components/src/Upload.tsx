import * as React from "react"
import * as attrAccept from "attr-accept"

export interface IRequestOptions {
  action?: string
  data?: {}
  file?: File
  headers?: {}
  name?: string
}

export interface Props {
  action?: string
  accept?: string
  data?: {}
  disabled?: boolean
  headers?: {}
  multiple?: boolean
  name?: string
  onBeforeUpload?: (file: File, fileList: File[]) => Promise<any> | void
  onStartUpload?: (file: File) => void
  onError?: (error: Error, file: File) => void
  onSuccess?: (response: {}, file: File) => void
  request?: (params: IRequestOptions) => Promise<any>
}

class Upload extends React.Component<Props, any> {
  static defaultProps = {
    accept: "*",
    data: {},
    headers: {},
    multipart: false,
    multiple: false,
    name: "file",
    onBeforeUpload: () => {},
    onStartUpload: () => {},
    onError: () => {},
    onSuccess: () => {}
  }

  fileInput: HTMLInputElement

  onChange(evt: any) {
    this.uploadAll(Array.from((evt.target as any).files))
  }

  onClick() {
    this.fileInput.click()
  }

  onDrop(evt: DragEvent) {
    evt.preventDefault()

    if (evt.type === "dragover") return

    const files = Array.from(evt.dataTransfer.files).filter(file => attrAccept(file))

    this.uploadAll(files)
  }

  uploadAll(files: File[]) {
    files.forEach((file: File) => {
      this.upload(file, files)
    })
  }

  async upload(file: File, fileList: File[]) {
    try {
      const { onBeforeUpload } = this.props
      const newFile = await onBeforeUpload(file, fileList)
      const type = Object.prototype.toString.call(newFile)

      if (type === "[object Blob]" || type === "[object File]") {
        this.postFile(newFile as File)
      } else {
        this.postFile(file)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async postFile(file: File) {
    const { action, data, headers, name, onStartUpload, onSuccess, onError, request = defaultRequest } = this.props
    try {
      onStartUpload(file)
      const response = await request({ action, data, file, headers, name })
      onSuccess(response, file)
    } catch (error) {
      onError(error, file)
    }
  }

  render() {
    const { accept, children, disabled, multiple } = this.props
    const handlers = !disabled
      ? {
          onClick: this.onClick.bind(this),
          onDragOver: this.onDrop.bind(this),
          onDrop: this.onDrop.bind(this)
        }
      : {}

    return (
      <div {...handlers}>
        <input
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
          onChange={this.onChange.bind(this)}
          ref={node => {
            this.fileInput = node
          }}
          type="file"
        />
        {children}
      </div>
    )
  }
}

export default Upload

function checkStatus(response: Response): Response {
  if (response.ok) {
    return response
  }
  const error = new Error(response.statusText)
  ;(error as any).response = response
  throw error
}

async function defaultRequest({ action, data, file, headers, name }: IRequestOptions): Promise<any> {
  const formData: FormData = (Object as any)
    .entries(data)
    .reduce((accFormData: FormData, [key, value]: [string, any], i: number) => {
      if (i === 0) accFormData.append(name, file)
      accFormData.append(key, value)
      return accFormData
    }, new FormData())

  const response = await fetch(action, {
    method: "POST",
    headers: new Headers(headers),
    body: formData,
    mode: "cors",
    cache: "default"
  })

  return await checkStatus(response).json()
}
