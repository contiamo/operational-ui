import * as React from "react"

import Spinner from "../Spinner/Spinner"
import styled from "../utils/styled"

export interface CardInfoProps {
  /** Is something in progress? */
  running?: boolean
}

const Container = styled("div")(
  {
    position: "relative",
    border: "1px solid",
  },
  ({ theme }) => ({
    background: theme.color.background.lighter,
    borderColor: theme.color.background.light,
    padding: theme.space.content,
    borderRadius: theme.borderRadius,
  }),
)

const SpinnerContainer = styled("div")({ position: "absolute" }, ({ theme }) => ({
  top: theme.space.content,
  right: theme.space.content,
}))

const CardInfo: React.SFC<CardInfoProps> = ({ children, running }) => (
  <Container>
    {running && (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )}
    {children}
  </Container>
)

CardInfo.defaultProps = {
  running: false,
}

export default CardInfo
