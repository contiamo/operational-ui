import { MarathonEnvironment } from "../components/Marathon"

export interface TestSuiteGroup {
  title: string
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
