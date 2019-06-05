import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { setAlpha } from "../utils"

interface UploaderProps extends DefaultProps {
  dragActive: boolean
}

const Container = styled("div")<UploaderProps>(({ dragActive, theme }) => ({
  width: 400,
  height: 108,
  textAlign: "center",
  "& div": {
    position: "relative",
    top: "50%",
    transform: "translate(0, -50%)",
  },
  ...(dragActive
    ? {
        backgroundColor: setAlpha(0.05)(theme.color.primary),
        border: `1px solid ${theme.color.primary}`,
      }
    : {
        backgroundColor: theme.color.background.lightest,
        border: `1px dashed ${theme.color.border.default}`,
      }),
}))

const Uploader: React.SFC<UploaderProps> = ({ ...props }) => <Container {...props}>{props.children}</Container>

export default Uploader
