import * as React from "react"

import Spinner from "../Spinner/Spinner"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface InfoPanelProps extends DefaultProps {
  /** Is something in progress? */
  loading?: boolean
}

const Container = styled("div")(
  {
    display: "flex",
    alignItems: "flex-start",
    border: "1px solid",
    wordWrap: "break-word",
    hyphens: "auto",
    wordBreak: "break-all", // fallback for older browsers
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
    marginLeft: theme.space.small,
  }),
)

const InfoPanel: React.SFC<InfoPanelProps> = ({ children, loading }) => (
  <Container>
    <Content>{children}</Content>
    {loading && (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )}
  </Container>
)

InfoPanel.defaultProps = {
  loading: false,
}

export default InfoPanel
