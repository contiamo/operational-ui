import React from "react"
import glamorous, { CSSProperties, Div } from "glamorous"
import { Theme } from "@operational/theme"

export type WithTheme = { theme: Theme }

export interface AvatarProps {
  name: string
  withName?: boolean
  photo?: string
  css?: CSSProperties | (<T>(props: T & WithTheme) => CSSProperties)
  size?: number
}

const Avatar = ({ name, photo, css, withName = false, size = 50 }: AvatarProps): React.ReactElement<AvatarProps> => {
  const Container = withName
    ? glamorous.div(
        {
          display: "flex",
          alignItems: "center",
        },
        css
      )
    : glamorous.div(
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "50%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textTransform: "uppercase",
        },
        ({ theme }: Partial<AvatarProps> & WithTheme): CSSProperties => ({
          width: size,
          height: size,
          backgroundColor: theme.colors.gray,
          backgroundImage: photo ? `url(${photo})` : "none",
        })
      )
  const PictureContainer = glamorous.div(({ theme }: WithTheme) => ({ marginRight: theme.spacing / 2 }))

  const getInitials = (name: string): string => {
    if (!name) {
      return ""
    }
    const splitName = name.split(" ")
    return splitName[0].slice(0, 1) + splitName[splitName.length - 1].slice(0, 1)
  }

  return withName ? (
    <Container>
      <PictureContainer>
        <Avatar name={name} photo={photo} size={size} />
      </PictureContainer>
      <Div>{name}</Div>
    </Container>
  ) : (
    <Container css={css} size={size}>
      {!photo && getInitials(name)}
    </Container>
  )
}

export default Avatar
