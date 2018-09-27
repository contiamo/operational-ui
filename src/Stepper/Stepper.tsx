import * as React from "react"

import { expandColor, OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface StepperProps {
  steps: Array<{ title: string; content: React.ReactNode }>
  activeSlideIndex?: number
  stepColor?: keyof OperationalStyleConstants["color"]
  onStepChange?: (slideIndex: number) => void
}

export interface StepperState {
  activeSlideIndex: number
}

const StepContent = styled("div")`
  height: 100%;
  width: 100%;
`

const Steps = styled("ul")`
  display: flex;
  margin: 0 0 ${({ theme }) => theme.space.big}px;
  padding: 0;
  list-style-type: none;
  justify-content: space-between;
`

const Step = styled("li")<{ isActive: boolean; number: number; color: StepperProps["stepColor"] }>`
  display: flex;
  align-items: center;
    font-weight: ${({ theme, isActive }) => (isActive ? "bold" : theme.font.weight.regular)};
  flex: 1 0 auto;
  font-size: ${({ theme }) => theme.font.size.body}px;
  color: ${({ theme, isActive }) => (isActive ? theme.color.text.dark : theme.color.text.lighter)};
  cursor: pointer;

  /* Number with circles */
  ::before {
    content: "${({ number }) => number}";
    width: 30px;
    height: 30px;
    display: flex;
    flex: 0 0 30px;
    align-items: flex-start;
    justify-content: center;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.title}px;
    padding-top: 3px;
    box-sizing: border-box;
    background: ${({ theme, color, isActive }) => (isActive ? expandColor(theme, color) : theme.color.border.default)};
    margin-right: ${({ theme }) => theme.space.small}px;
    border-radius: 50%;
    color: white;
  }

  :not(:last-child)::after {
      content: '';
      width: 100%;
      margin: 0 16px;
      height: 1px;
      background: ${({ theme }) => theme.color.separators.default};
      display: block;
  }

  :last-child {
      flex: 0 1 0;
  }

`

const StepLabel = styled("div")`
  min-width: fit-content;
  white-space: pre;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`

class Stepper extends React.PureComponent<StepperProps, StepperState> {
  public state: StepperState = {
    activeSlideIndex: 0,
  }

  public static defaultProps = {
    stepColor: "primary",
    activeSlideIndex: 0,
  }

  public static getDerivedStateFromProps({ activeSlideIndex }: Partial<StepperProps>) {
    return { activeSlideIndex }
  }

  public render() {
    const { steps, stepColor, onStepChange } = this.props
    const { activeSlideIndex } = this.state
    return (
      <div>
        <Steps>
          {steps.map(({ title }, index) => (
            <Step
              key={index}
              isActive={activeSlideIndex === index}
              number={index + 1}
              color={stepColor}
              onClick={() => {
                if (onStepChange) {
                  onStepChange(index)
                }
              }}
            >
              <StepLabel>{title}</StepLabel>
            </Step>
          ))}
        </Steps>
        <StepContent>{steps[activeSlideIndex].content}</StepContent>
      </div>
    )
  }
}

export default Stepper
