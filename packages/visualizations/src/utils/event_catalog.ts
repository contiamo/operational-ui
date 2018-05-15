const Events = {
  CHART: {
    CLICK: "chart:click",
    HOVER: "chart:hover",
    MOVE: "chart:mousemove",
    OUT: "chart:out",
  },
  FOCUS: {
    CLEAR: "focus:clear",
    COMPONENT: {
      CLICK: "focus:component:click",
      HOVER: "focus:component:hover",
      OUT: "focus:component:out",
      LABEL: {
        OUT: "focus:component:label:out",
      },
    },
    DATE: "focus:date",
    ELEMENT: {
      HIGHLIGHT: "focus:element:highlight",
      CLICK: "focus:element:click",
      HOVER: "focus:element:hover",
      OUT: "focus:element:out",
    },
    FLAG: {
      HOVER: "focus:flag:hover",
      OUT: "focus:flag:out",
    },
  },
}

export default Events
