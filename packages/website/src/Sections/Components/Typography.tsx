import * as React from "react"
import { Title, Heading1, Heading2, Body, Small } from "@operational/components"
import * as constants from "../../constants"

export const title = "Typography"

export const docsUrl = `${constants.docsBaseUrl}/#typography`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Typography.tsx`

export const Component = () => (
  <>
    <Title>Title</Title>
    <Heading1>Heading1</Heading1>
    <Heading2>Heading2</Heading2>
    <Body>Body</Body>
    <Small>Small</Small>
  </>
)
