import * as React from "react"
import { Day, DayOfWeek, Days } from "./DatePicker.styles"
import { daysInMonth, monthStartDay, range, toDate } from "./DatePicker.utils"

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
    start: sortedNewStart || undefined,
    end: sortedNewEnd || undefined,
  }
}

const isSelected = (date: string, current: IDatePair): boolean => {
  const { start, end } = current
  return date === start || date === end || (!!start && !!end && date >= start && date <= end)
}

const Month = ({ year, month, start, end, onChange, min, max }: Props) => {
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
      {["S", "M", "T", "W", "T", "F", "S"].map((dayName, index) => (
        <DayOfWeek key={`${index}-${dayName}`}>{dayName}</DayOfWeek>
      ))}
      {range(prevPlaceholderDays).map((_, index) => {
        const day = daysInPreviousMonth + index - prevPlaceholderDays
        const date = toDate(prevYear, prevMonth, day)
        const isDisabled = Boolean((min && date < min) || (max && date > max))
        return (
          <Day
            selected={isSelected(date, {
              start,
              end,
            })}
            isPlaceholder
            key={index}
            isDisabled={isDisabled}
            onClick={(ev: any) => {
              ev.preventDefault()
              if (isDisabled) {
                return
              }
              if (onChange) {
                onChange(
                  setNewDate(date, {
                    start,
                    end,
                  }),
                )
              }
            }}
          >
            {day + 1}
          </Day>
        )
      })}
      {range(daysInCurrentMonth).map((_, index) => {
        const date = toDate(year, month, index)
        const isDisabled = Boolean((min && date < min) || (max && date > max))
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
              if (onChange) {
                onChange(
                  setNewDate(date, {
                    start,
                    end,
                  }),
                )
              }
            }}
          >
            {index + 1}
          </Day>
        )
      })}
      {range(nextPlaceholderDays).map((number, index) => {
        const date = toDate(nextYear, nextMonth, number)
        const isDisabled = Boolean((min && date < min) || (max && date > max))
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
              if (onChange) {
                onChange(
                  setNewDate(date, {
                    start,
                    end,
                  }),
                )
              }
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
