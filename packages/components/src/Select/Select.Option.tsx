import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { darken } from "@operational/utils"
import { Icon } from "../"

export interface Props {
  id?: number | string
  css?: any
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Container = styled("div")(({ theme, selected }: { theme?: OperationalStyleConstants; selected: boolean }) => {
  const backgroundColor = selected ? theme.color.background.lighter : theme.color.white
  return {
    backgroundColor,
    label: "selectoption",
    position: "relative",
    padding: `${theme.space.small}px ${theme.space.content}px`,
    wordWrap: "break-word",
    outline: "none",
    borderTop: "1px solid",
    borderColor: darken(theme.color.background.lighter, 10),
    color: theme.color.text.default,
    ":hover": {
      backgroundColor: darken(theme.color.background.lighter, 5),
    },
  }
})

const IconContainer = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  backgroundColor: theme.color.primary,
  position: "absolute",
  top: "50%",
  right: 4,
  borderRadius: "50%",
  transform: "translate3d(0, -50%, 0)",
  "& svg": {
    color: theme.color.white,
    width: 12,
    height: 12,
  },
}))

const SelectOption = (props: Props) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    selected={Boolean(props.selected)}
    tabIndex={-2}
    role="option"
    aria-selected={props.selected}
    onClick={(ev: React.SyntheticEvent<Node>) => {
      ev.stopPropagation()
      props.onClick && props.onClick()
    }}
  >
    {props.children}
    {props.selected ? (
      <IconContainer>
        <Icon name="Check" size={10} />
      </IconContainer>
    ) : null}
  </Container>
)

export default SelectOption
