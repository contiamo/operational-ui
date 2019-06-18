import { createContext } from "react"
import { Action, initialState } from "./styleguideReducer"

export const StyleguideContext = createContext<[typeof initialState, React.Dispatch<Action>]>([initialState, () => {}])
