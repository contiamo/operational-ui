import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { setAlpha } from "../utils"

interface UploaderProps extends DefaultProps {
  dragActive: boolean
}

const Container = styled("div")<Pick<UploaderProps, "dragActive">>(({ dragActive, theme }) => ({
  width: 400,
  height: 108,
  ...(dragActive
    ? {
        backgroundColor: setAlpha(0.05)(theme.color.primary),
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
