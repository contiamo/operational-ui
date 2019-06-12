import * as React from "react"
import { OperationalStyleConstants } from "../utils/constants"
import { useHotkey } from "../useHotkey"
import styled from "../utils/styled"
import { YesIcon } from "../Icon/Icon"
import { inputFocus } from "../utils/mixins"
import ControlledModal from "../Internals/ControlledModal"
import { Actions, List, Body, SimpleLink, Card, Button, ControlledModalContent } from "../index"
import PageContent from "../PageContent/PageContent"

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

const Step = styled("li")<{ stepState: StepState; color: StepperProps["stepColor"] }>`
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
    ${({ theme }) =>
      inputFocus({
        theme,
      })}
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

const Ball = styled("div")<{ stepState: StepState }>`
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
}`

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

  const [focusedTab, setFocusedTab] = React.useState({
    index: 0,
    shouldFocus: false,
  })

  const clickHandler = React.useCallback(
    (activeIndex: number) => {
      if (onStepChange) {
        onStepChange(activeIndex)
      }
    },
    [onStepChange],
  )

  const hotkeyScope = React.useRef(null)
  useHotkey(hotkeyScope, { key: "ArrowLeft" }, () => {
    const index = getPreviousTabIndex(focusedTab.index, steps.length - 1)
    setFocusedTab({ index, shouldFocus: true })
  })
  useHotkey(hotkeyScope, { key: "ArrowRight" }, () => {
    const index = getNextTabIndex(focusedTab.index, steps.length - 1)
    setFocusedTab({ index, shouldFocus: true })
  })
  useHotkey(hotkeyScope, { key: "Enter" }, () => {
    clickHandler(focusedTab.index)
  })

  // Set actual focus on each render
  const focusedTabRef = React.useRef<HTMLLIElement>(null)
  React.useEffect(() => {
    if (focusedTabRef.current && focusedTab.shouldFocus) {
      focusedTabRef.current.focus()
      setFocusedTab({ ...focusedTab, shouldFocus: false })
    }
  }, [focusedTab])

  // Set focus to the current slide if the value has changed
  React.useEffect(() => {
    if (activeSlideIndex !== undefined) {
      setFocusedTab({ index: activeSlideIndex, shouldFocus: false })
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
        {steps.map(({ title }, index) => {
          const stepState = getStepState(index, activeSlideIndex)
          const number = index + 1
          return (
            <Step
              data-cy={`operational-ui__Stepper__step-${index}`}
              ref={index === focusedTab.index ? focusedTabRef : undefined}
              tabIndex={index === focusedTab.index ? 0 : -1}
              key={index}
              stepState={stepState}
              color={stepColor}
              onClick={() => clickHandler(index)}
              role="tab"
              aria-selected={index === activeSlideIndex}
              aria-setsize={steps.length}
              aria-posinset={number}
            >
              <Ball stepState={stepState}>{stepState === "completed" ? <YesIcon size={11} /> : number}</Ball>
              {title}
            </Step>
          )
        })}
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

const MyPage = styled("div")`
  height: 1200px;
`

export const TestComp = () => {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)

  return (
    <MyPage>
      <PageContent>
        <ControlledModal fullSize title={"Add Table"}>
          <ControlledModalContent fullSize>
            <Stepper
              activeSlideIndex={activeSlideIndex}
              onStepChange={setActiveSlideIndex}
              steps={[
                {
                  title: "Select Your Git Provider",
                  content: (
                    <Body>
                      <List
                        items={[
                          {
                            photo: "https://placehold.it/140x60",
                            description: "We will ask you to authenticate yourself with OAuth.",
                            onClick: () => setActiveSlideIndex(1),
                          },
                          {
                            photo: "https://placehold.it/140x60",
                            description: "We will ask you to authenticate yourself with OAuth.",
                            onClick: () => alert("You chose the second item!"),
                          },
                          {
                            title: "Manual Setup",
                            photo: "https://placehold.it/140x60",
                            description:
                              "Provide the URL to any accessible git repository and set up the required keys for access.",
                            onClick: () => alert("You chose the third item!"),
                          },
                        ]}
                      />
                      <Button color="primary" onClick={() => setActiveSlideIndex(1)}>
                        Go to Step 2
                      </Button>
                    </Body>
                  ),
                },
                {
                  title: "Authenticate",
                  content: <Body>Welcome to Step 2! </Body>,
                },
                {
                  title: "Select Repositories",
                  content: (
                    <>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                      <Card
                        action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
                        title="Step 3: anything goes"
                      >
                        Any content goes in here and it should just work.
                      </Card>
                    </>
                  ),
                },
                {
                  title: "Import",
                  content: (
                    <>
                      <Body>Well, that was nice, now let's go back.</Body>
                      <Button color="primary" onClick={() => setActiveSlideIndex(0)}>
                        Go Back to the First Slide
                      </Button>
                    </>
                  ),
                },
              ]}
            />
          </ControlledModalContent>
          <Actions>
            <Button>Action!</Button>
          </Actions>
        </ControlledModal>
      </PageContent>
    </MyPage>
  )
}
