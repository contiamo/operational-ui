type usageCountType = {
  [key: string]: number
}

export const colorAssigner = (palette: Array<string>) => {
  if (palette.length === 0) {
    throw new Error("No color palette defined")
  }

  let assigned: { [key: string]: string } = {}
  let usedColors: Array<string> = []

  const getColor = (key: string): string => {
    return assigned[key]
  }

  const nextColor = (): string => {
    // Count how many times each colour has been used
    let usageCount: usageCountType = palette.reduce((memo: usageCountType, color: string): usageCountType => {
      memo[color] = 0
      return memo
    }, {})

    usedColors.forEach((color: string): void => {
      usageCount[color] += 1
    })

    const min: number = palette.reduce((memo: number, color: string): number => {
      memo = memo ? Math.min(memo, usageCount[color]) : usageCount[color]
      return memo
    }, undefined)

    // Find a color with the minimum usage count
    return palette.find((color: string): boolean => {
      return usageCount[color] === min
    })
  }

  const addAssignment = (key: string, color: string): string => {
    assigned[key] = color
    usedColors.push(color)
    return color
  }

  const assignColor = (key: string, color?: string): string => {
    // @TODO color must be a hex
    return addAssignment(key, color || nextColor())
  }

  return (key: string, color?: string): string => {
    return getColor(key) || assignColor(key, color)
  }
}
