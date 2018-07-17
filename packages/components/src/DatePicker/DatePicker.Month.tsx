import * as React from "react"
import { months, daysInMonth, range, toDate, monthStartDay } from "./DatePicker.utils"
import { OperationalStyleConstants } from "../utils/constants"
import { Days, Day } from "./DatePicker.styles"

export interface IDatePair {
  start?: string
  end?: string
}

export interface Props {
  year: number
  month: number
  start?: string
  end?: string
  min?: string
  max?: string
  onChange?: (date: IDatePair) => void
}

const setNewDate = (date: string, current: IDatePair): IDatePair => {
  const { start, end } = current
  const newStart = start && !end ? start : date
  const newEnd = start && !end ? date : start && end ? null : end
  const [sortedNewStart, sortedNewEnd] = [newStart, newEnd].sort()
  return {
    start: sortedNewStart,
    end: sortedNewEnd,
  }
}

const isSelected = (date: string, current: IDatePair): boolean => {
  const { start, end } = current
  return date === start || date === end || (!!start && !!end && date >= start && date <= end)
}

const Month = ({ year, month, start, end, onChange, min, max }: Props) => {
  console.log(min, max)
  const prevPlaceholderDays = monthStartDay(year, month)
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const daysInCurrentMonth = daysInMonth(month, year)
  const daysInPreviousMonth = daysInMonth(prevMonth, prevYear)
  const nextPlaceholderDays =
    (daysInCurrentMonth + prevPlaceholderDays) % 7 === 0 ? 0 : 7 - ((daysInCurrentMonth + prevPlaceholderDays) % 7)
  return (
    <Days>
      {range(prevPlaceholderDays).map((number, index) => {
        const day = daysInPreviousMonth + index - prevPlaceholderDays
        const date = toDate(prevYear, prevMonth, day)
        const isDisabled = (min && date < min) || (max && date > max)
        return (
          <Day
            selected={isSelected(date, {
              start,
              end,
            })}
            key={index}
            isPlaceholder
            isDisabled={isDisabled}
            onClick={(ev: any) => {
              ev.preventDefault()
              if (isDisabled) {
                return
              }
              onChange &&
                onChange(
                  setNewDate(date, {
                    start,
                    end,
                  }),
                )
            }}
          >
            {day + 1}
          </Day>
        )
      })}
      {range(daysInCurrentMonth).map((number, index) => {
        const date = toDate(year, month, index)
        const isDisabled = (min && date < min) || (max && date > max)
        return (
          <Day
            selected={isSelected(date, {
              start,
              end,
            })}
            key={index}
            isDisabled={isDisabled}
            onClick={(ev: any) => {
              ev.preventDefault()
              if (isDisabled) {
                return
              }
              onChange &&
                onChange(
                  setNewDate(date, {
                    start,
                    end,
                  }),
                )
            }}
          >
            {index + 1}
          </Day>
        )
      })}
      {range(nextPlaceholderDays).map((number, index) => {
        const date = toDate(nextYear, nextMonth, number)
        const isDisabled = (min && date < min) || (max && date > max)
        return (
          <Day
            key={index}
            selected={isSelected(date, {
              start,
              end,
            })}
            isDisabled={isDisabled}
            isPlaceholder
            onClick={(ev: any) => {
              ev.preventDefault()
              if (isDisabled) {
                return
              }
              onChange &&
                onChange(
                  setNewDate(date, {
                    start,
                    end,
                  }),
                )
            }}
          >
            {number + 1}
          </Day>
        )
      })}
    </Days>
  )
}

export default Month
