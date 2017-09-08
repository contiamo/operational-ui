import * as React from "react"
import glamorous from "glamorous"

import SelectOption from "./Option/SelectOption"
import SelectFilter from "./Filter/SelectFilter"

import style from "./Select.style"

export interface option {
  label: string
  id?: number
  value?: any
  placeholder?: boolean
}

type Props = {
  className?: string
  placeholder?: string | boolean
  options: Array<option>
  filterable?: boolean
  disabled?: boolean
  multiple?: boolean
  onClick?: () => void
  onFilter?: () => void
}

type State = {
  open: boolean
  updating: boolean
  value: option | Array<option>
  filter: RegExp
}

class Select extends React.Component<Props, State> {
  static defaultProps = {
    className: "",
    filterable: false,
    disabled: false,
    multiple: false,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      updating: false,
      value: this.getInitialValue(),
      filter: new RegExp(/./),
    }
  }

  // flow complains if this isn't initialized sooo...
  container: HTMLDivElement | null

  // This implements "click outside to close" behavior
  handleClick = (e: MouseEvent) => {
    const el = this.container

    // if we're somehow not working with a DOM node (flowtype is fun!)
    if (!(e.target instanceof Node)) {
      return
    }
    // if we're clicking on the Select itself,
    if (el && el.contains(e.target)) {
      return
    }

    // if we're clicking outside,
    this.close()
  }

  handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick, true)
    window.addEventListener("keyup", this.handleEsc, true)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick, true)
    window.removeEventListener("keyup", this.handleEsc, true)
  }

  getInitialValue(): option | option[] {
    if (!this.props.multiple) {
      return typeof this.props.placeholder === "string"
        ? { label: this.props.placeholder }
        : { label: "" }
    }

    return typeof this.props.placeholder === "string"
      ? [{ placeholder: true, label: this.props.placeholder }]
      : [{ placeholder: true, label: "" }]
  }

  getDisplayValue(): string {
    if (!this.props.multiple) {
      if (
        !Array.isArray(this.state.value) &&
        typeof this.state.value.label === "string"
      ) {
        return this.state.value.label
      } else {
        return typeof this.props.placeholder === "string"
          ? this.props.placeholder
          : ""
      }
    }

    if (!(this.state.value instanceof Array)) {
      throw new Error(
        "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
      )
    }

    return [...this.state.value.map(option => option.label)].join(", ")
  }

  selectOption(option: option) {
    if (!this.props.multiple) {
      this.setState(() => ({ value: option }))
      return
    }

    if (!(this.state.value instanceof Array)) {
      throw new Error(
        "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
      )
    }

    const optionIndex: number = this.state.value.indexOf(option)

    if (optionIndex < 0) {
      this.setState((prevState: State) => {
        if (Array.isArray(prevState.value)) {
          return {
            value: [...prevState.value, option].filter(
              item => !item.placeholder
            ),
          }
        } else {
          throw new Error(
            "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
          )
        }
      })
    } else {
      this.setState(prevState => {
        if (Array.isArray(prevState.value)) {
          return {
            value: [
              ...prevState.value.slice(0, optionIndex),
              ...prevState.value.slice(optionIndex + 1),
            ],
          }
        } else {
          throw new Error(
            "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
          )
        }
      })
    }
  }

  isOptionSelected(option: option) {
    if (!this.props.multiple) {
      return this.state.value === option
    }

    if (!(this.state.value instanceof Array)) {
      throw new Error(
        "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
      )
    }

    return this.state.value.indexOf(option) > -1
  }

  async updateFilter(event: React.SyntheticEvent<HTMLInputElement>) {
    event.persist()

    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error(
        "<Select>: Your filter field is _not_ an input element and therefore has an unreadable value."
      )
    }

    if (this.props.onFilter) {
      this.setState(() => ({ updating: true }))
      await this.props.onFilter()
    }

    const filter = new RegExp(event.target.value, "i")
    this.setState(() => ({ updating: false, filter }))
  }

  async toggle() {
    if (!this.state.open && this.props.onClick) {
      this.setState(() => ({ updating: true }))
      await this.props.onClick()
    }
    this.setState(prevState => ({ updating: false, open: !prevState.open }))
  }

  close() {
    this.setState(() => ({
      open: false,
    }))
  }

  render() {
    return (
      <div
        ref={container => (this.container = container)}
        className={`${this.props.className} Select${this.state.open
          ? " Select_open"
          : ""}${this.state.updating ? " Select_updating" : ""}`}
        role="listbox"
        tabIndex={-2}
        onClick={() => this.toggle()}
      >
        <div className="Select__value">
          {this.getDisplayValue() || this.props.placeholder}
        </div>
        {this.props.options.length && this.state.open
          ? <div className="Select__options">
              {this.props.filterable &&
                <SelectFilter onChange={e => this.updateFilter(e)} />}
              <div className="Select__options_list">
                {this.props.options.map(
                  (option: option) =>
                    option.label.match(this.state.filter) &&
                    <SelectOption
                      key={option.id}
                      onClick={() => this.selectOption(option)}
                      selected={this.isOptionSelected(option)}
                    >
                      {option.label}
                    </SelectOption>
                )}
              </div>
            </div>
          : ""}
      </div>
    )
  }
}

export default glamorous(Select)(style)
export { Select }
