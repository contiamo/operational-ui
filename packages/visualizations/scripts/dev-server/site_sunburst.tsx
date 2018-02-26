import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI, Progress, Spinner } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

import Sunburst from "../../src/Sunburst/facade"
import { VisualizationWrapper } from "../../src/index"

const config: any = { maxRings: 4 }

const data = {
  name: "All",
  children: [
    {
      name: "Europe",
      value: 52000,
      children: [
        {
          name: "UK",
          value: 11500,
          children: [
            {
              name: "London",
              value: 1500,
              children: [
                {
                  name: "Southwark",
                  value: 123
                },
                {
                  name: "Lambeth",
                  value: 523
                },
                {
                  name: "Marylebone",
                  value: 623
                }
              ]
            },
            {
              name: "Sheffield",
              value: 1642
            },
            {
              name: "Exeter",
              value: 935
            },
            {
              name: "Manchester",
              value: 2076
            },
            {
              name: "Leeds",
              value: 2970
            }
          ]
        },
        {
          name: "Germany",
          value: 9240,
          children: [
            {
              name: "Berlin",
              children: [
                {
                  name: "Kreuzberg",
                  value: 693,
                  children: [
                    {
                      name: "test",
                      children: [
                        {
                          name: "test level 2",
                          children: [
                            {
                              name: "test level 3",
                              children: [
                                {
                                  name: "test level 4",
                                  value: 20
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "Prenzlauer Berg",
                  value: 402
                },
                {
                  name: "Mitte",
                  value: 573
                }
              ]
            },
            {
              name: "Dortmund",
              value: 1756
            },
            {
              name: "Köln",
              value: 1902
            },
            {
              name: "München",
              value: 2340
            }
          ]
        },
        {
          name: "Spain",
          value: 2345,
          children: [
            {
              name: "Madrid",
              value: 1025
            },
            {
              name: "Barcelona",
              value: 522
            }
          ]
        },
        {
          name: "Italy",
          value: 830,
          children: [
            {
              name: "Rome",
              value: 307
            },
            {
              name: "Venice",
              value: 132
            },
            {
              name: "Naples",
              value: 196
            }
          ]
        }
      ]
    },
    {
      name: "Asia",
      value: 38400,
      children: [
        {
          name: "Japan",
          value: 8230,
          children: [
            {
              name: "Tokyo",
              value: 2353
            },
            {
              name: "Osaka",
              value: 1864
            }
          ]
        },
        {
          name: "China",
          value: 13000,
          children: [
            {
              name: "Beijing",
              value: 3852
            },
            {
              name: "Shanghai",
              value: 3623
            },
            {
              name: "Chengdu",
              value: 2546
            }
          ]
        },
        {
          name: "Thailand",
          value: 2548
        },
        {
          name: "India",
          value: 1800,
          children: [
            {
              name: "Mumbai",
              value: 987
            },
            {
              name: "Delhi",
              value: 632
            }
          ]
        },
        {
          name: "Malaysia",
          value: 1423
        }
      ]
    },
    {
      name: "North America",
      color: "#f00",
      children: [
        {
          name: "USA",
          value: "33218",
          children: [
            {
              name: "Washington DC",
              value: 5742
            },
            {
              name: "California",
              value: 19200,
              children: [
                {
                  name: "San Fransisco",
                  value: 4298
                },
                {
                  name: "Los Angeles",
                  value: 6528
                },
                {
                  name: "Sacramento",
                  value: 3908
                }
              ]
            },
            {
              name: "New York City",
              value: 8276
            }
          ]
        },
        {
          name: "Canada",
          value: 6714,
          children: [
            {
              name: "Toronto",
              value: 2456
            },
            {
              name: "Vancouver",
              value: 4258
            }
          ]
        }
      ]
    },
    {
      name: "Africa",
      value: 4130,
      children: [
        {
          name: "South Africa",
          value: 1300,
          children: [
            {
              name: "Capetown",
              value: 1254
            }
          ]
        },
        {
          name: "Zimbabwe",
          value: 636
        },
        {
          name: "Tanzania",
          value: 132
        }
      ]
    }
  ]
}

const App = () => <OperationalUI><VisualizationWrapper facade={Sunburst} data={data} config={config} /></OperationalUI>

render(<App />, containerNode)

