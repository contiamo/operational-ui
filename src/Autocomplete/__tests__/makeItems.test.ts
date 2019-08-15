import { makeItems } from "../Autocomplete.utils"
import { NoIcon, AddIcon } from "../../Icon"

describe("Autocomplete", () => {
  it("should create items with an appropriate shape for usage given a value and a result set", () => {
    const mockOnClick = jest.fn()
    expect(
      makeItems({
        value: "Something",
        results: [
          { label: "Hi" },
          { label: "How", value: "are" },
          { label: "you", icon: AddIcon },
          {
            label: "you",
            onClick: mockOnClick,
          },
        ],
      }),
    ).toEqual([
      { label: "Hi" },
      { label: "How", value: "are" },
      { label: "you", icon: AddIcon },
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
        resultIcon: NoIcon,
        results: [
          { label: "Hi" },
          { label: "How", value: "are" },
          { label: "you", icon: AddIcon },
          {
            label: "you",
            onClick: mockOnClick,
          },
        ],
      }),
    ).toEqual([
      { icon: NoIcon, label: "Hi" },
      { icon: NoIcon, label: "How", value: "are" },
      { icon: AddIcon, label: "you" },
      {
        icon: NoIcon,
        label: "you",
        onClick: mockOnClick,
      },
    ])
  })
})
