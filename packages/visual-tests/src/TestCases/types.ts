import { MarathonEnvironment } from "../Marathon"

export interface TestSuiteGroup {
  title: string
  folder: string
  slug: string
  children: TestSuite[]
}

export interface TestSuite {
  title: string
  slug: string
  marathon: (env: MarathonEnvironment) => void
}

export interface CurrentTestSuite {
  groupIndex: number
  testIndex: number
}
