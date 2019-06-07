import * as React from "react"

import { expandColor, OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"
import { newInputFocus } from "../utils"

export interface StepperProps {
  steps: Array<{ title: string; content: React.ReactNode }>
  activeSlideIndex?: number
  stepColor?: keyof OperationalStyleConstants["color"]
  onStepChange?: (slideIndex: number) => void
}

const circleSize = 24

const StepContent = styled("div")`
  label: StepContent;
  height: 100%;
  width: 100%;
`
StepContent.displayName = "StepContent"

const Steps = styled("ul")`
  label: Steps;
  display: flex;
  margin: 0 0 ${({ theme }) => theme.space.big}px;
  padding: 0;
  list-style-type: none;
  justify-content: space-between;
`
Steps.displayName = "Steps"

type StepState = "inactive" | "active" | "completed"

const Step = styled("li")<{ stepState: StepState; number: number; color: StepperProps["stepColor"] }>`
  label: Step;
  display: flex;
  align-items: center;
    font-weight: ${({ theme, stepState }) => (stepState === "active" ? "bold" : theme.font.weight.regular)};
  flex: 1 0 auto;
  font-size: ${({ theme }) => theme.font.size.body}px;
  color: ${({ theme, stepState }) => {
    if (stepState === "active") return theme.color.text.dark
    if (stepState === "completed") return theme.color.text.lighter
    return theme.color.text.lightest
  }};
  cursor: pointer;

  /* Number with circles */
  ::before {
    content: "${({ number }) => number}";
    width: ${circleSize}px;
    height: ${circleSize}px;
    flex: 0 0 ${circleSize}px;
    line-height: 23px;
    text-align: center;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.body}px;
    box-sizing: border-box;
    background: ${({ theme, color, stepState }) => {
      if (stepState === "active") return expandColor(theme, color)
      if (stepState === "completed") return theme.color.text.lightest
      return theme.color.border.disabled
    }};
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

  :focus {
    ${newInputFocus}
  }
`
Step.defaultProps = { role: "tab" }
Step.displayName = "Step"

const StepLabel = styled("div")`
  label: StepLabel;
  min-width: fit-content;
  white-space: pre;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`
StepLabel.displayName = "StepLabel"

const NewSteps = styled("ul")<{ steps: number }>`
  label: Steps;
  display: flex;
  justify-items: center;
  margin: 0;
`
NewSteps.displayName = "Steps"

const NewStep = styled("li")<{ stepState: StepState }>`
  label: Step;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme, stepState }) => (stepState === "active" ? "bold" : theme.font.weight.regular)};
  font-size: ${({ theme }) => theme.font.size.body}px;
  color: ${({ theme, stepState }) => {
    if (stepState === "active") return theme.color.text.dark
    if (stepState === "completed") return theme.color.text.lighter
    return theme.color.text.lightest
  }};
  cursor: pointer;
`
NewStep.defaultProps = { role: "tab" }
NewStep.displayName = "Step"

function getStepState(index: number, activeIndex?: number): StepState {
  if (activeIndex === undefined) return "inactive"
  if (index < activeIndex) return "completed"
  if (index === activeIndex) return "active"
  return "inactive"
}

const ballSize = 24
const translateY = ballSize / 2

const CheeseMeister = styled("div")<{ stepState: StepState; number: number; color: StepperProps["stepColor"] }>`
  position: relative;
  width: 100%;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  text-align: center;
  overflow: hidden;
  
  /** Ball with number in it */
  ::before {
    content: '${({ number }) => number}';
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${({ theme }) => theme.space.small}px;
    width: ${ballSize}px;
    height: ${ballSize}px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
  z-index: 1;
  }

  /** Separator line */
  ::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
    transform: translateY(${translateY}px);
    display: block;
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.border.default};
  }

  :first-of-type::after,
  :last-of-type::after {
    width: 50%;
  }

:first-of-type::after {
  transform: translate(50%, ${translateY}px)
}

:last-of-type::after {
  transform: translate(-50%, ${translateY}px)
}

`

const Stepper: React.FC<StepperProps> = props => {
  const { steps, stepColor, onStepChange, activeSlideIndex, ...rest } = props
  return (
    <div data-cy="operational-ui__Stepper" {...rest}>
      <NewSteps steps={steps.length} data-cy="operational-ui__Stepper-steps">
        {steps.map(({ title }, index) => (
          <CheeseMeister
            data-cy={`operational-ui__Stepper__step-${index}`}
            tabIndex={index === activeSlideIndex ? 0 : -1}
            aria-selected={index === activeSlideIndex}
            key={index}
            stepState={getStepState(index, activeSlideIndex)}
            number={index + 1}
            color={stepColor}
            onClick={() => {
              if (onStepChange) {
                onStepChange(index)
              }
            }}
          >
            {title}
          </CheeseMeister>
        ))}
      </NewSteps>
      <StepContent data-cy="operational-ui__Stepper-content">{steps[activeSlideIndex!].content}</StepContent>
    </div>
  )
}

Stepper.defaultProps = {
  stepColor: "primary",
  activeSlideIndex: 0,
}

export default Stepper
