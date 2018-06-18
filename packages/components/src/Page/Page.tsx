import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Button, Icon, IconName } from "../"
import { WithTheme, Css, CssStatic } from "../types"
export interface Props {
  /** Page title */
  title: string
  /** Icon displayed next to the title. Should match related sidenav icons */

  titleIcon?: IconName
  /** Page breadcrumbs, using the `Breadcrumbs` component */

  breadcrumbs?: React.ReactNode
  /** Page controls, typically `condensed button` component inside a fragment */

  controls?: React.ReactNode
  /** Content of the page */

  children?: React.ReactNode
}
const Container = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    label: "page",
    backgroundColor: theme.deprecated.colors.white,
    padding: `0px ${theme.deprecated.spacing * 1.5}px ${theme.deprecated.spacing * 1.5}px`,
  }),
)
const TopBar = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    height: theme.deprecated.box,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
)
const TitleBar = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    ...theme.deprecated.typography.title,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0.5 * theme.deprecated.spacing,
    marginBottom: 2 * theme.deprecated.spacing,
    "& svg": {
      width: theme.deprecated.spacing * 1.75,
      height: theme.deprecated.spacing * 1.75,
      marginRight: theme.deprecated.spacing * 0.5,
    },
  }),
)
const ControlsContainer = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    marginLeft: theme.deprecated.spacing,
    // Offset the line-height setting inherited from being inside a
    // typography component/mixin.
    lineHeight: 1,
    "& > :last-child": {
      marginRight: 0,
    },
  }),
)

const Page = (props: Props) => (
  <Container>
    <TopBar>{props.breadcrumbs}</TopBar>
    <TitleBar>
      {props.titleIcon &&
        (props.titleIcon === String(props.titleIcon) ? <Icon name={props.titleIcon} /> : props.titleIcon)}
      {props.title}
      <ControlsContainer>{props.controls}</ControlsContainer>
    </TitleBar>
    {props.children}
  </Container>
)

export default Page
