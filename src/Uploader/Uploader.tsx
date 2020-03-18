import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface UploaderProps extends DefaultProps {
  dragActive: boolean
}

const Container = styled("div")<Pick<UploaderProps, "dragActive">>(({ dragActive, theme }) => ({
  width: 400,
  height: 108,
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  ...(dragActive
    ? {
        backgroundColor: theme.color.highlight,
        border: `1px solid ${theme.color.primary}`,
        color: theme.color.primary,
      }
    : {
        backgroundColor: theme.color.background.lightest,
        border: `1px dashed ${theme.color.border.default}`,
      }),
}))

const Uploader: React.SFC<UploaderProps> = ({ dragActive, ...props }) => (
  <Container {...props} dragActive={dragActive}>
    {props.children}
  </Container>
)

export default Uploader
