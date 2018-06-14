import styled from "react-emotion"

export interface Props {
  success?: boolean
  error?: boolean
}

/**
 * @todo refactor the colors and spacings when constants are merged:
 * https://github.com/contiamo/operational-ui/pull/492/files
 */
const getColorFromProps = (props: Props) => {
  if (props.success) {
    return "#0DAB1F"
  }

  if (props.error) {
    return "#990000"
  }

  return "#666666"
}

const Status = styled("div")`
  display: inline-block;
  margin-right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 4px ${getColorFromProps}99;
  background-color: ${getColorFromProps};
`

export default Status
