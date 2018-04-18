import * as React from "react"
import glamorous from "glamorous"
import { Button } from "@operational/components"
import { operational } from "@operational/theme"

export const title = "Colors"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/context-menu.md"

export const Component = () => (
  <React.Fragment>
    <div>
      <Button color="info">{`info / ${operational.colors.info}`}</Button>
      <Button color="navBackground">{`nav / ${operational.colors.navBackground}`}</Button>
      <Button color="background">{`background / ${operational.colors.background}`}</Button>
    </div>
    <div>
      <Button color="success">{`success / ${operational.colors.success}`}</Button>
      <Button color="warning">{`warning / ${operational.colors.warning}`}</Button>
      <Button color="error">{`error / ${operational.colors.error}`}</Button>
    </div>
    <div>
      <Button color="gray">{`gray / ${operational.colors.gray}`}</Button>
      <Button color="lightGray">{`lightGray / ${operational.colors.lightGray}`}</Button>
      <Button color="border">{`border / ${operational.colors.border}`}</Button>
      <Button color="separator">{`separator / ${operational.colors.separator}`}</Button>
    </div>
  </React.Fragment>
)
