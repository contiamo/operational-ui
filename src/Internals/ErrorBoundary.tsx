import * as React from "react"

import Button from "../Button/Button"
import Splash from "../Splash/Splash"
import styled from "../utils/styled"

export interface ErrorBoundaryProps {
  /*
   * What environment are we currently in?
   * @default process.env.NODE_ENV
   */
  environment?: string
  /**
   * The error that is thrown.
   */
  error: Error
}

const StackTrace = styled("div")`
  font-size: ${props => props.theme.font.size.small}px;
  max-height: 240px;
  overflow: auto;

  p {
    margin-top: ${props => props.theme.space.small}px;
  }

  ::before {
    content: "Stack Trace";
    font-size: 16px;
    font-weight: 500;
    display: block;
    padding-bottom: ${props => props.theme.space.small}px;
    margin-bottom: ${props => props.theme.space.element}px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`

const ErrorBoundary: React.SFC<ErrorBoundaryProps> = ({ environment, error }) => {
  const isProduction = environment === "production"

  return (
    <Splash
      color="error"
      title="Something Went Wrong"
      actions={
        !isProduction ? (
          <Button to="https://reactjs.org/docs/error-boundaries.html">Learn More about Error Boundaries</Button>
        ) : (
          <Button to="/">Reload</Button>
        )
      }
    >
      {!isProduction ? (
        <>
          <p>
            One of your components further down in the component tree has errored, causing your app to unmount and
            instead, show this screen.
          </p>
          <p>Please handle your errors in your components further down the React tree.</p>

          <p>{`The error: ${error.message.length < 200 ? error.message : error.message.slice(0, 200) + `…`}`}</p>

          {error.stack && (
            <StackTrace>
              {error.stack.split("\n").map((line, index) => (
                <p key={index} style={{ paddingLeft: `${index * 8}px` }}>
                  {line}
                </p>
              ))}
            </StackTrace>
          )}
        </>
      ) : (
        <p>
          An unexpected error occured.
          <br />
          Please check back later.
        </p>
      )}
    </Splash>
  )
}

ErrorBoundary.defaultProps = {
  environment: process.env.NODE_ENV,
}

export default ErrorBoundary
