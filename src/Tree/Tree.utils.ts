import { Tree } from "./Tree.types"

export const arePathsEqual = (path1: number[], path2: number[]) => path1.join("-") === path2.join("-")

/**
 * Returns the largest element of an array of numbers, or undefined if the array is empty.
 */
const getMaxFromList = (nos: number[]): number | undefined => {
  if (nos.length === 0) {
    return undefined
  }
  return nos.reduce((accumulator, current) => (accumulator < current ? current : accumulator), -100000)
}

export const getDepth = (tree: Tree): number => {
  if (tree.childNodes.length === 0) {
    return 1
  }
  // Type-casting is necessary because at this point in the function there is a guarantee
  // that tree.childNodes is not empty and therefore it has a maximum value.
  return 1 + (getMaxFromList(tree.childNodes.map(getDepth)) as number)
}

export const getMaxDepth = (trees: Tree[]): number => getMaxFromList(trees.map(getDepth)) || 0

export const getInitialOpenPaths = (basePath: number[]) => (tree: Tree): number[][] => {
  return [
    ...(tree.initiallyOpen ? [basePath] : []),
    ...tree.childNodes.map((childTree, index) =>
      getInitialOpenPaths([...basePath, index])(childTree).reduce(
        (paths, accumulator) => [...paths, ...accumulator],
        [],
      ),
    ),
  ]
}

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
  if (arePathsEqual(head, path)) {
    return tail
  }
  return [head, ...togglePath(path)(tail)]
}

export const containsPath = (path: number[]) => (paths: number[][]): boolean => {
  if (paths.length === 0) {
    return false
  }
  const [head, ...tail] = paths
  if (arePathsEqual(head, path)) {
    return true
  }
  return containsPath(path)(tail)
}
