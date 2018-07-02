import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

export interface Props {
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
}

const StyledPageContent = styled("div")(
  (props: { theme?: OperationalStyleConstants; areas?: Props["areas"]; isFill?: boolean }) => {
    const gridTemplateColumns = {
      main: "auto",
      "main side": "auto 280px",
      "side main": "280px auto",
    }[props.areas]

    return {
      gridTemplateColumns,
      display: "grid",
      alignItems: "start",
      gridTemplateAreas: `"${props.areas}"`,
      gridGap: props.theme.space.element,
      maxWidth: props.isFill ? "none" : 1150,
      minWidth: 800,
      width: "100%",
      height: `calc(100% - ${props.theme.titleHeight}px)`,
      padding: props.theme.space.element,
    }
  },
)

// `fill` must be rename internally to avoid conflict with the native `fill` DOM attribute
const PageContent: React.SFC<Props> = ({ fill, ...props }) => <StyledPageContent {...props} isFill={fill} />

export default PageContent
