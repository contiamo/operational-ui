import * as React from "react"
import { months, daysInMonth, range, toDate, monthStartDay } from "./DatePicker.utils"

import { Days, Day } from "./DatePicker.styles"

interface IDatePair {
  start?: string
  end?: string
}

interface IProps {
  year: number
  month: number
  start?: string
  end?: string
  onChange?: (date: IDatePair) => void
}

const setNewDate = (date: string, current: IDatePair): IDatePair => {
  const { start, end } = current
  const newStart = start && !end ? start : date
  const newEnd = start && !end ? date : start && end ? null : end
  const [sortedNewStart, sortedNewEnd] = [newStart, newEnd].sort()
  return {
    start: sortedNewStart,
    end: sortedNewEnd
  }
}

const Month: React.SFC<IProps> = ({ year, month, start, end, onChange }: IProps) => {
  const placeholderDays = monthStartDay(year, month)
  const daysInCurrentMonth = daysInMonth(month, year)
  return (
    <Days>
      {range(placeholderDays).map((number, index) => {
        return <Day key={index} isPlaceholder />
      })}
      {range(daysInCurrentMonth).map((number, index) => {
        const date = toDate(year, month, index)
        return (
          <Day
            selected={date === start || date === end || (!!start && !!end && date >= start && date <= end)}
            key={index}
            onClick={() => {
              onChange && onChange(setNewDate(date, { start, end }))
            }}
          >
            {index + 1}
          </Day>
        )
      })}
    </Days>
  )
}

export default Month
