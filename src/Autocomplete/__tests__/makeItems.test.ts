import { makeItems } from "../Autocomplete.utils"
import { IconNo, IconAdd } from "../../Icon/Icon"

describe("Autocomplete", () => {
  it("should create items with an appropriate shape for usage given a value and a result set", () => {
    const mockOnClick = jest.fn()
    expect(
      makeItems({
        value: "Something",
        results: [
          { label: "Hi" },
          { label: "How", value: "are" },
          { label: "you", icon: IconAdd },
          {
            label: "you",
            onClick: mockOnClick,
          },
        ],
      }),
    ).toEqual([
      { label: "Hi" },
      { label: "How", value: "are" },
      { label: "you", icon: IconAdd },
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
        resultIcon: IconNo,
        results: [
          { label: "Hi" },
          { label: "How", value: "are" },
          { label: "you", icon: IconAdd },
          {
            label: "you",
            onClick: mockOnClick,
          },
        ],
      }),
    ).toEqual([
      { icon: IconNo, label: "Hi" },
      { icon: IconNo, label: "How", value: "are" },
      { icon: IconAdd, label: "you" },
      {
        icon: IconNo,
        label: "you",
        onClick: mockOnClick,
      },
    ])
  })
})
