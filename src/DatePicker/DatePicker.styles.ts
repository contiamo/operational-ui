import tinycolor from "tinycolor2"
import styled from "../utils/styled"

import { OperationalStyleConstants } from "../utils/constants"
import * as mixins from "../utils/mixins"

const inputHeight: number = 36

export interface ContainerProps {
  isExpanded: boolean
}

const inputDefaultWidth = 240

export const Container = styled("div")<{ isExpanded?: boolean }>({
  label: "datepicker",
  width: inputDefaultWidth,
  position: "relative",
})

export const DatePickerCard = styled("div")<{ isExpanded: boolean }>(
  {
    position: "absolute",
    left: 0,
  },
  ({ theme, isExpanded }) => ({
    backgroundColor: theme.deprecated.colors.white,
    display: isExpanded ? "block" : "none",
    boxShadow: theme.deprecated.shadows.popup,
    borderRadius: theme.deprecated.borderRadius,
    // Push down the card to the bottom of the input field,
    // plus the twice the size of the outside focus shadow.
    top: inputHeight + 6,
    padding: `${(theme.deprecated.spacing * 3) / 4}px ${theme.deprecated.spacing}px ${(theme.deprecated.spacing * 4) /
      3}px`,
    width: inputDefaultWidth,
    zIndex: theme.deprecated.baseZIndex + 1000,
  }),
)

export const Toggle = styled("div")(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  top: 1,
  right: 1,
  borderTopRightRadius: theme.deprecated.borderRadius,
  borderBottomRightRadius: theme.deprecated.borderRadius,
  width: inputHeight - 2,
  height: inputHeight - 2,
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.deprecated.baseZIndex + 1000,
  color: theme.deprecated.colors.inputBorder,
  borderLeft: "1px solid",
  borderColor: theme.deprecated.colors.inputBorder,
  "& svg": {
    position: "relative",
    pointerEvents: "none",
  },
  ":hover": {
    backgroundColor: theme.deprecated.colors.lighterBackground,
  },
}))

export const MonthNav = styled("div")(({ theme }) => ({
  marginBottom: theme.space.element,
  textAlign: "center",
  "& > *": {
    margin: "0 2px",
    verticalAlign: "middle",
    display: "inline-block",
  },
  "& > span": {
    ...theme.deprecated.typography.body,
    userSelect: "none",
    width: 120,
    textAlign: "center",
  },
}))

export const IconContainer = styled("div")<{ disabled?: boolean }>(
  ({ theme, disabled }): {} => ({
    width: 20,
    height: 20,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? "0.4" : "1",
    ":hover": {
      backgroundColor: disabled ? undefined : theme.color.background.lighter,
    },
  }),
)

export const Days = styled("div")({
  textAlign: "center",
  width: 210,
  margin: "auto -1px",
})

const makeDayTextColor = ({
  isPlaceholder,
  isDisabled,
  selected,
  theme,
}: {
  isDisabled?: boolean
  isPlaceholder?: boolean
  selected?: boolean
  theme: OperationalStyleConstants
}) => {
  if (selected) {
    return theme.color.white
  }
  if (isDisabled || isPlaceholder) {
    return theme.color.text.lighter
  }
  return theme.color.text.dark
}

const BaseDay = styled("div")(({ theme }) => ({
  userSelect: "none",
  width: 30,
  height: 30,
  marginRight: -1,
  marginBottom: -1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 3,
  borderRadius: "50%",
  backgroundClip: "content-box",
  fontSize: theme.font.size.body,
  fontWeght: theme.font.weight.regular,
}))

export const Day = styled(BaseDay)<{
  selected?: boolean
  isPlaceholder?: boolean
  isDisabled?: boolean
}>(({ theme, isPlaceholder, selected, isDisabled }) => ({
  backgroundColor: selected ? theme.color.primary : "transparent",
  color: makeDayTextColor({ isPlaceholder, isDisabled, selected, theme }),
  cursor: isDisabled ? "not-allowed" : "pointer",
  ":hover": {
    backgroundColor: selected
      ? tinycolor(theme.color.primary)
          .darken(5)
          .toString()
      : isDisabled
        ? "transparent"
        : theme.color.background.lighter,
  },
}))

export const DayOfWeek = styled(BaseDay)`
  color: ${props => props.theme.color.text.lightest};
`

export const Input = styled("input")<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  ...theme.deprecated.typography.body,
  userSelect: "none",
  borderRadius: theme.deprecated.borderRadius,
  padding: (theme.deprecated.spacing * 2) / 3,
  height: inputHeight,
  cursor: "pointer",
  border: "1px solid",
  borderColor: "rgb(208, 217, 229)",
  width: "100%",
  position: "relative",
  "&:focus": mixins.inputFocus({
    theme,
  }),
  ...(isExpanded
    ? mixins.inputFocus({
        theme,
      })
    : {}),
}))

export const ClearButton = styled("div")(({ theme }) => ({
  width: inputHeight,
  height: inputHeight,
  cursor: "pointer",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bottom: 0,
  right: -inputHeight + 1,
  opacity: 0.3,
  textAlign: "center",
  zIndex: theme.deprecated.baseZIndex + 100,
  "&:hover": {
    opacity: 1,
    "& svg": {
      stroke: theme.deprecated.colors.warning,
    },
  },
}))
