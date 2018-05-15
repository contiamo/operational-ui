import * as React from "react"
import { VisualizationWrapper, Sunburst } from "@operational/visualizations"
import { Div } from "glamorous"
import * as constants from "../../constants"

export const title = "Sunburst Charts"

export const docsUrl = `${constants.docsBaseUrl}/visualizations/sunburst.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Visualizations/Sunbursts.tsx`

const config = {
  width: 330,
  height: 330,
  maxRings: 2,
  sort: false,
  palette: [
    "#f2dd41",
    "#2b99d5",
    "#f59b44",
    "#417cba",
    "#d56456",
    "#4d619c",
    "#9b405d",
    "#4f467c",
    "#572b51",
    "#4a2d5b",
  ],
}

const sunburstData = {
  name: "All",
  value: 1400,
  children: [
    {
      name: "Europe",
      value: 520,
      children: [
        {
          name: "UK",
          value: 115,
        },
        {
          name: "Germany",
          value: 92,
          children: [
            {
              name: "Berlin",
              value: 17,
              children: [
                {
                  name: "Kreuzberg",
                  value: 5,
                },
                {
                  name: "Prenzlauer Berg",
                  value: 8,
                },
              ],
            },
            {
              name: "Dortmund",
              value: 17,
            },
            {
              name: "Köln",
              value: 19,
            },
            {
              name: "München",
              value: 23,
            },
          ],
        },
        {
          name: "Spain",
          value: 23,
        },
        {
          name: "Italy",
          value: 8,
        },
      ],
    },
    {
      name: "Asia",
      value: 384,
      children: [
        {
          name: "Japan",
          value: 82,
        },
        {
          name: "China",
          value: 130,
        },
        {
          name: "Thailand",
          value: 25,
        },
        {
          name: "India",
          value: 18,
        },
        {
          name: "Malaysia",
          value: 14,
        },
      ],
    },
    {
      name: "North America",
      value: 430,
      children: [
        {
          name: "USA",
          value: 332,
        },
        {
          name: "Canada",
          value: 67,
        },
      ],
    },
    {
      name: "Africa",
      value: 41,
      children: [
        {
          name: "South Africa",
          value: 13,
        },
        {
          name: "Zimbabwe",
          value: 6,
        },
        {
          name: "Tanzania",
          value: 1,
        },
      ],
    },
  ],
}

export const Component = () => (
  <React.Fragment>
    <VisualizationWrapper facade={Sunburst} data={sunburstData} config={config} />
  </React.Fragment>
)
