import nanoid from "nanoid"
import { useState } from "react"

export const useUniqueId = (defaultId: string | null = null) => useState(defaultId || nanoid)[0] as string
