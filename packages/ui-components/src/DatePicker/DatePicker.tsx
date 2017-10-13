import * as React from "react"
import glamorous from "glamorous"
import Card from "../Card/Card"
import Icon from "../Icon/Icon"
import Input from "../Input/Input"
import { months, daysInMonth, range, toDate, monthStartDay } from "./utils"

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

const Container = glamorous.div(({ isExpanded }: { isExpanded: boolean }): any => ({
  display: "inline-block",
  width: "auto",
  position: "relative",
  "& .co_card": {
    display: isExpanded ? "block" : "none",
    position: "absolute",
    top: 30,
    left: "50%",
    transform: "translate3d(-50%, 0, 0)",
    width: 240
  },
  "& input": {
    width: 200
  }
}))

const Nav = glamorous.div(({ theme }: { theme: Theme }): any => ({
  margin: theme.spacing,
  textAlign: "center",
  "& > *": {
    margin: `0 6px`,
    verticalAlign: "middle",
    display: "inline-block"
  },
  "& > span": {
    width: 100,
    textAlign: "center"
  }
}))

const IconContainer = glamorous.div({
  width: 16,
  height: 16,
  cursor: "pointer"
})

const Days = glamorous.div({
  width: 210,
  margin: "auto"
})

const Day = glamorous.div(
  {
    width: 30,
    height: 30,
    marginRight: -1,
    marginBottom: -1,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #efefef"
  },
  ({ theme, selected, isPlaceholder }: { theme: Theme; selected?: boolean; isPlaceholder?: boolean }): any => ({
    backgroundColor: selected ? theme.colors.palette.success : "transparent",
    color: selected ? "#FFF" : "#000",
    visibility: isPlaceholder ? "hidden" : "visible",
    content: isPlaceholder ? "' '" : ""
  })
)

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
        <Input
          inputRef={node => {
            this.inputNode = node
          }}
          value={[start, end].filter(s => !!s).join(" - ")}
          placeholder={this.props.placeholder}
          onFocus={() => {
            this.setState(prevState => ({
              isExpanded: true
            }))
          }}
        />
        <Card className="co_card">
          <Nav>
            <IconContainer
              onClick={() => {
                this.changeMonth(-1)
              }}
            >
              <Icon name="ChevronLeft" size={16} />
            </IconContainer>
            <span>{`${months[this.state.month]}, ${this.state.year}`}</span>
            <IconContainer
              onClick={() => {
                this.changeMonth(+1)
              }}
            >
              <Icon name="ChevronRight" size={16} />
            </IconContainer>
          </Nav>
          <Days>
            {range(placeholderDays).map((number, index) => {
              return <Day key={index} isPlaceholder />
            })}
            {range(daysInCurrentMonth).map((number, index) => {
              const date = toDate(this.state.year, this.state.month, index)
              return (
                <Day
                  selected={date === start || date === end || (!!start && !!end && date >= start && date <= end)}
                  key={index}
                  onClick={() => {
                    const newStart = start && !end ? start : date
                    const newEnd = start && !end ? date : start && end ? null : end
                    const [sortedNewStart, sortedNewEnd] = [newStart, newEnd].sort()
                    this.props.onChange &&
                      this.props.onChange({
                        start: sortedNewStart,
                        end: sortedNewEnd
                      })
                  }}
                >
                  {index + 1}
                </Day>
              )
            })}
          </Days>
        </Card>
      </Container>
    )
  }
}

export default DatePicker
