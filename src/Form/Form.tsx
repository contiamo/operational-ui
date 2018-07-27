import styled from "../utils/styled"

export const Form = styled("form")({
  "> *:not(:last-child)": {
    marginBottom: 34,
    display: "block",
    width: "fit-content",
  },
})

export default Form
