import styled from "react-emotion"

export const Form = styled("form")({
  "> *:not(:last-child)": {
    marginBottom: 34,
    display: "block",
    width: "fit-content",
  },
})

export default Form
