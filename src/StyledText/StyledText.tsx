import * as React from "react"
import styled from "react-emotion"

import { DefaultProps } from "../types"

export interface StyledTextProps extends DefaultProps {
  children: React.ReactNode
}

const Container = styled("div")(({ theme }) => ({
  fontFamily: theme.font.family.main,
  "& h1": {
    fontSize: theme.font.size.title,
    fontWeight: theme.font.weight.medium,
    lineHeight: theme.font.lineHeight,
    color: theme.color.text.dark,
    width: "100%",
    margin: `0 0 ${theme.space.element}px 0`,
    padding: `0 0 ${theme.space.medium}px 0`,
    borderBottom: `1px solid ${theme.color.separators.default}`,
  },
  "& h2, h3, h4, h5, h6": {
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.medium,
    lineHeight: theme.font.lineHeight,
    color: theme.color.text.dark,
    margin: `0 0 ${theme.space.element}px 0`,
  },
  "& p": {
    fontFamily: theme.font.family.main,
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.regular,
    lineHeight: theme.font.lineHeight,
    color: theme.color.text.default,
    margin: `0 0 ${theme.space.element}px 0`,
  },
}))

const StyledText: React.SFC<StyledTextProps> = ({ children }) => <Container>{children}</Container>

export default StyledText
