import { TestSuiteGroup, CurrentTestSuite } from "./types"

/*
 * Returns the index of the first element that matches a condition.
 */
const findIndex = (condition: (member: any, index: number) => boolean) => (array: any[]): number | null => {
  const match = array
    .map((member, index) => (condition(member, index) ? [member, index] : null))
    .find(memberWithIndex => memberWithIndex !== null)
  if (!match) {
    return null
  }
  return match[1] as number
}

export const fromHash = (hash: string) => (testGroups: TestSuiteGroup[]): CurrentTestSuite | null => {
  const [groupSlug, testSlug] = window.location.hash
    .slice(1)
    .split("/")
    .filter(chunk => chunk !== "")
  if (!groupSlug || !testSlug) {
    return null
  }
  const groupIndex = findIndex((testCase, index) => testCase.slug === groupSlug)(testGroups)
  if (groupIndex === null) {
    return
  }
  const group = testGroups[groupIndex] as any
  const testIndex = findIndex(({ slug }, index) => slug === testSlug)(group.children)
  if (testIndex === null) {
    return
  }
  return {
    groupIndex,
    testIndex,
  }
}

export const toHash = (currentTestSuite: CurrentTestSuite) => (testGroups: TestSuiteGroup[]): string => {
  const hash = `#${testGroups[currentTestSuite.groupIndex].slug}/${
    testGroups[currentTestSuite.groupIndex].children[currentTestSuite.testIndex].slug
  }`
  return hash
}
