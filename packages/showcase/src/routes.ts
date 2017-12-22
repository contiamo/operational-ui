export interface IRoute {
  url?: string
  label: string
  items: {
    url: string
    label: string
  }[]
}

export const routes: IRoute[] = [
  {
    url: "/components",
    label: "Components",
    items: [
      { url: "/basics", label: "Basics" },
      { url: "/breakdowns", label: "Breakdowns" },
      { url: "/buttons", label: "Buttons" },
      { url: "/cards", label: "Cards" },
      { url: "/chips", label: "Chips" },
      { url: "/color-pickers", label: "ColorPickers" },
      { url: "/context-menus", label: "Context Menus" },
      { url: "/form-fields", label: "Form Fields" },
      { url: "/grids", label: "Grids" },
      { url: "/icons", label: "Icons" },
      { url: "/info-tiles", label: "Info Tiles" },
      { url: "/modals", label: "Modals" },
      { url: "/paginators", label: "Paginators" },
      { url: "/progress", label: "Progress" },
      { url: "/sidebar", label: "Sidebar" },
      { url: "/switches", label: "Switches" },
      { url: "/tabs", label: "Tabs" },
      { url: "/timeline", label: "Timeline" },
      { url: "/tooltips", label: "Tooltips" }
    ]
  },
  {
    url: "/blocks",
    label: "Blocks",
    items: [{ url: "/filters", label: "Filters" }]
  },
  {
    url: "/visualizations",
    label: "Visualizations",
    items: [{ url: "/process-flow", label: "Process Flow" }]
  },
  {
    url: "/documentation",
    label: "Documentation",
    items: [{ url: "/comp", label: "Comp" }]
  }
]
