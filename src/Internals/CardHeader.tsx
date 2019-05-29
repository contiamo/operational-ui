import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { SectionHeader } from "./SectionHeader"

export interface CardHeaderProps extends DefaultProps {
  /** As title, please note that is override by `title` if provided */
  children?: React.ReactNode
  /** Main title */
  title?: React.ReactNode
  /** Action part (right side), this is typically where to put a button */
  action?: React.ReactNode
}

const Container = styled(SectionHeader)(({ theme }) => ({
  borderBottom: `1px solid ${theme.color.separators.default}`,
  "& > :not(:first-child)": {
    fontSize: theme.font.size.fineprint,
    color: theme.color.text.lightest,
  },

  /**
   * Use case: External Links typically have <Icon/>s next to them.
   */
  "& a": {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
  },
}))

const ActionsContainer = styled("div")`
  display: flex;
  align-items: center;
  > :last-child {
    margin-right: 0;
  }
`

const CardHeader: React.SFC<CardHeaderProps> = ({ title, children, action, ...props }) => (
  <Container {...props}>
    <div>{title || children}</div>
    <ActionsContainer>{action}</ActionsContainer>
  </Container>
)

export default CardHeader
