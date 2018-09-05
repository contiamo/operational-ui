import * as React from "react"
import styled from "react-emotion"

import { DefaultProps } from "../types"
import { OperationalStyleConstants } from "../utils/constants"

export interface StyledTextProps extends DefaultProps {
  children: React.ReactNode
}

const baseStyles = (theme: OperationalStyleConstants) => {
  return {
    fontFamily: theme.font.family.main,
    lineHeight: theme.font.lineHeight,
    margin: `0 0 ${theme.space.element}px 0`,
  }
}

const Container = styled("div")(({ theme }) => ({
  "& h1": {
    ...baseStyles(theme),
    fontSize: theme.font.size.title,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.dark,
    width: "100%",
    padding: `0 0 ${theme.space.medium}px 0`,
    borderBottom: `1px solid ${theme.color.separators.default}`,
  },
  "& h2": {
    ...baseStyles(theme),
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.dark,
  },
  "& h3": {
    ...baseStyles(theme),
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.default,
  },
  "& h4, h5, h6": {
    ...baseStyles(theme),
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.default,
    fontStyle: "italic",
  },
  "& p": {
    ...baseStyles(theme),
    fontFamily: theme.font.family.main,
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.regular,
    color: theme.color.text.default,
  },
}))

const StyledText: React.SFC<StyledTextProps> = ({ children }) => <Container>{children}</Container>

export default StyledText
