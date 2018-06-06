import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"
import { Icon, IconName, ContextConsumer, Context } from "../"
import { isModifiedEvent } from "../utils"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  onClick?: () => void
  /** Navigation property à la react-router <Link/> */
  to?: string
  active?: boolean
  icon?: IconName | React.ReactNode
  label: string
}

const size: number = 36

const containerStyles = ({ theme, isActive }: { theme: Theme; isActive: boolean }): CssStatic => ({
  display: "flex",
  padding: `0 ${theme.spacing * 0.5}px`,
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
    color: isActive ? theme.colors.linkText : "#888888",
  },
  "&:hover": {
    /** @todo Add to theme once colors are updated across codebase */
    backgroundColor: "#F4F4F4",
  },
})

const Container = glamorous.div(containerStyles)

const ContainerLink = glamorous.a(containerStyles)

const IconContainer = glamorous.span(
  ({ theme }: WithTheme): CssStatic => ({
    width: size,
    height: size,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: `0 0 ${size}px`,
  }),
)

const Label = glamorous.span(
  ({ theme }: { theme: Theme }): {} => ({
    display: "inline-block",
    paddingLeft: theme.spacing / 4,
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
          css={props.css}
          className={props.className}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            props.onClick && props.onClick()
            if (!isModifiedEvent(ev) && props.to && ctx.pushState) {
              ev.preventDefault()
              // Stopping propagation to prevent parent side nav header from triggering its own redirect
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
