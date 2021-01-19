import { getInitials } from "../"

describe("text", () => {
  describe("getInitial", () => {
    ;[
      { value: "Tejas Kumar", expected: "TK" },
      { value: "Fabien Bernard", expected: "FB" },
      { value: "Tejas", expected: "T" },
      { value: "Lucrèce Rolland Nevière", expected: "LN" },
      { value: "Jean-pierre Bernard", expected: "JB" },
      { value: " With starting spaces", expected: "WS" },
      { value: "With trailing spaces ", expected: "WS" },
      { value: "", expected: "" },
    ].map(({ value, expected }) =>
      it(`should return ${expected} for ${value}`, () => expect(getInitials(value)).toEqual(expected)),
    )
  })
})
