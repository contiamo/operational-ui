import { getInitials } from "../Avatar/Avatar"

describe("Avatar", () => {
  describe("getInitial", () => {
    ;[
      { value: "Tejas Kumar", expected: "TK" },
      { value: "Fabien Bernard", expected: "FB" },
      { value: "Tejas", expected: "T" },
      { value: "Lucrèce Rolland Nevière", expected: "LN" },
      { value: "Jean-pierre Bernard", expected: "JB" },
    ].map(({ value, expected }) =>
      it(`should return ${expected} for ${value}`, () => expect(getInitials(value)).toEqual(expected)),
    )
  })
})
