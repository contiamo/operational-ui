import React from "react"
import Styled from "react-styleguidist/lib/client/rsg-components/Styled/Styled"
import Markdown from "react-styleguidist/lib/client/rsg-components/Markdown"

import { Card, Page } from "../src"

// Ref https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/Section/SectionRenderer.js
// This is needed to wrap raw MD files (that get passed into the content prop within the styleconfig) in a Card.
// This will also be a good place to

const styles = ({ space }: { space: string[] }) => ({
  root: {
    marginBottom: space[4],
  },
})

interface SectionProps {
  classes: { root: string }
  name?: string
  slug?: string
  filepath?: string
  content: React.ReactNode
  components: React.ReactNode
  sections: React.ReactNode
  depth: number
  description?: string
  pagePerSection: boolean
}

export function SectionRenderer(allProps: SectionProps) {
  const { classes, name, content, components, sections, description } = allProps

  return (
    <section className={classes.root}>
      {Boolean(description) && <Markdown text={description} />}
      {/* content is a raw MD file */}
      {Boolean(content) && <Page title={name}>{content}</Page>}
      {sections}
      {components}
    </section>
  )
}

export default Styled(styles)(SectionRenderer)
