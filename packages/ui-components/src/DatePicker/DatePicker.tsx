import * as React from "react"
import glamorous from "glamorous"
import Card from "../Card/Card"
import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import { months, daysInMonth, range } from "./utils"

interface IProps {
  date: string
  onChange?: (date: string) => void
  style?: any
  className?: string
}

interface IState {
  year: number
  month: number
}

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
  height: 16
})

const Days = glamorous.div({
  width: 210,
  margin: "auto"
})

const Day = glamorous.div(
  {
    width: 30,
    height: 30,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #efefef"
  },
  ({ theme, selected }: { theme: Theme; selected: boolean }) => ({
    backgroundColor: selected ? theme.colors.palette.success : "transparent",
    color: selected ? "#FFF" : "#000"
  })
)

class DatePicker extends React.Component<IProps, IState> {
  state = {
    year: 2017,
    month: 10
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

  render() {
    const [year, month_, day_] = this.props.date.split("-").map(Number)
    const month = month_ - 1
    const day = day_ - 1
    return (
      <Card>
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
          {range(daysInMonth(this.state.month, this.state.year)).map((number, index) => (
            <Day
              selected={year === this.state.year && month === this.state.month && day === index}
              key={index}
              onClick={() => {
                this.props.onChange && this.props.onChange(`${this.state.year}-${this.state.month + 1}-${index + 1}`)
              }}
            >
              {index + 1}
            </Day>
          ))}
        </Days>
      </Card>
    )
  }
}

export default DatePicker
