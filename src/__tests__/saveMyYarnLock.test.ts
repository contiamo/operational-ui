import { existsSync } from "fs"
import { join } from "path"

describe("yarn.lock", () => {
  it("should have a yarn.lock", () => {
    const yarnLockPath = join(__dirname, "../../yarn.lock")
    expect(existsSync(yarnLockPath)).toBe(true)
  })
})
