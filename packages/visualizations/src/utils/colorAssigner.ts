export interface UsageCount {
  [key: string]: number
}

export const colorAssigner = (palette: string[]) => {
  if (palette.length === 0) {
    throw new Error("No color palette defined")
  }

  const assigned: { [key: string]: string } = {}
  const usedColors: string[] = []

  const getColor = (key: string): string => {
    return assigned[key]
  }

  const nextColor = (): string => {
    // Count how many times each colour has been used
    const usageCount: UsageCount = palette.reduce((memo: UsageCount, color: string): UsageCount => {
      memo[color] = 0
      return memo
    }, {})

    usedColors.forEach(
      (color: string): void => {
        usageCount[color] += 1
      },
    )

    const min: number = palette.reduce((memo: number, color: string): number => {
      return memo ? Math.min(memo, usageCount[color]) : usageCount[color]
    }, undefined)

    // Find a color with the minimum usage count
    return palette.find(
      (color: string): boolean => {
        return usageCount[color] === min
      },
    )
  }

  const assignColor = (key: string): string => {
    const color: string = nextColor()
    assigned[key] = color
    usedColors.push(color)
    return color
  }

  return (key: string): string => {
    return getColor(key) || assignColor(key)
  }
}
