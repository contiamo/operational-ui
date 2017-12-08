import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import Card from "../Card/Card"
import Icon from "../Icon/Icon"
import { Container, ClearButton, Toggle, MonthNav, IconContainer, Days, Day, Input } from "./DatePicker.styles"
import { months, daysInMonth, range, toDate, monthStartDay } from "./DatePicker.utils"
import Month from "./DatePicker.Month"
import withLabel from "../utils/with-label"

export interface IProps {
  id?: string
  // Injected by withLabel higher-order component
  domId?: string
  label?: string
  start?: string
  end?: string
  onChange?: (date: { start?: string; end?: string }) => void
  css?: any
  className?: string
  placeholder?: string
}

export interface IState {
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

  containerNode: any
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
      if (this.containerNode && (this.containerNode === ev.target || this.containerNode.contains(ev.target))) {
        return
      }
      this.setState(prevState => ({
        ...prevState,
        isExpanded: false
      }))
    }
    document.addEventListener("click", this.outsideClickHandler)
    document.addEventListener("keydown", this.keypressHandler)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.outsideClickHandler)
    document.removeEventListener("keydown", this.keypressHandler)
  }

  render() {
    const { start, end, label, id } = this.props
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
    const placeholderDays = monthStartDay(this.state.year, this.state.month)
    const daysInCurrentMonth = daysInMonth(this.state.month, this.state.year)
    return (
      <Container
        innerRef={node => {
          this.containerNode = node
        }}
        key={this.props.id}
        css={this.props.css}
        isExpanded={this.state.isExpanded}
      >
        <Toggle
          onClick={(ev: any) => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
          }}
        >
          <Icon name={this.state.isExpanded ? "ChevronUp" : "ChevronDown"} size={12} />
        </Toggle>
        {!!(start && end) && (
          <ClearButton
            onClick={(ev: any) => {
              ev.preventDefault()
              this.props.onChange &&
                this.props.onChange({
                  start: undefined,
                  end: undefined
                })
            }}
          >
            <Icon name="X" size={12} />
          </ClearButton>
        )}
        <Input
          id={domId}
          readOnly
          innerRef={node => {
            this.inputNode = node
          }}
          value={[start, end].filter(s => !!s).join(" - ")}
          placeholder={this.props.placeholder || "Enter date"}
          onClick={(ev: any) => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
            this.inputNode && this.inputNode.blur()
          }}
        />
        <Card className="co_card">
          <MonthNav>
            <IconContainer
              onClick={() => {
                this.changeMonth(-1)
              }}
            >
              <Icon name="ChevronLeft" size={14} />
            </IconContainer>
            <span>{`${months[this.state.month]}, ${this.state.year}`}</span>
            <IconContainer
              onClick={() => {
                this.changeMonth(+1)
              }}
            >
              <Icon name="ChevronRight" size={14} />
            </IconContainer>
          </MonthNav>

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

export default withLabel(DatePicker)
