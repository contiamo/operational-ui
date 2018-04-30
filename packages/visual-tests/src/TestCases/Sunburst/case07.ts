import { Sunburst } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new Sunburst(container)

  const accessors = {
    color: (d: any) => d.color || "#bbb",
  }

  const data = {
    name: "All",
    color: "#aaa",
    value: "1995",
    children: [
      {
        name: "Approval Notice",
        value: "1",
        children: [
          {
            name: "Event ABE",
            value: "1",
            children: [
              {
                name: "Metric Monitoring ABE",
                value: "1",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Common Business Entities Domain",
        value: "713",
        children: [
          {
            name: "Base Types ABE",
            value: "15",
            children: [
              {
                name: "Association ABE",
                value: "10",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Example1",
                value: "5",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Business Interaction ABE",
            value: "30",
            children: [
              {
                name: "Disputed Amount ABE",
                value: "8",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Dunning ABE",
                value: "22",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "22",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "22",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "22" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Calendar ABE",
            value: "42",
            children: [
              {
                name: "Project Scope ABE",
                value: "31",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "31",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "31",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "31" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Schedule Definition ABE",
                value: "11",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "11",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "11",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "11" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Capacity ABE",
            value: "14",
            children: [
              {
                name: "Performance Monitoring ABE",
                value: "14",
                children: [
                  {
                    name: "Performance Collection ABE",
                    value: "14",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "14",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "14" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Catalog ABE",
            value: "11",
            children: [
              {
                name: "Entity Catalog ABE",
                value: "7",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Management Job ABE",
                value: "4",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Configuration and Profiling ABE",
            value: "12",
            children: [
              {
                name: "Configuration Instance Diagrams and Instances",
                value: "3",
                children: [
                  {
                    name: "Configuration Instance Diagrams ",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Disputed Amount ABE",
                value: "9",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Bill Inquiry ABE",
            value: "1",
            children: [
              {
                name: "Dunning ABE",
                value: "1",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Event ABE",
            value: "6",
            children: [
              {
                name: "Metric Monitoring ABE",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Location ABE",
            value: "92",
            children: [
              {
                name: "Example1",
                value: "4",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Geographic Place ABE",
                value: "45",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "25",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "25",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "25" }],
                      },
                    ],
                  },
                  {
                    name: "Geographic Address ABE",
                    value: "15",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "15",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "15" }],
                      },
                    ],
                  },
                  {
                    name: "Symbology ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Local Place ABE",
                value: "27",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "27",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "27",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "27" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "OpenGisSFS ABE",
                value: "16",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "16",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "16",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "16" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Metric ABE",
            value: "56",
            children: [
              {
                name: "Example Metric Entities",
                value: "5",
                children: [
                  {
                    name: "Metric Definition Dimension ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Metric Definition ABE",
                value: "14",
                children: [
                  {
                    name: "Metric Definition Dimension ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                  {
                    name: "Metric Definition Measure Threshold ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Metric Definition Measure ABE",
                value: "18",
                children: [
                  {
                    name: "Metric Definition Measure Threshold ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                  {
                    name: "Performance Collection ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Metric Measure ABE",
                value: "6",
                children: [
                  {
                    name: "Metric Definition Measure Threshold ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Metric Monitoring ABE",
                value: "12",
                children: [
                  {
                    name: "Metric Collection ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Metric Definition Dimension ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                  {
                    name: "Metric Job ABE",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Performance Monitoring ABE",
                value: "1",
                children: [
                  {
                    name: "Performance Collection ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Performance ABE",
            value: "51",
            children: [
              {
                name: "Performance Category ABE",
                value: "7",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                  {
                    name: "Performance Category Specification ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Performance Monitoring ABE",
                value: "10",
                children: [
                  {
                    name: "Performance Category Specification ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                  {
                    name: "Performance Collection ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Performance Production ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Performance Specification ABE",
                value: "10",
                children: [
                  {
                    name: "Performance Category Specification ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Performance Threshold  ABE",
                value: "12",
                children: [
                  {
                    name: "Performance Category Specification ABE",
                    value: "12",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Usage Spec ABE",
                value: "12",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "12",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Policy ABE",
            value: "107",
            children: [
              {
                name: "Entity Catalog ABE",
                value: "1",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Policy Application ABE",
                value: "24",
                children: [
                  {
                    name: "Policy Server ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                  {
                    name: "PolicyApp Role ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Policy Framework ABE",
                value: "12",
                children: [
                  {
                    name: "Policy ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                  {
                    name: "PolicyApp Role ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Policy Framework Spec ABE",
                value: "10",
                children: [
                  {
                    name: "Policy Statement ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Policy Management ABE",
                value: "3",
                children: [
                  {
                    name: "Policy Statement ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Policy Structure ABE",
                value: "57",
                children: [
                  {
                    name: "Policy ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Action ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Condition ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Event ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Statement ABE",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Value ABE",
                    value: "11",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "11",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "11" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Variable ABE",
                    value: "21",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "21",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "21" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Project ABE",
            value: "138",
            children: [
              {
                name: "Activity ABE",
                value: "18",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "18",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "18",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "18" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Additional Relationships ABE",
                value: "1",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "EntitiesToBeFixedInPh4",
                value: "6",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "OpenGisSFS ABE",
                value: "25",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "25",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "25",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "25" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Project ABE",
                value: "14",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "14",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "14",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "14" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Project Calendar ABE",
                value: "7",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Project Element ABE",
                value: "9",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Project Resource ABE",
                value: "19",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "19",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "19",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "19" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Project Role ABE",
                value: "8",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Project Scope ABE",
                value: "4",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "SCRUM Blade ABE",
                value: "9",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Work Breakdown Structure ABE",
                value: "10",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Work Order ABE",
                value: "8",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Root Business Entities ABE",
            value: "67",
            children: [
              {
                name: "Association ABE",
                value: "5",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Characteristic ABE",
                value: "17",
                children: [
                  {
                    name: "Characteristic Pricing ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Policy Statement ABE",
                    value: "14",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "14",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "14" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Entity Identification ABE",
                value: "9",
                children: [
                  {
                    name: "Policy Statement ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Entity Specification Action ABE",
                value: "3",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Entity Specification Attachment ABE",
                value: "5",
                children: [
                  {
                    name: "Characteristic Pricing ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "External System Capability ABE",
                value: "7",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Policy Framework Spec ABE",
                value: "15",
                children: [
                  {
                    name: "Policy Statement ABE",
                    value: "15",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "15",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "15" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Root Entity Group ABE",
                value: "6",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "TIP Common ABE",
            value: "10",
            children: [
              {
                name: "Configuration Instance Diagrams and Instances",
                value: "1",
                children: [
                  {
                    name: "Configuration Instance Diagrams ",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Framework ABE",
                value: "5",
                children: [
                  {
                    name: "Configuration Instance Diagrams ",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Management Job ABE",
                value: "4",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Test ABE",
            value: "6",
            children: [
              {
                name: "Metric Monitoring ABE",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Topology ABE",
            value: "6",
            children: [
              {
                name: "Metric Monitoring ABE",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Trouble Ticket ABE",
            value: "3",
            children: [
              {
                name: "Usage Spec ABE",
                value: "3",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Trouble or Problem ABE",
            value: "4",
            children: [
              {
                name: "Entity Catalog ABE",
                value: "4",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Usage ABE",
            value: "36",
            children: [
              {
                name: "IP Detail Record ABE",
                value: "18",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "18",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "18",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "18" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Schedule Definition ABE",
                value: "6",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Usage Example Instances ABE",
                value: "2",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Usage Spec ABE",
                value: "10",
                children: [
                  {
                    name: "Geographic Address ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Users and Roles ABE",
            value: "6",
            children: [
              {
                name: "Performance Monitoring ABE",
                value: "6",
                children: [
                  {
                    name: "Performance Collection ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Customer Domain",
        value: "85",
        children: [
          {
            name: "Applied Customer Billing Rate ABE",
            value: "19",
            children: [
              {
                name: "Applied Customer Billing Rate Spec ABE",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "WorkSpecification ABE",
                value: "17",
                children: [
                  {
                    name: "Work ABE",
                    value: "17",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "17",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "17" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer ABE",
            value: "3",
            children: [
              {
                name: "WorkSpecification ABE",
                value: "3",
                children: [
                  {
                    name: "Work ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Bill ABE",
            value: "29",
            children: [
              {
                name: "Applied Customer Billing Rate Spec ABE",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Customer Account Balance ABE",
                value: "14",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                  {
                    name: "Customer Billing Credit ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                  {
                    name: "Work ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Customer Billing Statistic ABE",
                value: "13",
                children: [
                  {
                    name: "Work ABE",
                    value: "13",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "13",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "13" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Bill Collection ABE",
            value: "13",
            children: [
              {
                name: "Customer Account Balance ABE",
                value: "1",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Customer Payment ABE",
                value: "3",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Dunning ABE",
                value: "9",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Bill Inquiry ABE",
            value: "2",
            children: [
              {
                name: "Dunning ABE",
                value: "2",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Interaction ABE",
            value: "5",
            children: [
              {
                name: "WorkSpecification ABE",
                value: "5",
                children: [
                  {
                    name: "Work ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Order ABE",
            value: "3",
            children: [
              {
                name: "WorkSpecification ABE",
                value: "3",
                children: [
                  {
                    name: "Work ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Problem ABE",
            value: "6",
            children: [
              {
                name: "Dunning ABE",
                value: "6",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Service Level Agreement ABE",
            value: "2",
            children: [
              {
                name: "WorkSpecification ABE",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Customer Statistic ABE",
            value: "2",
            children: [
              {
                name: "WorkSpecification ABE",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Workforce ABE",
            value: "1",
            children: [
              {
                name: "WorkSpecification ABE",
                value: "1",
                children: [
                  {
                    name: "Work ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Engaged Party Domain",
        color: "#e20074",
        value: "291",
        children: [
          {
            name: "Additional Party Entities ABE",
            value: "9",
            children: [
              {
                name: "Example Party Order Entities ABE",
                value: "9",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Agreement ABE",
            value: "14",
            children: [
              {
                name: "Commitment ABE",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Metric Monitoring ABE",
                value: "8",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Event ABE",
            value: "1",
            children: [
              {
                name: "Metric Monitoring ABE",
                value: "1",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party ABE",
            color: "#e20074",
            value: "100",
            children: [
              {
                name: "Commitment ABE",
                value: "16",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "16",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "16",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "16" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Contact ABE",
                color: "#e20074",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#e20074",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#e20074",
                        value: "6",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "6" },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Currency ABE",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Identification ABE",
                value: "12",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "12",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Community ABE",
                value: "10",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Demographic ABE",
                value: "9",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Organization ABE",
                value: "5",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Profile ABE",
                value: "7",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Role Examples ABE",
                color: "#e20074",
                value: "18",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#e20074",
                    value: "18",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#e20074",
                        value: "18",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "18" },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Role Group ABE",
                value: "7",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Skill ABE",
                value: "4",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Interaction ABE",
            color: "#e20074",
            value: "8",
            children: [
              {
                name: "Example Party Order Entities ABE",
                color: "#e20074",
                value: "8",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#e20074",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#e20074",
                        value: "8",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "8" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Order ABE",
            value: "8",
            children: [
              {
                name: "Example Party Order Entities ABE",
                value: "5",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Role Group ABE",
                value: "3",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Privacy ABE",
            value: "11",
            children: [
              {
                name: "Party Privacy Profile ABE",
                value: "4",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    value: "4",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Privacy Profile Type ABE",
                value: "6",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    value: "6",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Role Product Specification ABE",
                value: "1",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Problem ABE",
            value: "6",
            children: [
              {
                name: "Party Revenue Sharing ABE",
                value: "6",
                children: [
                  {
                    name: "Party Revenue Sharing Model ABE",
                    value: "6",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Product Specification and Offering ABE",
            color: "#e20074",
            value: "15",
            children: [
              {
                name: "Party Revenue Sharing ABE",
                color: "#e20074",
                value: "1",
                children: [
                  {
                    name: "Party Revenue Sharing Model ABE",
                    color: "#e20074",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#e20074",
                        value: "1",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "1" },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Role Product Offering ABE",
                value: "6",
                children: [
                  {
                    name: "Example Party Role Product Offering Entities ABE",
                    value: "3",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Party Revenue Sharing Model ABE",
                    value: "3",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Role Product Specification ABE",
                color: "#e20074",
                value: "8",
                children: [
                  {
                    name: "Example Party Role Product Offering Entities ABE",
                    value: "3",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    color: "#e20074",
                    value: "5",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#e20074",
                        value: "5",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "5" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Revenue ABE",
            color: "#e20074",
            value: "114",
            children: [
              {
                name: "Applied Party Billing Rate ABE",
                value: "16",
                children: [
                  {
                    name: "Party Billing Statistic ABE",
                    value: "16",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "16",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "16" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Example Party Order Entities ABE",
                value: "1",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Bill ABE",
                value: "30",
                children: [
                  {
                    name: "Dunning ABE",
                    value: "10",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                  {
                    name: "Party Billing Credit ABE",
                    value: "7",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }],
                      },
                    ],
                  },
                  {
                    name: "Party Billing Statistic ABE",
                    value: "13",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "13",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "13" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Bill Collection ABE",
                value: "31",
                children: [
                  {
                    name: "Dunning ABE",
                    value: "9",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }],
                      },
                    ],
                  },
                  {
                    name: "Metric Job ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                  {
                    name: "Party Payment ABE",
                    value: "21",
                    children: [
                      {
                        name: "Bank ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                      {
                        name: "Payment Method ABE",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }],
                      },
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Revenue Sharing ABE",
                color: "#e20074",
                value: "28",
                children: [
                  {
                    name: "Party Billing Statistic ABE",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                  {
                    name: "Party Revenue Share ABE",
                    color: "#e20074",
                    value: "12",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#e20074",
                        value: "12",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "12" },
                        ],
                      },
                    ],
                  },
                  {
                    name: "Party Revenue Share Reconciliation ABE",
                    value: "5",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                  {
                    name: "Party Revenue Sharing Agreement ABE",
                    color: "#e20074",
                    value: "4",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#e20074",
                        value: "4",
                        children: [
                          { name: "Security Vulnerability Scoring Algorithm ABE", color: "#e20074", value: "4" },
                        ],
                      },
                    ],
                  },
                  {
                    name: "Party Revenue Sharing Model ABE",
                    value: "6",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Party Settlement ABE",
                value: "8",
                children: [
                  {
                    name: "Party Billing Statistic ABE",
                    value: "8",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Service Level Agreement ABE",
            value: "2",
            children: [
              {
                name: "Example Party Order Entities ABE",
                value: "2",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Statistic ABE",
            value: "2",
            children: [
              {
                name: "Example Party Order Entities ABE",
                value: "2",
                children: [
                  {
                    name: "Metric Job ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Party Strategy ABE",
            value: "1",
            children: [
              {
                name: "Party Privacy Profile Type ABE",
                value: "1",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Enterprise Domain",
        value: "158",
        children: [
          {
            name: "Enterprise Effectiveness ABE",
            value: "10",
            children: [
              {
                name: "Business Objective ABE",
                value: "5",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Process ABE",
                value: "2",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Process Definition ABE",
                value: "2",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Revenue Assurance ABE",
                value: "1",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Enterprise Risk ABE",
            value: "119",
            children: [
              {
                name: "Enterprise Security ABE",
                value: "89",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                  {
                    name: "Security Entity ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                  {
                    name: "Security Event ABE",
                    value: "15",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "15",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "15" }],
                      },
                    ],
                  },
                  {
                    name: "Security Incident ABE",
                    value: "11",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "11",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "11" }],
                      },
                    ],
                  },
                  {
                    name: "Security Threat ABE",
                    value: "28",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                      {
                        name: "Security Threat Technique ABE",
                        value: "10",
                        children: [{ name: "Placeholder Classes", value: "10" }],
                      },
                      {
                        name: "Security Threat Tool ABE",
                        value: "10",
                        children: [{ name: "Placeholder Classes", value: "10" }],
                      },
                    ],
                  },
                  {
                    name: "Security Vulnerability ABE",
                    value: "28",
                    children: [
                      {
                        name: "Security Threat Tool ABE",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }],
                      },
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                      {
                        name: "Security Vulnerability Scoring Definition ABE",
                        value: "13",
                        children: [
                          { name: "Placeholder Classes", value: "7" },
                          { name: "Security Vulnerability Scoring Algorithm ABE", value: "6" },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Media ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Revenue Assurance ABE",
                value: "29",
                children: [
                  {
                    name: "RA Action_Response ABE",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }],
                      },
                    ],
                  },
                  {
                    name: "RA Assessment ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                  {
                    name: "RA Control ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                  {
                    name: "RA Key Performance Indicator ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "RA Trouble Ticket ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "RA Violation ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Security Entity ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Marketing Campaign ABE",
            value: "1",
            children: [
              {
                name: "Media ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Workforce ABE",
            value: "28",
            children: [
              {
                name: "Business Objective ABE",
                value: "1",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "WorkSpecification ABE",
                value: "8",
                children: [
                  {
                    name: "Work ABE",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Workforce Resource ABE",
                value: "13",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }],
                      },
                    ],
                  },
                  {
                    name: "Work ABE",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Workforce Schedule ABE",
                value: "6",
                children: [
                  {
                    name: "RA Assessment ABE",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Market_Sales Domain",
        value: "49",
        children: [
          {
            name: "Competitor ABE",
            value: "22",
            children: [
              {
                name: "Competitor Intelligence ABE",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Competitor Product Correlation ABE",
                value: "6",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "6",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "6",
                        children: [{ name: "Placeholder Classes", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Market Statistic ABE",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Contact Lead Prospect ABE",
            value: "1",
            children: [
              {
                name: "Competitor Product Correlation ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Market Segment ABE",
            value: "12",
            children: [
              {
                name: "Market Statistic ABE",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Action ABE",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Market Strategy Plan ABE",
            value: "2",
            children: [
              {
                name: "Market Statistic ABE",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Marketing Campaign ABE",
            value: "8",
            children: [
              {
                name: "Competitor Product Correlation ABE",
                value: "6",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "6",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "6",
                        children: [{ name: "Placeholder Classes", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Media ABE",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Performance ABE",
            value: "1",
            children: [
              {
                name: "Product Action ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Sales Channel ABE",
            value: "2",
            children: [
              {
                name: "Market Statistic ABE",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Sales Statistics ABE",
            value: "1",
            children: [
              {
                name: "Competitor Product Correlation ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Product Domain",
        value: "131",
        children: [
          {
            name: "Loyalty ABE",
            value: "15",
            children: [
              {
                name: "Loyalty Program ABE",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Loyalty Program Specification ABE",
                value: "6",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "6",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "6",
                        children: [{ name: "Placeholder Classes", value: "6" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Usage Spec ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product ABE",
            value: "16",
            children: [
              {
                name: "Pricing Logic Algorithm ABE",
                value: "7",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Price ABE",
                value: "9",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "9",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Configuration ABE",
            value: "7",
            children: [
              {
                name: "Loyalty Program ABE",
                value: "3",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Action ABE",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Offering ABE",
            value: "52",
            children: [
              {
                name: "Example Product Specification Entities ABE",
                value: "9",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "9",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Pricing Logic Algorithm ABE",
                value: "15",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                  {
                    name: "PLA Spec ABE",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Catalog ABE",
                value: "4",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Offering Price ABE",
                value: "15",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "15",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "15",
                        children: [{ name: "Placeholder Classes", value: "15" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Offering Price Rule ABE",
                value: "5",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "5",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "5",
                        children: [{ name: "Placeholder Classes", value: "5" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Placement ABE",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Promotion ABE",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Performance ABE",
            value: "1",
            children: [
              {
                name: "Product Action ABE",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Specification ABE",
            value: "26",
            children: [
              {
                name: "Alarm ABE",
                value: "17",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "17",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "17",
                        children: [{ name: "Placeholder Classes", value: "17" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Example Product Specification Entities ABE",
                value: "9",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "9",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Test ABE",
            value: "3",
            children: [
              {
                name: "Product Action ABE",
                value: "3",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Product Usage ABE",
            value: "8",
            children: [
              {
                name: "Product Price ABE",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Product Usage Spec ABE",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Strategy & Plan ABE",
            value: "1",
            children: [
              {
                name: "Alarm ABE",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Strategic Product Portfolio Plan ABE",
            value: "2",
            children: [
              {
                name: "Product Price ABE",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Resource Domain",
        value: "438",
        children: [
          {
            name: "Resource ABE",
            value: "354",
            children: [
              {
                name: "CompoundResource ABE",
                value: "7",
                children: [
                  {
                    name: "PhysicalRole System View ABE",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "CompoundResource Specification ABE",
                value: "8",
                children: [
                  {
                    name: "Physical Role Specification ABE",
                    value: "8",
                    children: [
                      { name: "Software Resource Specification ABE", value: "8", children: [{ name: "", value: "8" }] },
                    ],
                  },
                ],
              },
              {
                name: "LogicalResource ABE",
                value: "245",
                children: [
                  {
                    name: "Address ABE",
                    value: "7",
                    children: [
                      { name: "Device Interface Association ABE", value: "7", children: [{ name: "", value: "7" }] },
                    ],
                  },
                  {
                    name: "Computing and Software ABE",
                    value: "12",
                    children: [
                      { name: "Software Resource Specification ABE", value: "1", children: [{ name: "", value: "1" }] },
                      {
                        name: "Software Resource and Software ABE",
                        value: "11",
                        children: [{ name: "", value: "11" }],
                      },
                    ],
                  },
                  {
                    name: "Converged Network ABE",
                    value: "30",
                    children: [
                      { name: "Class Diagrams", value: "1", children: [{ name: "", value: "1" }] },
                      {
                        name: "Informal Classes",
                        value: "12",
                        children: [
                          { name: "", value: "1" },
                          { name: "Example Classes", value: "8" },
                          { name: "Placeholder Classes", value: "3" },
                        ],
                      },
                      { name: "Network Resource Fulfillment ABE", value: "17", children: [{ name: "", value: "17" }] },
                    ],
                  },
                  {
                    name: "Device Interface ABE",
                    value: "24",
                    children: [
                      { name: "Device Interface Association ABE", value: "11", children: [{ name: "", value: "11" }] },
                      { name: "Switching Protocols ABE", value: "13", children: [{ name: "", value: "13" }] },
                    ],
                  },
                  {
                    name: "Device Protocol Association ABE",
                    value: "9",
                    children: [
                      { name: "Device Interface Association ABE", value: "9", children: [{ name: "", value: "9" }] },
                    ],
                  },
                  {
                    name: "Logical Device ABE",
                    value: "4",
                    children: [
                      { name: "Device Interface Association ABE", value: "4", children: [{ name: "", value: "4" }] },
                    ],
                  },
                  {
                    name: "Logical Role ABE",
                    value: "16",
                    children: [
                      { name: "Service Statistical Info ABE", value: "16", children: [{ name: "", value: "16" }] },
                    ],
                  },
                  {
                    name: "LogicalResource Examples ABE",
                    value: "2",
                    children: [
                      { name: "Informal Classes", value: "2", children: [{ name: "Placeholder Classes", value: "2" }] },
                    ],
                  },
                  {
                    name: "Managed Transmission ABE",
                    value: "9",
                    children: [
                      { name: "Software Resource and Software ABE", value: "5", children: [{ name: "", value: "5" }] },
                      { name: "Termination Point ABE", value: "4", children: [{ name: "", value: "4" }] },
                    ],
                  },
                  {
                    name: "Management Information ABE",
                    value: "36",
                    children: [
                      { name: "Accounting ABE", value: "2", children: [{ name: "", value: "2" }] },
                      { name: "Configuration ABE", value: "9", children: [{ name: "", value: "9" }] },
                      { name: "Device Interface Association ABE", value: "1", children: [{ name: "", value: "1" }] },
                      { name: "Management Method ABE", value: "9", children: [{ name: "", value: "9" }] },
                      { name: "Performance Info ABE", value: "2", children: [{ name: "", value: "2" }] },
                      { name: "Resource State ABE", value: "2", children: [{ name: "", value: "2" }] },
                      { name: "Resource Statistical ABE", value: "2", children: [{ name: "", value: "2" }] },
                      { name: "Security ABE", value: "5", children: [{ name: "", value: "5" }] },
                      { name: "Service State ABE", value: "2", children: [{ name: "", value: "2" }] },
                      { name: "Service Statistical Info ABE", value: "2", children: [{ name: "", value: "2" }] },
                    ],
                  },
                  {
                    name: "Network ABE",
                    value: "11",
                    children: [{ name: "Termination Point ABE", value: "11", children: [{ name: "", value: "11" }] }],
                  },
                  {
                    name: "Physical Role Specification ABE",
                    value: "7",
                    children: [
                      { name: "Software Resource Specification ABE", value: "7", children: [{ name: "", value: "7" }] },
                    ],
                  },
                  {
                    name: "Protection ABE",
                    value: "3",
                    children: [
                      { name: "Network Resource Fulfillment ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                  {
                    name: "Protocol Service ABE",
                    value: "52",
                    children: [
                      { name: "Bridging Protocols ABE", value: "6", children: [{ name: "", value: "6" }] },
                      { name: "LAN Protocols ABE", value: "5", children: [{ name: "", value: "5" }] },
                      { name: "Management Protocols ABE", value: "4", children: [{ name: "", value: "4" }] },
                      { name: "Routed Protocols ABE", value: "6", children: [{ name: "", value: "6" }] },
                      { name: "Routing Protocols ABE", value: "12", children: [{ name: "", value: "12" }] },
                      { name: "Signaling Protocols ABE", value: "4", children: [{ name: "", value: "4" }] },
                      { name: "Switching Protocols ABE", value: "3", children: [{ name: "", value: "3" }] },
                      { name: "Termination Point ABE", value: "2", children: [{ name: "", value: "2" }] },
                      { name: "WAN Protocols ABE", value: "10", children: [{ name: "", value: "10" }] },
                    ],
                  },
                  {
                    name: "Resource Number ABE",
                    value: "3",
                    children: [
                      { name: "Informal Classes", value: "3", children: [{ name: "Placeholder Classes", value: "3" }] },
                    ],
                  },
                  {
                    name: "Statistics ABE",
                    value: "2",
                    children: [{ name: "Switching Protocols ABE", value: "2", children: [{ name: "", value: "2" }] }],
                  },
                  {
                    name: "TIP Logical Resource ABE",
                    value: "18",
                    children: [
                      { name: "Network Resource Fulfillment ABE", value: "17", children: [{ name: "", value: "17" }] },
                      { name: "Service Statistical Info ABE", value: "1", children: [{ name: "", value: "1" }] },
                    ],
                  },
                ],
              },
              {
                name: "PhysicalResource ABE",
                value: "69",
                children: [
                  {
                    name: "Auxiliary Component ABE",
                    value: "5",
                    children: [
                      { name: "Informal Classes", value: "5", children: [{ name: "Placeholder Classes", value: "5" }] },
                    ],
                  },
                  {
                    name: "Equipment ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                  {
                    name: "Equipment Holder ABE",
                    value: "14",
                    children: [
                      { name: "HolderAtomic ABE", value: "4", children: [{ name: "Placeholder Classes", value: "4" }] },
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                      { name: "Informal Classes", value: "2", children: [{ name: "Placeholder Classes", value: "2" }] },
                    ],
                  },
                  {
                    name: "Hardware ABE",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }],
                      },
                    ],
                  },
                  {
                    name: "LogicalResource Examples ABE",
                    value: "6",
                    children: [
                      { name: "Informal Classes", value: "6", children: [{ name: "Placeholder Classes", value: "6" }] },
                    ],
                  },
                  {
                    name: "Physical Capacity ABE",
                    value: "5",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "5",
                        children: [{ name: "Placeholder Classes", value: "5" }],
                      },
                    ],
                  },
                  {
                    name: "Physical Component ABE",
                    value: "7",
                    children: [
                      { name: "Informal Classes", value: "7", children: [{ name: "Placeholder Classes", value: "7" }] },
                    ],
                  },
                  {
                    name: "Physical Device ABE",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }],
                      },
                    ],
                  },
                  {
                    name: "Physical Role ABE",
                    value: "13",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "13",
                        children: [{ name: "Placeholder Classes", value: "13" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Resource Order ABE",
                value: "14",
                children: [
                  {
                    name: "PhysicalRole System View ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "Resource Number Portability ABE",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }],
                      },
                    ],
                  },
                  {
                    name: "Resource Number Portability Role ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "ResourceRole System View ABE",
                value: "7",
                children: [
                  {
                    name: "LogicalRole System View ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                  {
                    name: "Physical Role ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                  {
                    name: "PhysicalRole System View ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "TIP Resource ABE",
                value: "4",
                children: [
                  {
                    name: "Network Resource Assurance ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                  {
                    name: "Network Resource Basic ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                  {
                    name: "Resource Number Portability Role ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Configuration ABE",
            value: "3",
            children: [
              {
                name: "Alarm ABE",
                value: "3",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Performance ABE",
            value: "4",
            children: [
              {
                name: "Resource Performance Specification ABE",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "TIP Resource ABE",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Specification ABE",
            value: "62",
            children: [
              {
                name: "CompoundResource Specification ABE",
                value: "3",
                children: [
                  {
                    name: "Physical Role Specification ABE",
                    value: "3",
                    children: [
                      { name: "Software Resource Specification ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                ],
              },
              {
                name: "LogicalResource Specification ABE",
                value: "30",
                children: [
                  {
                    name: "Logical Role Specification ABE",
                    value: "2",
                    children: [
                      { name: "Software Resource Specification ABE", value: "2", children: [{ name: "", value: "2" }] },
                    ],
                  },
                  {
                    name: "LogicalResource Spec Examples ABE",
                    value: "7",
                    children: [
                      { name: "Software Resource Specification ABE", value: "7", children: [{ name: "", value: "7" }] },
                    ],
                  },
                  {
                    name: "Service Bundle ABE",
                    value: "5",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] },
                    ],
                  },
                  {
                    name: "Software Resource and Software Specifications ABE",
                    value: "16",
                    children: [
                      {
                        name: "Service Bundle Examples ABE",
                        value: "1",
                        children: [{ name: "", value: "1" }],
                      },
                      {
                        name: "Software Resource Specification ABE",
                        value: "8",
                        children: [{ name: "", value: "8" }],
                      },
                      {
                        name: "Software Specification ABE",
                        value: "7",
                        children: [{ name: "", value: "7" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "PhysicalResource Specification ABE",
                value: "10",
                children: [
                  {
                    name: "LogicalResource Spec Examples ABE",
                    value: "6",
                    children: [
                      { name: "Software Resource Specification ABE", value: "6", children: [{ name: "", value: "6" }] },
                    ],
                  },
                  {
                    name: "Physical Role Specification ABE",
                    value: "4",
                    children: [
                      { name: "Software Resource Specification ABE", value: "4", children: [{ name: "", value: "4" }] },
                    ],
                  },
                ],
              },
              {
                name: "Resource Catalog ABE",
                value: "5",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "5",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] },
                    ],
                  },
                ],
              },
              {
                name: "Service Level Spec ABE",
                value: "14",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "14",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "14", children: [{ name: "", value: "14" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Strategy & Plan ABE",
            value: "1",
            children: [
              {
                name: "Alarm ABE",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Test ABE",
            value: "3",
            children: [
              {
                name: "Alarm ABE",
                value: "3",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Topology ABE",
            value: "1",
            children: [
              {
                name: "Alarm ABE",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Trouble ABE",
            value: "6",
            children: [
              {
                name: "Alarm ABE",
                value: "3",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Alarm Severity Assignment Profile ABE",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Resource Performance Specification ABE",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Resource Usage ABE",
            value: "3",
            children: [
              {
                name: "CompoundResource Specification ABE",
                value: "3",
                children: [
                  {
                    name: "Physical Role Specification ABE",
                    value: "3",
                    children: [
                      { name: "Software Resource Specification ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Strategy & Plan ABE",
            value: "1",
            children: [
              {
                name: "Service Level Spec ABE",
                value: "1",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "1",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "1", children: [{ name: "", value: "1" }] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Service Domain",
        value: "129",
        children: [
          {
            name: "",
            value: "1",
            children: [
              {
                name: "",
                value: "1",
                children: [
                  { name: "", value: "1", children: [{ name: "", value: "1", children: [{ name: "", value: "1" }] }] },
                ],
              },
            ],
          },
          {
            name: "Service ABE",
            value: "39",
            children: [
              {
                name: "",
                value: "11",
                children: [
                  {
                    name: "",
                    value: "11",
                    children: [{ name: "", value: "11", children: [{ name: "", value: "11" }] }],
                  },
                ],
              },
              {
                name: "Customer Facing Service ABE",
                value: "9",
                children: [
                  { name: "", value: "5", children: [{ name: "", value: "5", children: [{ name: "", value: "5" }] }] },
                  {
                    name: "Customer Facing Service Example ABE",
                    value: "2",
                    children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }],
                  },
                  {
                    name: "CustomerFacing Service Role ABE",
                    value: "2",
                    children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }],
                  },
                ],
              },
              {
                name: "Resource Facing Service ABE",
                value: "16",
                children: [
                  {
                    name: "Customer Facing Service Example ABE",
                    value: "6",
                    children: [{ name: "", value: "6", children: [{ name: "", value: "6" }] }],
                  },
                  {
                    name: "Resource Facing Service Examples ABE",
                    value: "6",
                    children: [{ name: "", value: "6", children: [{ name: "", value: "6" }] }],
                  },
                  {
                    name: "Resource Facing Service Role ABE",
                    value: "4",
                    children: [{ name: "", value: "4", children: [{ name: "", value: "4" }] }],
                  },
                ],
              },
              {
                name: "Service Order ABE",
                value: "3",
                children: [
                  {
                    name: "Resource Facing Service Examples ABE",
                    value: "3",
                    children: [{ name: "", value: "3", children: [{ name: "", value: "3" }] }],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Configuration ABE",
            value: "3",
            children: [
              {
                name: "Service Level Spec ABE",
                value: "3",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "3",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Performance ABE",
            value: "15",
            children: [
              {
                name: "Service Catalog ABE",
                value: "2",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "2",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "2", children: [{ name: "", value: "2" }] },
                    ],
                  },
                ],
              },
              {
                name: "Service Level Spec ABE",
                value: "11",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "11",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "11", children: [{ name: "", value: "11" }] },
                    ],
                  },
                ],
              },
              {
                name: "Service Performance Specification ABE",
                value: "2",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "2",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "2", children: [{ name: "", value: "2" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Problem ABE",
            value: "2",
            children: [
              {
                name: "",
                value: "2",
                children: [
                  { name: "", value: "2", children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }] },
                ],
              },
            ],
          },
          {
            name: "Service Specification ABE",
            value: "56",
            children: [
              {
                name: "Customer Facing Service Spec ABE",
                value: "21",
                children: [
                  {
                    name: "Customer Facing Service Spec Examples ABE",
                    value: "3",
                    children: [
                      { name: "Service Package Spec Examples ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                  {
                    name: "Customer Facing Service Spec Role ABE",
                    value: "2",
                    children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }],
                  },
                  {
                    name: "Resource Facing Service Examples ABE",
                    value: "6",
                    children: [{ name: "", value: "6", children: [{ name: "", value: "6" }] }],
                  },
                  {
                    name: "Service Package ABE",
                    value: "10",
                    children: [
                      { name: "", value: "4", children: [{ name: "", value: "4" }] },
                      { name: "Service Package Spec Examples ABE", value: "6", children: [{ name: "", value: "6" }] },
                    ],
                  },
                ],
              },
              {
                name: "Resource Facing Service Spec ABE",
                value: "18",
                children: [
                  {
                    name: "Customer Facing Service Spec Examples ABE",
                    value: "6",
                    children: [
                      { name: "Service Package Spec Examples ABE", value: "6", children: [{ name: "", value: "6" }] },
                    ],
                  },
                  {
                    name: "Resource Facing Service Spec Role ABE",
                    value: "2",
                    children: [
                      { name: "Service Package Spec Examples ABE", value: "2", children: [{ name: "", value: "2" }] },
                    ],
                  },
                  {
                    name: "Service Bundle ABE",
                    value: "10",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] },
                      { name: "Service Package Spec Examples ABE", value: "5", children: [{ name: "", value: "5" }] },
                    ],
                  },
                ],
              },
              {
                name: "Service Catalog ABE",
                value: "5",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "5",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] },
                    ],
                  },
                ],
              },
              {
                name: "Service Order ABE",
                value: "12",
                children: [
                  {
                    name: "Resource Facing Service Examples ABE",
                    value: "12",
                    children: [{ name: "", value: "12", children: [{ name: "", value: "12" }] }],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Strategy & Plan ABE",
            value: "1",
            children: [
              {
                name: "Service Level Spec ABE",
                value: "1",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "1",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "1", children: [{ name: "", value: "1" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Test ABE",
            value: "3",
            children: [
              {
                name: "Service Level Spec ABE",
                value: "3",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "3",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Service Usage ABE",
            value: "3",
            children: [
              {
                name: "Service Catalog ABE",
                value: "3",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "3",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "3", children: [{ name: "", value: "3" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "TIP Service Management ABE",
            value: "6",
            children: [
              {
                name: "Service Level Spec ABE",
                value: "6",
                children: [
                  {
                    name: "Service Bundle ABE",
                    value: "6",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "6", children: [{ name: "", value: "6" }] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }

  test("Renders the chart", () => {
    viz.data(data)
    viz.config({
      disableAnimations: true,
      width: 1000,
      height: 1000,
      outerBorderMargin: 5,
      propagateColors: false,
    })
    viz.accessors("series", accessors)
    viz.draw()
  })
}

export const title = "Large dataset"

// Must match the file name so we can link to the code on GitHub
export const slug = "case07"
