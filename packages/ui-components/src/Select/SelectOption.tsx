import * as React from "react"
import glamorous, { withTheme, GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"
import { Icon } from "contiamo-ui-components"

export interface IProps {
  key?: number | string
  css?: any
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
  color?: string
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

const Container = glamorous.div(
  ({ theme, color, selected }: { theme: Theme; color?: string; selected: boolean }): any => {
    const backgroundColor = color && theme.colors ? hexOrColor(color)(theme.colors.palette[color]) : "white"

    return {
      backgroundColor,
      position: "relative",
      padding: theme.spacing / 2,
      color: readableTextColor(backgroundColor)(["black", "white"]),
      outline: "none",

      ":hover": {
        backgroundColor: darken(backgroundColor)(5),
        color: readableTextColor(darken(backgroundColor)(5))(["black", "white"])
      },

      "&:not(:first-child)": {
        borderTop: "1px solid",
        borderColor: darken(backgroundColor)(10)
      }
    }
  }
)

const IconContainer = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: 8,
  height: 8,
  position: "absolute",
  top: "50%",
  right: 4,
  transform: "translate3d(-50%, -50%, 0)"
}))

const SelectOption: React.SFC<IPropsWithTheme> = ({
  css,
  key,
  className,
  theme,
  selected,
  color,
  onClick,
  children
}: IPropsWithTheme) => (
  <Container
    css={css}
    key={key}
    className={className}
    selected={!!selected}
    color={color}
    tabIndex={-2}
    role="option"
    aria-selected={selected}
    onClick={onClick}
  >
    {children}
    {selected ? (
      <IconContainer>
        <Icon name="X" size={theme.spacing} />
      </IconContainer>
    ) : null}
  </Container>
)

const WrappedSelectOption: React.SFC<IProps> = withTheme(SelectOption)

export default WrappedSelectOption
