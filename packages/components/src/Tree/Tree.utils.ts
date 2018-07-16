/**
 * Adds or removes a path from a list of paths.
 * togglePath([1, 2])([[1, 2, 3], [0]]) -> [[1, 2, 3], [0], [1, 2]]
 * togglePath([1, 2])([[1, 2], [0]]) -> [[0]]
 */
export const togglePath = (path: number[]) => (paths: number[][]): number[][] => {
  if (paths.length === 0) {
    return [path]
  }
  const [head, ...tail] = paths
  if (head.join("") === path.join("")) {
    return tail
  }
  return [head, ...togglePath(path)(tail)]
}

export const containsPath = (path: number[]) => (paths: number[][]): boolean => {
  if (paths.length === 0) {
    return false
  }
  const [head, ...tail] = paths
  if (head.join("") === path.join("")) {
    return true
  }
  return containsPath(path)(tail)
}
