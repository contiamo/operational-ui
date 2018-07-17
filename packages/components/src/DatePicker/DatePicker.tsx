import * as React from "react"
import styled from "react-emotion"
import { Css } from "../types"
import { Label, LabelText } from "../utils/mixins"
import { Card, Icon } from "../"

import { Container, Toggle, MonthNav, IconContainer, Input, DatePickerCard } from "./DatePicker.styles"

import { months, toYearMonthDay, validateDateString } from "./DatePicker.utils"

import Month from "./DatePicker.Month"

export interface Props {
  id?: string
  label?: string
  /** Min date in the format YYYY-MM-DD. Dates lower than this cannot be selected. */
  min?: string
  /** Max date in the format YYYY-MM-DD. Dates higher than this cannot be selected. */
  max?: string
  /** Start date in the format YYYY-MM-DD. */
  start?: string
  /** End date in the format YYYY-MM-DD. */
  end?: string
  /** Triggered every time the start or end dates change. `undefined` values clear start or end values. */
  onChange?: (
    date: {
      start?: string
      end?: string
    },
  ) => void
  className?: string
  /** Placeholder text when no dates selected */
  placeholder?: string
}

export interface State {
  isExpanded: boolean
  year: number
  month: number
}

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    placeholder: "Enter date",
  }

  constructor(props: Props) {
    super(props)
    this.validate(props) // Start year month is either based on the start date
    // or the current month if no start date is specified.

    const startYearMonthInWidget = props.start
      ? {
          year: toYearMonthDay(props.start).year,
          month: toYearMonthDay(props.start).month,
        }
      : {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
        }
    this.state = {
      ...startYearMonthInWidget,
      isExpanded: false,
    }
  }

  containerNode: any
  inputNode: any
  keypressHandler: (a: any) => void
  outsideClickHandler: (a: any) => void // Throw runtime errors if start/end dates are of the wrong format.

  // Optional props argument is used when the component doesn't have
  // these dates on the instance (e.g. constructor).

  validate(props?: Props) {
    const validatedProps = props || this.props // Validate start date of

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
          : prevState.month + diff > 11
            ? prevState.year + 1
            : prevState.year,
    }))
  }

  componentDidMount() {
    this.keypressHandler = (ev: any) => {
      if (ev.keyCode !== 27) {
        return
      }

      this.setState(prevState => ({
        ...prevState,
        isExpanded: false,
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
        isExpanded: false,
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
    const { onChange, placeholder, start, end, label, min, max, id, className } = this.props
    const { isExpanded, month, year } = this.state
    const domId = id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : null)

    const datePickerWithoutLabel = (
      <Container
        innerRef={(node: React.ReactNode) => {
          this.containerNode = node
        }}
        key={id}
        isExpanded={isExpanded}
      >
        {!!(start && end) && (
          <Toggle
            onClick={(ev: any): void => {
              ev.preventDefault()
              onChange &&
                onChange({
                  start: null,
                  end: null,
                })
            }}
          >
            <Icon name="No" size={14} />
          </Toggle>
        )}
        <Input
          isExpanded={this.state.isExpanded}
          id={domId}
          readOnly
          innerRef={(node: HTMLElement) => {
            this.inputNode = node
          }}
          value={[start, end].filter(s => !!s).join(" - ")}
          placeholder={placeholder}
          onClick={(ev: any) => {
            this.setState(
              prevState => ({
                isExpanded: !prevState.isExpanded,
              }),
              () => {
                if (!this.state.isExpanded) {
                  this.inputNode.blur()
                }
              },
            )
          }}
        />
        <DatePickerCard isExpanded={isExpanded}>
          <MonthNav>
            <IconContainer
              onClick={(ev: any) => {
                ev.preventDefault()
                this.changeMonth(-1)
              }}
            >
              <Icon name="ChevronLeft" size={12} />
            </IconContainer>
            <span>{`${months[month]}, ${year}`}</span>
            <IconContainer
              onClick={(ev: any) => {
                ev.preventDefault()
                this.changeMonth(+1)
              }}
            >
              <Icon name="ChevronRight" size={12} />
            </IconContainer>
          </MonthNav>
          <Month start={start} end={end} min={min} max={max} year={year} month={month} onChange={onChange} />
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
