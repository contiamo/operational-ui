import nanoid from "nanoid"
import { useRef } from "react"

export const useUniqueId = (defaultId: string | null = null) => {
  const id = useRef(defaultId)
  if (!id.current) {
    // @ts-ignore this is not read-only
    id.current = nanoid()
  }
  return id.current as string
}
