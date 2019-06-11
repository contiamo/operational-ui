import * as React from "react"
import { OperationalStyleConstants } from "../utils/constants"
import { useHotkey } from "../useHotkey"
import styled from "../utils/styled"

export interface StepperProps {
  steps: Array<{ title: string; content: React.ReactNode }>
  activeSlideIndex?: number
  stepColor?: keyof OperationalStyleConstants["color"]
  onStepChange?: (slideIndex: number) => void
}

const StepContent = styled("div")`
  label: StepContent;
  height: 100%;
  width: 100%;
`
StepContent.displayName = "StepContent"

type StepState = "inactive" | "active" | "completed"

const StepLabel = styled("div")`
  label: StepLabel;
  min-width: fit-content;
  white-space: pre;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`
StepLabel.displayName = "StepLabel"

const Steps = styled("ul")<{ steps: number }>`
  label: Steps;
  display: flex;
  justify-items: center;
  margin: 0 0 ${({ theme }) => theme.space.big}px;
`
Steps.displayName = "Steps"

const ballSize = 24
const translateY = ballSize / 2

const Step = styled("li")<{ stepState: StepState; number: number; color: StepperProps["stepColor"] }>`
  position: relative;
  width: 100%;
  color: ${({ theme, stepState }) => {
    if (stepState === "active") return theme.color.text.dark
    if (stepState === "completed") return theme.color.text.lighter
    return theme.color.text.lightest
  }};
  font-weight: ${({ theme, stepState }) =>
    stepState === "active" ? theme.font.weight.bold : theme.font.weight.regular};
  text-align: center;
  overflow: hidden;

  :focus {
    // TODO: Use common mixin instead
    outline: 0;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.color.primary};
  }

  /** Ball with number in it */
  ::before {
    content: '${({ number, stepState }) => {
      if (stepState === "completed") return "✓"
      return number
    }}';
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${({ theme }) => theme.space.small}px;
    width: ${ballSize}px;
    height: ${ballSize}px;
    border-radius: 50%;
    background-color: ${({ theme, stepState }) => {
      if (stepState === "active") return theme.color.primary
      if (stepState === "completed") return theme.color.text.lightest
      return theme.color.border.default
    }};
    font-weight: ${({ theme }) => theme.font.weight.regular};
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
    transform: translate(50%, ${translateY}px);
  }

  :last-of-type::after {
    transform: translate(-50%, ${translateY}px);
  }
`
Step.displayName = "Step"

function getStepState(index: number, activeIndex?: number): StepState {
  if (activeIndex === undefined) return "inactive"
  if (index < activeIndex) return "completed"
  if (index === activeIndex) return "active"
  return "inactive"
}

const getNextTabIndex = (current: number, lastIndex: number) => {
  if (current + 1 > lastIndex) return 0
  return current + 1
}

const getPreviousTabIndex = (current: number, lastIndex: number) => {
  if (current - 1 < 0) return lastIndex
  return current - 1
}

const Stepper: React.FC<StepperProps> = props => {
  const { steps, stepColor, onStepChange, activeSlideIndex, ...rest } = props

  const clickHandler = React.useCallback(
    (activeIndex: number) => {
      if (onStepChange) {
        onStepChange(activeIndex)
      }
    },
    [onStepChange],
  )

  const [focusedTabIndex, setFocusedTabIndex] = React.useState(0)

  const hotkeyScope = React.useRef(null)
  useHotkey(hotkeyScope, { key: "ArrowLeft" }, () => {
    setFocusedTabIndex(getPreviousTabIndex(focusedTabIndex, steps.length - 1))
  })
  useHotkey(hotkeyScope, { key: "ArrowRight" }, () => {
    setFocusedTabIndex(getNextTabIndex(focusedTabIndex, steps.length - 1))
  })
  useHotkey(hotkeyScope, { key: "Enter" }, () => {
    clickHandler(focusedTabIndex)
  })

  // Set actual focus on each render
  const focusedTab = React.useRef<HTMLLIElement>(null)
  React.useEffect(() => {
    if (focusedTab.current) {
      focusedTab.current.focus()
    }
  })

  // Set focus to the current slide if the value has changed
  React.useEffect(() => {
    if (activeSlideIndex !== undefined) {
      setFocusedTabIndex(activeSlideIndex)
    }
  }, [activeSlideIndex])

  return (
    <div data-cy="operational-ui__Stepper" {...rest}>
      <Steps
        ref={hotkeyScope}
        steps={steps.length}
        data-cy="operational-ui__Stepper-steps"
        aria-orientation="horizontal"
        role="tablist"
      >
        {steps.map(({ title }, index) => (
          <Step
            data-cy={`operational-ui__Stepper__step-${index}`}
            ref={index === focusedTabIndex ? focusedTab : undefined}
            tabIndex={index === focusedTabIndex ? 0 : -1}
            key={index}
            stepState={getStepState(index, activeSlideIndex)}
            number={index + 1}
            color={stepColor}
            onClick={() => clickHandler(index)}
            role="tab"
            aria-selected={index === activeSlideIndex}
            aria-setsize={steps.length}
            aria-posinset={index + 1}
          >
            {title}
          </Step>
        ))}
      </Steps>
      <StepContent data-cy="operational-ui__Stepper-content" role="tabpanel">
        {steps[activeSlideIndex!].content}
      </StepContent>
    </div>
  )
}

Stepper.defaultProps = {
  stepColor: "primary",
  activeSlideIndex: 0,
}

export default Stepper
