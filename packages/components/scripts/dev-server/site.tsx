import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, operationalTheme, Record, RecordHeader, RecordBody, Card, Heading1Type } from "../../src/index"

interface IState {
  isOpen: boolean
}

const Records = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > *": {
    marginTop: -1
  }
}))

class Site extends React.Component<{}, IState> {
  state = {
    isOpen: false
  }
  render() {
    return (
      <OperationalUI>
        <div style={{ margin: 20 }}>
          <Card>
            <Heading1Type>Stuff</Heading1Type>
            <Records>
              <Record css={{ width: 300 }} controls={"Hello"}>
                <RecordHeader>Hello</RecordHeader>
                <RecordBody>Hello</RecordBody>
              </Record>
              <Record css={{ width: 300 }}>
                <RecordHeader>Hello</RecordHeader>
                <RecordBody>Hello</RecordBody>
              </Record>
              <Record css={{ width: 300 }}>
                <RecordHeader>Hello</RecordHeader>
                <RecordBody>Hello</RecordBody>
              </Record>
              <Record css={{ width: 300 }}>
                <RecordHeader>Hello</RecordHeader>
                <RecordBody>Hello</RecordBody>
              </Record>
              <Record css={{ width: 300 }}>
                <RecordHeader>Hello</RecordHeader>
                <RecordBody>Hello</RecordBody>
              </Record>
            </Records>
          </Card>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
