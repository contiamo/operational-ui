import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  theme: Theme
}

const TitleType: GlamorousComponent<{}, {}> = glamorous.h1(({ theme }: IProps): any => theme.typography.title)

const Heading1Type: GlamorousComponent<{}, {}> = glamorous.h1(({ theme }: IProps): any => theme.typography.heading1)

const Heading2Type: GlamorousComponent<{}, {}> = glamorous.h2(({ theme }: IProps): any => theme.typography.heading2)

const BodyType: GlamorousComponent<{}, {}> = glamorous.p(({ theme }: IProps): any => theme.typography.body)

const SmallType: GlamorousComponent<{}, {}> = glamorous.p(({ theme }: IProps): any => theme.typography.small)

export { TitleType, Heading1Type, Heading2Type, BodyType, SmallType }
