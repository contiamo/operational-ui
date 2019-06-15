import React, { useContext } from "react"
import { HeaderBar, Logo, styled, Button, MaterializationIcon, NoIcon } from "../src"
import { StyleguideContext } from "./StyleguideContext"

const VersionContainer = styled("div")`
  font-size: 16px;
  font-weight: bold;
  margin-right: ${({ theme }) => theme.space.content}px;
`
const Header: React.FC<{ version: string }> = ({ version }) => {
  const [{ isDiffWithMaster }, dispatch] = useContext(StyleguideContext)

  return (
    <HeaderBar
      logo={<Logo name="OperationalUI" />}
      end={
        <>
          <VersionContainer>v{version}</VersionContainer>
          {window.location.host.startsWith("deploy-preview") && (
            <Button
              textColor={isDiffWithMaster ? "error" : undefined}
              color={isDiffWithMaster ? undefined : "primary"}
              icon={isDiffWithMaster ? NoIcon : MaterializationIcon}
              iconPosition="start"
              condensed
              onClick={() => dispatch({ type: "toggle master diff" })}
            >
              {isDiffWithMaster ? "Close diff" : "Diff with master"}
            </Button>
          )}
        </>
      }
    />
  )
}

export default Header
