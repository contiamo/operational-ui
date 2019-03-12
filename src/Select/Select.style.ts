import { floatIn, readableTextColor, resetTransform } from "../utils"
import { expandColor } from "../utils/constants"
import * as mixins from "../utils/mixins"
import styled from "../utils/styled"

const Container = styled("div")<{
  id?: string
  color?: string
  disabled: boolean
  style?: {}
  role?: string
  tabIndex?: number
  onClick?: () => void
}>(({ theme, color, disabled }) => {
  const backgroundColor = expandColor(theme, color) || theme.color.white
  return {
    backgroundColor,
    label: "select",
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: theme.space.content,
    borderRadius: 4,
    width: "fit-content",
    minWidth: 240,
    minHeight: 20,
    border: "1px solid",
    borderColor: theme.color.border.default,
    opacity: disabled ? 0.5 : 1,
    cursor: "pointer",
    color: readableTextColor(backgroundColor, ["black", "white"]),
    outline: "none",
    pointerEvents: disabled ? "none" : "all",
    // downward caret.
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      right: theme.space.content,
      width: 0,
      height: 0,
      border: "4px solid transparent",
      borderTopColor: theme.color.border.disabled,
      transform: "translateY(calc(-50% + 2px))",
    },
    "&:focus": mixins.inputFocus({
      theme,
    }),
  }
})

const DisplayValue = styled("div")<{ isPlaceholder: boolean }>(({ theme, isPlaceholder }) => ({
  color: isPlaceholder ? theme.color.border.disabled : theme.color.black,
}))

const Options = styled("div")(
  {
    position: "absolute",
    // Push it down 6px so it doesn't overlap with the focus shadow,
    // and there's a comfortable 2px gap.
    top: "calc(100% + 6px)",
    left: 0,
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
    opacity: 0,
    transform: "translateY(-10px)",
    animation: `${floatIn} .15s forwards ease,
    ${resetTransform} .15s forwards ease`,
  },
  ({ theme }) => ({
    boxShadow: theme.shadows.popup,
    zIndex: theme.zIndex.selectOptions,
  }),
)

const OptionsList = styled("div")({
  maxHeight: 200,
  overflow: "auto",
})

export { Container, Options, OptionsList, DisplayValue }
