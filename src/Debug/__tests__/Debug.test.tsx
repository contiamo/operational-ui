import { makeRowsFromConfig } from "../makeRowsFromConfig"

describe("Debug Viewer", () => {
  it("Should handle no data well", () => {
    expect(makeRowsFromConfig({})).toMatchInlineSnapshot(`Array []`)
  })

  it("Should create table rows from config values", () => {
    const myConfig = {
      name: "Tejas",
      race: "Indian",
      loves: "Everyone",
    }

    expect(makeRowsFromConfig(myConfig)).toMatchInlineSnapshot(`
Array [
  <tr>
    <td>
      Name
    </td>
    <td>
      Tejas
    </td>
  </tr>,
  <tr>
    <td>
      Race
    </td>
    <td>
      Indian
    </td>
  </tr>,
  <tr>
    <td>
      Loves
    </td>
    <td>
      Everyone
    </td>
  </tr>,
]
`)
  })

  it("Should handle JSON in config values", () => {
    const myConfig = {
      name: { first: "Tejas", last: "Kumar" },
      race: "Indian",
      loves: "Everyone",
    }

    expect(makeRowsFromConfig(myConfig)).toMatchInlineSnapshot(`
Array [
  <React.Fragment>
    <tr>
      <td
        colSpan={2}
      >
        Name
      </td>
    </tr>
    <tr>
      <td
        colSpan={2}
      >
        <ForwardRef(render)
          codeTheme={
            Object {
              "base00": "transparent",
              "base02": "transparent",
              "base04": "cyan",
              "base07": "orange",
              "base09": "white",
            }
          }
          src={
            Object {
              "first": "Tejas",
              "last": "Kumar",
            }
          }
          syntax="json"
        />
      </td>
    </tr>
  </React.Fragment>,
  <tr>
    <td>
      Race
    </td>
    <td>
      Indian
    </td>
  </tr>,
  <tr>
    <td>
      Loves
    </td>
    <td>
      Everyone
    </td>
  </tr>,
]
`)
  })
})
