let didWarn = false

export const truncate = (length: number) => (thingToTruncate: any) => {
  if (["string", "number"].includes(typeof thingToTruncate)) {
    const stringifiedValue = String(thingToTruncate)
    const truncatedValue = String(thingToTruncate).slice(0, length)
    if (stringifiedValue.length === truncatedValue.length) {
      return thingToTruncate
    } else {
      return truncatedValue + "…"
    }
  }

  if (!didWarn && process.env.NODE_ENV !== "development") {
    console.warn(
      "Attempting to truncate something that is noxt a JS primitive: this will fail for functions, objects and arrays. Please reconsider the item you are truncating:",
      thingToTruncate,
    )
    didWarn = true
  }

  return thingToTruncate
}
