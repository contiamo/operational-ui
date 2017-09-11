import * as React from "react"
import glamorous from "glamorous"

type Props = {
  className?: string
  placeholder?: string
  name?: string
  children?: string
  theme?: Theme,
}

type State = {
  value: string,
}

class Input extends React.Component<Props, State> {
  state = {
    value: this.props.children || "",
  }

  static defaultProps = {
    className: "",
  }

  updateValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    this.setState(() => ({ value }))
  }

  render() {
    return (
      <input
        className={this.props.className}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={e => this.updateValue(e)}
      />
    )
  }
}

const style = ({ theme }: Props) => ({
  padding: theme.spacing ? theme.spacing / 2 : 8,
  border: "1px solid",
  borderColor: theme.greys ? theme.greys[30] : "#ccc",
  font: "inherit",
  WebkitAppearance: "none",
})

export default glamorous(Input)(style)
export { Input }
