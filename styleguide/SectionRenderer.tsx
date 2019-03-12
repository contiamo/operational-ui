import React from "react"
// @ts-ignore
import Styled from "react-styleguidist/lib/client/rsg-components/Styled/Styled"
import { Card } from "../src"

/* tslint:disable:no-var-requires */
const SectionHeading = require("react-styleguidist/lib/client/rsg-components/SectionHeading")
const Markdown = require("react-styleguidist/lib/client/rsg-components/Markdown")

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
  const { classes, name, slug, content, components, sections, depth, description, pagePerSection } = allProps

  const heading = name && (
    <SectionHeading
      depth={depth}
      id={slug}
      slotName="sectionToolbar"
      pagePerSection={pagePerSection}
      slotProps={allProps}
    >
      {name}
    </SectionHeading>
  )

  return (
    <section className={classes.root}>
      {!content && heading}

      {description && <Markdown text={description} />}
      {/* content is a raw MD file */}
      {content && <Card title={name}>{content}</Card>}
      {sections}
      {components}
    </section>
  )
}

export default Styled(styles)(SectionRenderer)
