// @flow
import React, { Component } from "react"
import glamorous from "glamorous"

type Props = {
  className?: string,
  placeholder?: string,
  name?: string,
  children?: string,
}

type State = {
  value: string,
}

class Input extends Component<{}, Props, State> {
  state = {
    value: this.props.children || ""
  }

  static defaultProps = {
    className: ""
  }

  updateValue = (e: SyntheticEvent) => {
    const el = { ...e.target }
    this.setState(() => ({ value: el.value }))
  }

  render() {
    return (
      <input
        name={this.props.name}
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={e => this.updateValue(e)}
      />
    )
  }
}

const style = ({ theme }: { theme: THEME }) => ({
  padding: theme.spacing ? theme.spacing / 2 : 8,
  border: "1px solid",
  borderColor: theme.greys ? theme.greys[30] : "#ccc",
  font: "inherit",
  WebkitAppearance: "none"
})

export default glamorous(Input)(style)
export { Input }
