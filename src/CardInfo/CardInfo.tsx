import * as React from "react"

import Spinner from "../Spinner/Spinner"
import styled from "../utils/styled"

export interface CardInfoProps {
  /** Is something in progress? */
  running?: boolean
}

const Container = styled("div")(
  {
    display: "flex",
    alignItems: "flex-start",
    border: "1px solid",
    wordWrap: "break-word",
    hyphens: "auto",
  },
  ({ theme }) => ({
    background: theme.color.background.lighter,
    borderColor: theme.color.background.light,
    padding: theme.space.medium,
    borderRadius: theme.borderRadius,
    fontSize: theme.font.size.body,
    fontWeight: theme.font.weight.medium,
    lineHeight: theme.font.lineHeight,
    color: theme.color.text.lighter,
  }),
)

const Content = styled("div")({ flexGrow: 1 })

const SpinnerContainer = styled("div")(
  {
    justifySelf: "flex-end",
    marginTop: 4, // precision measurement to align with  text sibling that has line-height 1.4
  },
  ({ theme }) => ({
    marginLeft: theme.space.base,
  }),
)

const CardInfo: React.SFC<CardInfoProps> = ({ children, running }) => (
  <Container>
    <Content>{children}</Content>
    {running && (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )}
  </Container>
)

CardInfo.defaultProps = {
  running: false,
}

export default CardInfo
