import * as React from "react"

const SectionRenderer: React.SFC<any> = ({
  classes,
  name,
  slug,
  content,
  components,
  sections,
  depth,
  description,
  pagePerSection,
}) => (
  <section>
    {name}
    {description && <div>{description}</div>}
    {content}
    {sections}
    {components}
  </section>
)

export default SectionRenderer
