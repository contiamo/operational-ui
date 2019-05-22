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

  console.warn(
    "Attempting to truncate something that is not a JS primitive: this will fail for functions, objects and arrays. Please reconsider the item you are truncating:",
    thingToTruncate,
  )
  return thingToTruncate
}
