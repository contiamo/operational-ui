import { makeItems } from "../util/makeItems"

describe("Autocomplete", () => {
  it("should create items with an appropriate shape for usage given a value and a result set", () => {
    const mockOnClick = jest.fn()
    expect(
      makeItems({
        value: "Something",
        results: [
          { label: "Hi" },
          { label: "How", value: "are" },
          { label: "you", icon: "Add" },
          {
            label: "you",
            onClick: mockOnClick,
          },
        ],
      }),
    ).toEqual([
      { label: "Hi" },
      { label: "How", value: "are" },
      { label: "you", icon: "Add" },
      {
        label: "you",
        onClick: mockOnClick,
      },
    ])
  })

  it("should add an icon to each result if specified", () => {
    const mockOnClick = jest.fn()
    expect(
      makeItems({
        value: "Something",
        resultIcon: "No",
        results: [
          { label: "Hi" },
          { label: "How", value: "are" },
          { label: "you", icon: "Add" },
          {
            label: "you",
            onClick: mockOnClick,
          },
        ],
      }),
    ).toEqual([
      { icon: "No", label: "Hi" },
      { icon: "No", label: "How", value: "are" },
      { icon: "Add", label: "you" },
      {
        icon: "No",
        label: "you",
        onClick: mockOnClick,
      },
    ])
  })
})
