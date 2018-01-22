const Events = {
  CHART: {
    CLICK: "chart:click",
    MOUSEOVER: "chart:mouseover",
    MOVE: "chart:mousemove",
    MOUSEOUT: "chart:mouseout"
  },
  FOCUS: {
    CLEAR: "focus:clear",
    COMPONENT: {
      CLICK: "focus:component:click",
      MOUSEOVER: "focus:component:mouseover",
      MOUSEOUT: "focus:component:mouseout",
      LABEL: {
        MOUSEOUT: "focus:component:label:mouseout"
      }
    },
    ELEMENT: {
      HIGHLIGHT: "focus:element:highlight",
      CLICK: "focus:element:click",
      MOUSEOVER: "focus:element:mouseover",
      MOUSEOUT: "focus:element:mouseout"
    }
  },
  BREADCRUMB: {
    CLICK: "breadcrumb:click"
  }
}

export default Events
