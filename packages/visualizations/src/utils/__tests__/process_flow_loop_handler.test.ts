import loopHandler from "../process_flow_loop_handler"

describe("process flow loop handler", () => {
  it("loops in single path", () => {
    expect(loopHandler([{ size: 1, path: ["a", "b", "c", "d", "c", "a", "b"] }])).toEqual([
      { size: 1, path: ["a", "b", "c", "d", "c+", "a+", "b+"] },
    ])
  })

  it("loops in multiple paths", () => {
    expect(loopHandler([{ size: 1, path: ["a", "b", "c", "d"] }, { size: 1, path: ["a", "b", "d", "c"] }])).toEqual([
      { size: 1, path: ["a", "b", "c", "d"] },
      { size: 1, path: ["a", "b", "d", "c+"] },
    ])
  })

  it("repeated nodes", () => {
    expect(loopHandler([{ size: 1, path: ["a", "a", "a", "a"] }])).toEqual([
      { size: 1, path: ["a", "a+", "a++", "a+++"] },
    ])
  })
})
