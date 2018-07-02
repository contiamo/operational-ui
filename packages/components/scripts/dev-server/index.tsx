import * as React from "react"
import { render } from "react-dom"

import { OperationalUI, ContextConsumer, Button, Context } from "../../src"

render(
  <OperationalUI withBaseStyles>
    <ContextConsumer>
      {(ctx: Context) => (
        <>
          <Button
            color="primary"
            onClick={() => {
              ctx.pushMessage({
                body: "Message",
                type: "info",
              })
            }}
          >
            Add msg
          </Button>
        </>
      )}
    </ContextConsumer>
  </OperationalUI>,
  document.querySelector("#app"),
)
