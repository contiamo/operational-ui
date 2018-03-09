import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import {
  OperationalUI,
  operationalTheme,
  Input,
  Button,
  Record,
  RecordHeader,
  RecordBody,
  Card,
  Heading1Type,
  CardHeader
} from "../../src/index"

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
        <div style={{ width: 800, height: 800, margin: 20, backgroundColor: "#F1F1F1" }}>
          <Card css={{ width: 400, height: 300, margin: 40 }}>
            <CardHeader>Hello<Button condensed css={{fontSize: 12}} color="info">Create new</Button></CardHeader>
            <Input
              value="1234"
              label="Apple pie!"
              onChange={v => {
                console.log(v)
              }}
            />
          </Card>
        </div>
      </OperationalUI>
    )
  }
}

render(<Site />, document.getElementById("app"))
