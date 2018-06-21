import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

export interface Props {
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
}

const StyledPageContent = styled("div")(
  (
    props: {
      children?: React.ReactNode
      theme?: OperationalStyleConstants
    } & Props,
  ) => {
    const grid = React.Children.count(props.children) > 1 ? "main side" : "main"
    const areas = props.areas ? props.areas : grid
    const gridTemplateColumns = {
      main: "auto",
      "main side": "auto 280px",
      "side main": "280px auto",
    }[areas]

    return {
      gridTemplateColumns,
      display: "grid",
      alignItems: "start",
      gridTemplateAreas: `"${areas}"`,
      gridGap: props.theme.space.content,
      maxWidth: props.fill ? "none" : 1150,
      minWidth: 800,
      width: "100%",
      height: `calc(100% - ${props.theme.titleHeight}px)`,
      padding: props.theme.space.element,
    }
  },
)

const PageContent: React.SFC<Props> = props => <StyledPageContent {...props} />

export default PageContent
