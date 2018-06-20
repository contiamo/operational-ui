import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { lighten } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"
import { Icon, IconName, ContextConsumer, Context } from "../"
import { isModifiedEvent } from "../utils"

export interface Props {
  id?: string
  className?: string
  onClick?: () => void
  /** Navigation property à la react-router <Link/> */
  to?: string
  active?: boolean
  icon?: IconName | React.ReactNode
  label: string
}

const size: number = 36

const containerStyles = ({
  theme,
  isActive,
}: {
  theme?: OperationalStyleConstants & {
    deprecated: Theme
  }
  isActive: boolean
}): CssStatic => ({
  display: "flex",
  padding: `0 ${theme.deprecated.spacing * 0.5}px`,
  label: "sidenavitem",
  height: size,
  position: "relative",
  width: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
  whiteSpace: "nowrap",
  fontSize: 14,
  fontWeight: 400,
  // Specificity is piled up here to override default styles
  "a:link&, a:visited&": {
    textDecoration: "none",

    /** @todo Add to theme once colors are updated across codebase */
    color: isActive ? theme.deprecated.colors.linkText : theme.color.text.lightest,
  },
  "&:hover": {
    /** @todo Add to theme once colors are updated across codebase */
    backgroundColor: theme.color.background.light,
  },
})

const Container = styled("div")(containerStyles)
const ContainerLink = styled("a")(containerStyles)

const IconContainer = styled("span")(() => ({
  width: size,
  height: size,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: `0 0 ${size}px`,
}))

const Label = styled("span")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    display: "inline-block",
    paddingLeft: theme.deprecated.spacing / 4,
  }),
)

const SidenavItem = (props: Props) => {
  const ContainerComponent = props.to ? ContainerLink : Container
  const isActive = !!props.active || window.location.pathname === props.to
  return (
    <ContextConsumer>
      {(ctx: Context) => (
        <ContainerComponent
          href={props.to}
          id={props.id}
          className={props.className}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            props.onClick && props.onClick()

            if (!isModifiedEvent(ev) && props.to && ctx.pushState) {
              ev.preventDefault()
              ev.stopPropagation()
              ctx.pushState(props.to)
            }
          }}
          isActive={isActive}
        >
          <IconContainer>
            {props.icon === String(props.icon) ? <Icon name={props.icon as IconName} size={18} /> : props.icon}
          </IconContainer>
          <Label>{props.label}</Label>
        </ContainerComponent>
      )}
    </ContextConsumer>
  )
}

export default SidenavItem
