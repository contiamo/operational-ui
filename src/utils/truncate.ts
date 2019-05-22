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

  return thingToTruncate
}
