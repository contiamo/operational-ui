import { keyframes } from "@emotion/core"
import * as React from "react"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"

export interface HugeCatPictureProps {
  /** How big the picture should be */
  size: number
  /** The color of the border */
  borderColor?: string
  /** Should the cat spin?  */
  spin?: boolean
}

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
`

const Container = styled("div")<HugeCatPictureProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 4px solid ${({ borderColor, theme }) => (borderColor ? expandColor(theme, borderColor) : "black")};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
  animation: ${({ spin }) => (spin ? `${spinAnimation.name} 3s infinite linear;` : "")};
  > img {
    height: 100%;
  }

  ${spinAnimation.styles}
`

export const HugeCatPicture: React.FC<HugeCatPictureProps> = props => {
  const [photoUrl, setPhotoUrl] = React.useState("")

  // console.log(`spin:${props.spin}`)

  React.useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=1&order=Random&size=small&page=1&sub_id=demo-bc30a9")
      .then(response => response.json())
      .then(resultArray => {
        setPhotoUrl(resultArray[0].url)
      })
  }, [])

  return <Container {...props}>{Boolean(photoUrl) && <img alt="Cat" src={photoUrl} />}</Container>
}

export default HugeCatPicture
