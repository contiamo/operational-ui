import styled from "../utils/styled"

const IconButton = styled("div")(({ theme }) => ({
  cursor: "pointer",
  borderRadius: theme.borderRadius,
  "& svg": {
    pointerEvents: "none",
  },
}))

export default IconButton
