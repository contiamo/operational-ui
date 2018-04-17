import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import { Label, LabelText } from "./utils/mixins"
import Card from "./Card"
import Icon from "./Icon"
import {
  Container,
  ClearButton,
  Toggle,
  MonthNav,
  IconContainer,
  Days,
  Day,
  Input,
  DatePickerCard
} from "./DatePicker/DatePicker.styles"
import {
  months,
  daysInMonth,
  range,
  toDate,
  monthStartDay,
  toYearMonthDay,
  validateDateString
} from "./DatePicker/DatePicker.utils"
import Month from "./DatePicker/DatePicker.Month"

export interface Props {
  id?: string
  label?: string
  start?: string
  end?: string
  onChange?: (date: { start?: string; end?: string }) => void
  css?: any
  className?: string
  placeholder?: string
}

export interface State {
  isExpanded: boolean
  year: number
  month: number
}

class DatePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.validate(props)
    // Start year month is either based on the start date
    // or the current month if no start date is specified.
    const startYearMonthInWidget = props.start
      ? {
          year: toYearMonthDay(props.start).year,
          month: toYearMonthDay(props.start).month
        }
      : {
          year: new Date().getFullYear(),
          month: new Date().getMonth()
        }
    this.state = {
      ...startYearMonthInWidget,
      isExpanded: false
    }
  }

  containerNode: any
  inputNode: any
  keypressHandler: (a: any) => void
  outsideClickHandler: (a: any) => void

  // Throw runtime errors if start/end dates are of the wrong format.
  // Optional props argument is used when the component doesn't have
  // these dates on the instance (e.g. constructor).
  validate(props?: Props) {
    const validatedProps = props || this.props
    // Validate start date of
    if (validatedProps.start) {
      validateDateString(validatedProps.start)
    }
    if (validatedProps.end) {
      validateDateString(validatedProps.end)
    }
  }

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
        isExpanded: false
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

  componentDidUpdate() {
    this.validate()
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.outsideClickHandler)
    document.removeEventListener("keydown", this.keypressHandler)
  }

  render() {
    const { onChange, placeholder, start, end, label, id, css, className } = this.props
    const { isExpanded, month, year } = this.state
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)
    const placeholderDays = monthStartDay(year, month)
    const daysInCurrentMonth = daysInMonth(month, year)
    const datePickerWithoutLabel = (
      <Container
        innerRef={node => {
          this.containerNode = node
        }}
        key={id}
        isExpanded={isExpanded}
      >
        {!!(start && end) && (
          <Toggle
            onClick={(ev: any): void => {
              ev.preventDefault()
              onChange && onChange({ start: null, end: null })
            }}
          >
            <Icon name="X" size={14} />
          </Toggle>
        )}
        <Input
          isExpanded={this.state.isExpanded}
          id={domId}
          readOnly
          innerRef={node => {
            this.inputNode = node
          }}
          value={[start, end].filter(s => !!s).join(" - ")}
          placeholder={placeholder || "Enter date"}
          onClick={(ev: any) => {
            this.setState(
              prevState => ({ isExpanded: !prevState.isExpanded }),
              () => {
                if (!this.state.isExpanded) {
                  this.inputNode.blur()
                }
              }
            )
          }}
          css={{ width: "100%" }}
        />
        <DatePickerCard isExpanded={isExpanded}>
          <MonthNav>
            <IconContainer
              onClick={(ev: any) => {
                ev.preventDefault()
                this.changeMonth(-1)
              }}
            >
              <Icon name="ChevronLeft" size={14} />
            </IconContainer>
            <span>{`${months[month]}, ${year}`}</span>
            <IconContainer
              onClick={(ev: any) => {
                ev.preventDefault()
                this.changeMonth(+1)
              }}
            >
              <Icon name="ChevronRight" size={14} />
            </IconContainer>
          </MonthNav>
          <Month start={start} end={end} year={year} month={month} onChange={onChange} />
        </DatePickerCard>
      </Container>
    )

    return label ? (
      <Label>
        <LabelText>{label}</LabelText>
        {datePickerWithoutLabel}
      </Label>
    ) : (
      datePickerWithoutLabel
    )
  }
}

export default DatePicker
