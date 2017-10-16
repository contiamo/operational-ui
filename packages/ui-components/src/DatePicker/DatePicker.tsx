import * as React from "react"
import glamorous from "glamorous"
import Card from "../Card/Card"
import Icon from "../Icon/Icon"
import { Container, Toggle, Nav, IconContainer, Days, Day, Input } from "./DatePicker.styles"
import { months, daysInMonth, range, toDate, monthStartDay } from "./DatePicker.utils"
import Month from "./DatePicker.Month"

interface IProps {
  start?: string
  end?: string
  onChange?: (date: { start?: string; end?: string }) => void
  css?: any
  className?: string
  placeholder?: string
}

interface IState {
  isExpanded: boolean
  year: number
  month: number
}

class DatePicker extends React.Component<IProps, IState> {
  state = {
    isExpanded: false,
    year: 2017,
    month: 9
  }

  inputNode: any
  keypressHandler: (a: any) => void
  outsideClickHandler: (a: any) => void

  changeMonth(diff: number) {
    this.setState(prevState => ({
      month: prevState.month + diff < 0 ? prevState.month + diff + 12 : (prevState.month + diff) % 12,
      year:
        prevState.month + diff < 0
          ? prevState.year - 1
          : prevState.month + diff > 11 ? prevState.year + 1 : prevState.year
    }))
  }

  componentDidMount() {
    this.keypressHandler = (ev: any) => {
      if (ev.keyCode !== 27) {
        return
      }
      this.setState(prevState => ({
        ...prevState,
        isExpanded: !prevState.isExpanded
      }))
      if (this.inputNode) {
        this.inputNode.blur()
      }
    }
    this.outsideClickHandler = (ev: any) => {
      this.setState(prevState => ({
        ...prevState,
        isExpanded: false
      }))
    }
    window.addEventListener("click", this.outsideClickHandler)
    window.addEventListener("keydown", this.keypressHandler)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.outsideClickHandler)
    window.removeEventListener("keydown", this.keypressHandler)
  }

  render() {
    const { start, end } = this.props
    const placeholderDays = monthStartDay(this.state.year, this.state.month)
    const daysInCurrentMonth = daysInMonth(this.state.month, this.state.year)
    return (
      <Container
        css={this.props.css}
        isExpanded={this.state.isExpanded}
        onClick={(ev: any) => {
          ev.stopPropagation()
        }}
      >
        <Toggle
          onClick={() => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
          }}
        >
          <Icon name={this.state.isExpanded ? "ChevronUp" : "ChevronDown"} size={12} />
        </Toggle>
        <Input
          innerRef={node => {
            this.inputNode = node
          }}
          value={[start, end].filter(s => !!s).join(" - ")}
          placeholder={this.props.placeholder}
          onFocus={() => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
            this.inputNode && this.inputNode.blur()
          }}
        />
        <Card className="co_card">
          <Nav>
            <IconContainer
              onClick={() => {
                this.changeMonth(-1)
              }}
            >
              <Icon name="ChevronLeft" size={12} />
            </IconContainer>
            <span>{`${months[this.state.month]}, ${this.state.year}`}</span>
            <IconContainer
              onClick={() => {
                this.changeMonth(+1)
              }}
            >
              <Icon name="ChevronRight" size={12} />
            </IconContainer>
          </Nav>
          <Month
            start={this.props.start}
            end={this.props.end}
            year={this.state.year}
            month={this.state.month}
            onChange={this.props.onChange}
          />
        </Card>
      </Container>
    )
  }
}

export default DatePicker
