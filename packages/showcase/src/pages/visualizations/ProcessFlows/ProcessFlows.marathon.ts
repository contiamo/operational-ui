import { IMarathon } from "../../../components/Marathon/Marathon"

const marathon = ({ test, beforeAll, afterAll, expect, container }: IMarathon): void => {
  beforeAll(() => {
    const p = document.createElement("p")
    p.innerText = "Hello"
    container.appendChild(p)
  })

  afterAll(() => {
    container.innerHTML = ""
  })

  test("Renders paragraph with 'Hello' inside", () => {
    expect(container.querySelector("p").innerText).toBe("Hello")
  })

  test("Changes 'Hello' to 'Hello2'", () => {
    container.querySelector("p").innerText = "Hello3"
    expect(container.querySelector("p").innerText).toBe("Hello2")
  })

  test("Tests whether 2 is still equal to 2", () => {
    expect(2).toBe(2)
  })
}

export default marathon
