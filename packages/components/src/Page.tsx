import * as React from "react"
import glamorous, { Div } from "glamorous"
import { Theme } from "@operational/theme"

import Button from "./Button"
import Icon from "./Icon"

export interface Props {
  title: string
  // This is an experimental feature that renders a back button into the UI.
  // May change substantially or be removed completely.
  __experimentalBackLink: {
    url: string
    label?: string
    onClick?: () => void
  }
  breadcrumbs?: React.ReactNode
  controls?: React.ReactNode
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "page-content",
  backgroundColor: theme.colors.white,
  padding: `0px ${theme.spacing * 1.5}px`,
  overflow: "auto",
  height: "100%"
}))

const TopBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  height: theme.box,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}))

const TitleBar = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.title,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: 0.5 * theme.spacing,
  marginBottom: 2 * theme.spacing
}))

const ControlsContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginLeft: theme.spacing,
  "& > :last-child": {
    marginRight: 0
  }
}))

const BackLinkContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginTop: theme.spacing / 2,
  marginBottom: theme.spacing,
  opacity: 0.5,
  "& svg": {
    marginRight: 4,
    position: "relative",
    top: 2,
    left: -1
  }
}))

const Page = (props: Props) => (
  <Container>
    <TopBar>{props.breadcrumbs}</TopBar>
    {props.__experimentalBackLink ? (
      <BackLinkContainer>
        <a
          href={props.__experimentalBackLink.url}
          onClick={(ev: any) => {
            // Only pushstate routing is supported (experimental feature)
            ev.preventDefault()
            props.__experimentalBackLink.onClick && props.__experimentalBackLink.onClick()
          }}
        >
          <Button condensed>
            <Icon name="ChevronLeft" size={12} />
            {props.__experimentalBackLink.label || "Back"}
          </Button>
        </a>
      </BackLinkContainer>
    ) : null}
    <TitleBar>
      {props.title}
      <ControlsContainer>{props.controls}</ControlsContainer>
    </TitleBar>
    {props.children}
  </Container>
)

export default Page
