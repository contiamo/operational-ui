export const initialState = {
  iFrameUrl: "https://operational-ui.netlify.com",
  isDiffWithMaster: false,
}

export type Action = { type: "update iframe url"; url: string } | { type: "toggle master diff" }

export const styleguideReducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case "update iframe url":
      return { ...state, iFrameUrl: action.url }
    case "toggle master diff":
      return { ...state, isDiffWithMaster: !state.isDiffWithMaster }
  }
}
