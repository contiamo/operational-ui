import { readdirSync, readFileSync } from "fs"
import { join } from "path"

const BLACK_LIST = ["Internals", "utils", "__tests__", "polyfills.ts", "index.ts", ".DS_Store"]

describe("lib exports", () => {
  const mainExport = readFileSync(join(__dirname, "../index.ts"), "utf-8")

  readdirSync(join(__dirname, "../"))
    .filter(name => !BLACK_LIST.includes(name))
    .forEach(name => {
      it(`should export ${name} component into index.ts`, () => {
        expect(mainExport.includes(name)).toBe(true)
      })
    })
})
