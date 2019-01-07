import styled from "../utils/styled"

const IconButton = styled("div")<{ hidden_?: boolean; hoverEffect?: boolean }>(({ theme, hidden_, hoverEffect }) => ({
  cursor: "pointer",
  width: 20,
  height: 20,
  padding: 4,
  borderRadius: theme.borderRadius,
  "& svg": {
    cursor: "pointer",
    width: 12,
    height: 12,
  },
  ...(hidden_ ? { visibility: "hidden" } : {}),
  ...(hoverEffect
    ? {
        ":hover": {
          backgroundColor: theme.color.background.light,
        },
      }
    : {}),
}))

export default IconButton
