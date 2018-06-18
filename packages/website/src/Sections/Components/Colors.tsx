import * as React from "react"
import glamorous from "glamorous"
import { Button } from "@operational/components"
import { constants as styleConstants } from "@operational/theme"
import * as constants from "../../constants"

export const title = "Colors"

export const docsUrl = `${constants.docsBaseUrl}/#colors`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Colors.tsx`

export const Component = () => (
  <>
    <div>
      <Button condensed color="primary">{`primary / ${styleConstants.color.primary}`}</Button>
      <Button condensed color="disabled">{`disabled / ${styleConstants.color.disabled}`}</Button>
    </div>
    <div>
      <Button condensed color="success">{`success / ${styleConstants.color.success}`}</Button>
      <Button condensed color="error">{`error / ${styleConstants.color.error}`}</Button>
    </div>
    <div>
      <Button condensed color="basic">{`basic / ${styleConstants.color.basic}`}</Button>
      <Button condensed color="ghost">{`ghost / ${styleConstants.color.ghost}`}</Button>
    </div>
    <div>
      <Button condensed color="white">{`white / ${styleConstants.color.white}`}</Button>
      <Button condensed color="black">{`black / ${styleConstants.color.black}`}</Button>
    </div>
  </>
)
