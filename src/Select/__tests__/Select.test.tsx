import {
  appendItem,
  filterList,
  getDisplayValue,
  getNewValue,
  isOptionSelected,
  optionsToContextMenuItems,
  prependItem,
  truncateList,
} from "../Select.util"
import { IOption } from "../Select.types"

describe("Select component utilities", () => {
  const defaultOptionValue = "🇪🇸🌍 queso"
  const myOptions: IOption[] = [{ label: "Hola Mundo", value: defaultOptionValue }]
  const longTestOptions: IOption[] = [
    ...Array.from({ length: 100 }, (_, index) => ({ label: String(index), value: index })),
    ...myOptions,
    ...myOptions,
    ...myOptions,
  ]

  it("should convert options to context menu items", () => {
    const mockFn = jest.fn
    expect(optionsToContextMenuItems(() => ({ onClick: mockFn }))(myOptions)).toEqual([
      { label: "Hola Mundo", value: defaultOptionValue, onClick: mockFn },
    ])
  })

  it("should prepend an option to an existing list of options", () => {
    expect(prependItem({ icon: "Add", label: "Sup" })(optionsToContextMenuItems()(myOptions))).toEqual([
      { icon: "Add", label: "Sup" },
      { label: "Hola Mundo", value: defaultOptionValue },
    ])
  })
  it("should append an option to an existing list of options", () => {
    expect(appendItem({ icon: "Add", label: "Sup" })(optionsToContextMenuItems()(myOptions))).toEqual([
      { label: "Hola Mundo", value: defaultOptionValue },
      { icon: "Add", label: "Sup" },
    ])
  })
  it("should filter an existing list of options based on their label", () => {
    expect(filterList("hol")(longTestOptions)).toEqual([
      { label: "Hola Mundo", value: defaultOptionValue },
      { label: "Hola Mundo", value: defaultOptionValue },
      { label: "Hola Mundo", value: defaultOptionValue },
    ])
  })
  it("should truncate a list of options", () => {
    expect(truncateList(2)(longTestOptions)).toEqual([{ label: "0", value: 0 }, { label: "1", value: 1 }])
  })
  it("should truncate a list of options while respecting filters", () => {
    expect(truncateList(2)(filterList("hol")(longTestOptions))).toEqual([
      { label: "Hola Mundo", value: defaultOptionValue },
      { label: "Hola Mundo", value: defaultOptionValue },
    ])
  })
  it("should get a display value from a custom input value", () => {
    const customInputSymbol = Symbol("lol")
    expect(getDisplayValue(customInputSymbol, "hello", customInputSymbol)).toEqual("hello")
  })
  it("should get a display value from a multi-select value", () => {
    expect(getDisplayValue(["my name is earl", "what's your name", "follow @hackSultan"])).toEqual(
      "my name is earl, what's your name, follow @hackSultan",
    )
  })
  it("should get a display value from a value that is null or not yet initialized", () => {
    expect(getDisplayValue(null)).toEqual("")
  })
  it("should get a display value from a primitive string value", () => {
    expect(getDisplayValue("cheese is my friend")).toEqual("cheese is my friend")
  })
  it("should get a display value from a numeric value", () => {
    expect(getDisplayValue(4)).toEqual("4")
  })
  it("should get a changed value when a basic value changes", () => {
    expect(getNewValue("cheese")("hola")).toEqual("hola")
  })
  it("should get a correct changed value when a multi-select option is added", () => {
    expect(getNewValue(["Voss", "rocks"])("Laurie")).toEqual(["Voss", "rocks", "Laurie"])
  })
  it("should get a correct changed value when a multi-select option is removed", () => {
    expect(getNewValue(["Laurie", "Voss", "rocks"])("Laurie")).toEqual(["Voss", "rocks"])
  })
  it("should be able to tell if an option is selected", () => {
    expect(isOptionSelected("chickens")({ label: "I am not a chicken", value: "what's up" })).toEqual(false)
    expect(isOptionSelected("chickens")({ label: "I am not a chicken", value: "chickens" })).toEqual(true)
  })
  it("should be able to tell if multi-select options are selected", () => {
    expect(isOptionSelected(["chickens", "cheese"])({ label: "I am not a chicken", value: "what's up" })).toEqual(false)
    expect(isOptionSelected(["chickens", "cheese"])({ label: "I am not a chicken", value: "chickens" })).toEqual(true)
  })
})
