import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { setAlpha } from "../utils"
import Progress from "../Progress/Progress"

interface UploaderProps extends DefaultProps {
  currentState: "initial" | "dragOver" | "uploading" | "completed" | "error"
  percentage?: number
  onFileSelect?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  clickHandler?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  onMouseUp?: (e?: React.SyntheticEvent<React.ReactNode>) => void
}

const Container = styled("div")<UploaderProps>(({ currentState, theme }) => ({
  width: 400,
  height: 108,
  textAlign: "center",
  "& div": {
    position: "relative",
    top: "50%",
    transform: "translate(0, -50%)",
  },
  ...(currentState === "dragOver"
    ? {
        backgroundColor: setAlpha(0.05)(theme.color.primary),
        border: `1px solid ${theme.color.primary}`,
      }
    : {
        backgroundColor: theme.color.background.lightest,
        border: `1px dashed ${theme.color.border.default}`,
      }),
}))

const InitialContentContainer = styled("div")(({ theme }) => ({
  lineHeight: "18px",
  "& label": {
    color: theme.color.primary,
    fontWeight: theme.font.weight.bold,
    cursor: "pointer",
  },
  "& input": {
    display: "none",
  },
}))

const DragOverContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.primary,
}))

const UploadingContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.text.lighter,
  "& div": {
    width: 196,
    display: "inline-flex",
  },
}))

const CompletedContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.primary,
  fontWeight: theme.font.weight.bold,
}))

const ErrorContentContainer = styled("div")(({ theme }) => ({
  color: theme.color.error,
  lineHeight: "22px",
  "& span": {
    color: theme.color.primary,
    fontWeight: theme.font.weight.bold,
    cursor: "pointer",
  },
}))

const InitialContent: React.SFC<Pick<UploaderProps, "onFileSelect">> = ({ onFileSelect }) => (
  <InitialContentContainer>
    Drop your file here
    <br />
    or
    <br />
    <label htmlFor="browse">browse files</label>
    <input onChange={onFileSelect} id="browse" type="file" />
  </InitialContentContainer>
)

const DragOverContent: React.SFC = ({}) => <DragOverContentContainer>Drop your file here</DragOverContentContainer>

const UploadingContent: React.SFC<Pick<UploaderProps, "percentage">> = ({ percentage }) => (
  <UploadingContentContainer>
    <Progress inline percentage={percentage} />
    <p>Uploading...</p>
  </UploadingContentContainer>
)

const CompletedContent: React.SFC<{}> = ({}) => <CompletedContentContainer>Completed</CompletedContentContainer>

const ErrorContent: React.SFC<Pick<UploaderProps, "clickHandler">> = ({ clickHandler }) => (
  <ErrorContentContainer>
    Upload failed
    <br />
    <span onClick={clickHandler}>Try again</span>
  </ErrorContentContainer>
)

const Content: React.SFC<UploaderProps> = ({ currentState, ...props }) => {
  switch (currentState) {
    case "initial":
      return <InitialContent onFileSelect={props.onFileSelect} />
    case "dragOver":
      return <DragOverContent />
    case "uploading":
      return <UploadingContent percentage={props.percentage} />
    case "completed":
      return <CompletedContent />
    case "error":
      return <ErrorContent clickHandler={props.clickHandler} />
    default:
      return <InitialContent />
  }
}

const Uploader: React.SFC<UploaderProps> = ({ ...props }) => (
  <Container {...props}>
    <Content {...props} />
  </Container>
)

export default Uploader
