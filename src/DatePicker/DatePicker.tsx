import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, NoIcon } from "../Icon"
import { LabelText } from "../LabelText/LabelText"
import { DefaultProps } from "../types"
import { Label } from "../utils/mixins"

import { keyCodes } from "../utils"
import Month from "./DatePicker.Month"
import { Container, DatePickerCard, IconContainer, Input, MonthNav, Toggle } from "./DatePicker.styles"
import { changeMonth, months, toDate, validateDateString, getStartMonthYearInWidget } from "./DatePicker.utils"

export interface DatePickerProps extends DefaultProps {
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
  onChange?: (date: { start?: string; end?: string }) => void
  /** Placeholder text when no dates selected */
  placeholder?: string
}

export interface State {
  isExpanded: boolean
  year: number
  /** Current month. Starting at 0, corresponding to January */
  month: number
}

class DatePicker extends React.Component<DatePickerProps, State> {
  public static defaultProps = {
    placeholder: "Enter date",
  }

  constructor(props: DatePickerProps) {
    super(props)
    this.validate(props) // Start year month is either based on the start date
    // or the current month if no start date is specified.

    const startYearMonthInWidget = getStartMonthYearInWidget(props)

    this.state = {
      ...startYearMonthInWidget,
      isExpanded: false,
    }
  }

  public containerNode: any
  public inputNode: any
  public keypressHandler?: EventListenerOrEventListenerObject
  public outsideClickHandler?: EventListenerOrEventListenerObject

  // Optional props argument is used when the component doesn't have
  // these dates on the instance (e.g. constructor).

  public validate(props?: DatePickerProps) {
    const validatedProps = props || this.props // Validate start date of

    if (validatedProps.start) {
      validateDateString(validatedProps.start)
    }

    if (validatedProps.end) {
      validateDateString(validatedProps.end)
    }
  }

  public changeMonth(diff: number) {
    this.setState(prevState => changeMonth(diff, { month: prevState.month, year: prevState.year }))
  }

  public componentDidMount() {
    this.keypressHandler = (ev: any) => {
      if (ev.keyCode !== keyCodes.esc) {
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

  public componentDidUpdate() {
    this.validate()
  }

  public componentWillUnmount() {
    if (this.outsideClickHandler) {
      document.removeEventListener("click", this.outsideClickHandler)
    }
    if (this.keypressHandler) {
      document.removeEventListener("keydown", this.keypressHandler)
    }
  }

  public render() {
    /**
     * Contrary to other component implementations, the `className` prop is destructured from the spread `props` object.
     * This is to allow for it to only apply to the datepicker's container, which may be the label or the picker itself.
     */
    const { onChange, placeholder, start, end, label, min, max, className, ...props } = this.props
    const { isExpanded, month, year } = this.state
    const domId = props.id || (label && label.toLowerCase ? label.toLowerCase().replace(/\s/g, "-") : undefined)

    const nextMonth = changeMonth(1, { month: this.state.month, year: this.state.year })

    const canGoToPreviousMonth = !min || min < toDate(this.state.year, this.state.month, 0)
    const canGoToNextMonth = !max || max >= toDate(nextMonth.year, nextMonth.month, 0)

    const datePickerWithoutLabel = (isStandalone: boolean) => (
      <Container
        {...props}
        className={isStandalone ? className : undefined}
        ref={(node: React.ReactNode) => {
          this.containerNode = node
        }}
        isExpanded={isExpanded}
      >
        {!!(start && end) && (
          <Toggle
            onClick={(ev: any): void => {
              ev.preventDefault()
              if (onChange) {
                onChange({
                  start: undefined,
                  end: undefined,
                })
              }
            }}
          >
            <NoIcon size={14} />
          </Toggle>
        )}
        <Input
          isExpanded={this.state.isExpanded}
          id={domId}
          readOnly
          ref={(node: HTMLInputElement) => {
            this.inputNode = node
          }}
          value={[start, end].filter(s => !!s).join(" - ")}
          placeholder={placeholder}
          onClick={() => {
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
              disabled={!canGoToPreviousMonth}
              onClick={(ev: any) => {
                ev.preventDefault()
                if (!canGoToPreviousMonth) {
                  return
                }
                this.changeMonth(-1)
              }}
            >
              <ChevronLeftIcon size={12} />
            </IconContainer>
            <span>{`${months[month]}, ${year}`}</span>
            <IconContainer
              disabled={!canGoToNextMonth}
              onClick={(ev: any) => {
                ev.preventDefault()
                if (!canGoToNextMonth) {
                  return
                }
                this.changeMonth(+1)
              }}
            >
              <ChevronRightIcon size={12} />
            </IconContainer>
          </MonthNav>
          <Month start={start} end={end} min={min} max={max} year={year} month={month} onChange={onChange} />
        </DatePickerCard>
      </Container>
    )
    return label ? (
      <Label {...props} className={className}>
        <LabelText>{label}</LabelText>
        {datePickerWithoutLabel(false)}
      </Label>
    ) : (
      datePickerWithoutLabel(true)
    )
  }
}

export default DatePicker
