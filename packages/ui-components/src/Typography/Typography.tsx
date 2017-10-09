import * as React from "react"
import glamorous from "glamorous"

const TitleType = glamorous.h1({}, ({ theme }: { theme: Theme }): any => theme.typography.title)

const Heading1Type = glamorous.h1({}, ({ theme }: { theme: Theme }): any => theme.typography.heading1)

const Heading2Type = glamorous.h2({}, ({ theme }: { theme: Theme }): any => theme.typography.heading2)

const BodyType = glamorous.p({}, ({ theme }: { theme: Theme }): any => theme.typography.body)

const SmallType = glamorous.p({}, ({ theme }: { theme: Theme }): any => theme.typography.small)

export { TitleType, Heading1Type, Heading2Type, BodyType, SmallType }
