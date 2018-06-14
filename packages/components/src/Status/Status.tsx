import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import * as tinycolor from "tinycolor2"

export interface Props {
  success?: boolean
  error?: boolean
  theme: OperationalStyleConstants
}

const getColorFromProps = ({ success, error, theme }: Props): string => {
  if (success) {
    return theme.color.success
  }

  if (error) {
    return theme.color.error
  }

  return theme.color.background.dark
}

const Status = styled("div")`
  display: inline-block;
  margin-right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 4px
    ${(props: Props) =>
      tinycolor(getColorFromProps(props))
        .setAlpha(0.6)
        .toHslString()};
  background-color: ${getColorFromProps};
`

export default Status
