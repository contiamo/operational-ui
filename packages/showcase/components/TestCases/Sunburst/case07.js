import Layout from "../../../components/Layout"
import { Sunburst } from "@operational/visualizations"
import Marathon from "../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

export const marathon = ({ test, afterAll, container }) => {
  const viz = new Sunburst(container)

  const data = {
    name: "All",
    color: "#aaa",
    color: "#bbb",
    value: "1995",
    children: [
      {
        name: "Approval Notice",
        color: "#bbb",
        value: "1",
        children: [
          {
            name: "Event ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
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
        name: "Common Business Entities Domain",
        color: "#bbb",
        value: "713",
        children: [
          {
            name: "Base Types ABE",
            color: "#bbb",
            value: "15",
            children: [
              {
                name: "Association ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Example1",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Business Interaction ABE",
            color: "#bbb",
            value: "30",
            children: [
              {
                name: "Disputed Amount ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Dunning ABE",
                color: "#bbb",
                value: "22",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "22",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "22",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "22" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Calendar ABE",
            color: "#bbb",
            value: "42",
            children: [
              {
                name: "Project Scope ABE",
                color: "#bbb",
                value: "31",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "31",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "31",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "31" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Schedule Definition ABE",
                color: "#bbb",
                value: "11",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "11",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "11",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "11" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Capacity ABE",
            color: "#bbb",
            value: "14",
            children: [
              {
                name: "Performance Monitoring ABE",
                color: "#bbb",
                value: "14",
                children: [
                  {
                    name: "Performance Collection ABE",
                    color: "#bbb",
                    value: "14",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "14",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "14" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Catalog ABE",
            color: "#bbb",
            value: "11",
            children: [
              {
                name: "Entity Catalog ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Management Job ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Configuration and Profiling ABE",
            color: "#bbb",
            value: "12",
            children: [
              {
                name: "Configuration Instance Diagrams and Instances",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Configuration Instance Diagrams ",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  },
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Disputed Amount ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Bill Inquiry ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Dunning ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Event ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Location ABE",
            color: "#bbb",
            value: "92",
            children: [
              {
                name: "Example1",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Geographic Place ABE",
                color: "#bbb",
                value: "45",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "25",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "25",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "25" }]
                      }
                    ]
                  },
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "15",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "15",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "15" }]
                      }
                    ]
                  },
                  {
                    name: "Symbology ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Local Place ABE",
                color: "#bbb",
                value: "27",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "27",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "27",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "27" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "OpenGisSFS ABE",
                color: "#bbb",
                value: "16",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "16",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "16",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "16" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Metric ABE",
            color: "#bbb",
            value: "56",
            children: [
              {
                name: "Example Metric Entities",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Metric Definition Dimension ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Metric Definition ABE",
                color: "#bbb",
                value: "14",
                children: [
                  {
                    name: "Metric Definition Dimension ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  },
                  {
                    name: "Metric Definition Measure Threshold ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Metric Definition Measure ABE",
                color: "#bbb",
                value: "18",
                children: [
                  {
                    name: "Metric Definition Measure Threshold ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  },
                  {
                    name: "Performance Collection ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Metric Measure ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Metric Definition Measure Threshold ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "12",
                children: [
                  {
                    name: "Metric Collection ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "Metric Definition Dimension ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  },
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Performance Monitoring ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Performance Collection ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Performance ABE",
            color: "#bbb",
            value: "51",
            children: [
              {
                name: "Performance Category ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  },
                  {
                    name: "Performance Category Specification ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Performance Monitoring ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Performance Category Specification ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  },
                  {
                    name: "Performance Collection ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "Performance Production ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Performance Specification ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Performance Category Specification ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Performance Threshold  ABE",
                color: "#bbb",
                value: "12",
                children: [
                  {
                    name: "Performance Category Specification ABE",
                    color: "#bbb",
                    value: "12",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Usage Spec ABE",
                color: "#bbb",
                value: "12",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "12",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Policy ABE",
            color: "#bbb",
            value: "107",
            children: [
              {
                name: "Entity Catalog ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Policy Application ABE",
                color: "#bbb",
                value: "24",
                children: [
                  {
                    name: "Policy Server ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  },
                  {
                    name: "PolicyApp Role ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  },
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Policy Framework ABE",
                color: "#bbb",
                value: "12",
                children: [
                  {
                    name: "Policy ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  },
                  {
                    name: "PolicyApp Role ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Policy Framework Spec ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Policy Statement ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Policy Management ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Policy Statement ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Policy Structure ABE",
                color: "#bbb",
                value: "57",
                children: [
                  {
                    name: "Policy ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Action ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Condition ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Event ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Statement ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Value ABE",
                    color: "#bbb",
                    value: "11",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "11",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "11" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Variable ABE",
                    color: "#bbb",
                    value: "21",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "21",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "21" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Project ABE",
            color: "#bbb",
            value: "138",
            children: [
              {
                name: "Activity ABE",
                color: "#bbb",
                value: "18",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "18",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "18",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "18" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Additional Relationships ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "EntitiesToBeFixedInPh4",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "OpenGisSFS ABE",
                color: "#bbb",
                value: "25",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "25",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "25",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "25" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Project ABE",
                color: "#bbb",
                value: "14",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "14",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "14",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "14" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Project Calendar ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Project Element ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Project Resource ABE",
                color: "#bbb",
                value: "19",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "19",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "19",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "19" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Project Role ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Project Scope ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "SCRUM Blade ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Work Breakdown Structure ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Work Order ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Root Business Entities ABE",
            color: "#bbb",
            value: "67",
            children: [
              {
                name: "Association ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Characteristic ABE",
                color: "#bbb",
                value: "17",
                children: [
                  {
                    name: "Characteristic Pricing ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "Policy Statement ABE",
                    color: "#bbb",
                    value: "14",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "14",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "14" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Entity Identification ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Policy Statement ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Entity Specification Action ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Entity Specification Attachment ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Characteristic Pricing ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  },
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "External System Capability ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Policy Framework Spec ABE",
                color: "#bbb",
                value: "15",
                children: [
                  {
                    name: "Policy Statement ABE",
                    color: "#bbb",
                    value: "15",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "15",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "15" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Root Entity Group ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Entity Specification Attachment Example Instances ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "TIP Common ABE",
            color: "#bbb",
            value: "10",
            children: [
              {
                name: "Configuration Instance Diagrams and Instances",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Configuration Instance Diagrams ",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Framework ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Configuration Instance Diagrams ",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Management Job ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Test ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Topology ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Trouble Ticket ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Usage Spec ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Trouble or Problem ABE",
            color: "#bbb",
            value: "4",
            children: [
              {
                name: "Entity Catalog ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "TIP Internal Model - Illustrative only",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Usage ABE",
            color: "#bbb",
            value: "36",
            children: [
              {
                name: "IP Detail Record ABE",
                color: "#bbb",
                value: "18",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "18",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "18",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "18" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Schedule Definition ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Usage Example Instances ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Usage Spec ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Geographic Address ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Users and Roles ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Performance Monitoring ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Performance Collection ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
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
        name: "Customer Domain",
        color: "#bbb",
        value: "85",
        children: [
          {
            name: "Applied Customer Billing Rate ABE",
            color: "#bbb",
            value: "19",
            children: [
              {
                name: "Applied Customer Billing Rate Spec ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "17",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "17",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "17",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "17" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Bill ABE",
            color: "#bbb",
            value: "29",
            children: [
              {
                name: "Applied Customer Billing Rate Spec ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Customer Account Balance ABE",
                color: "#bbb",
                value: "14",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  },
                  {
                    name: "Customer Billing Credit ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  },
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Customer Billing Statistic ABE",
                color: "#bbb",
                value: "13",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "13",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "13",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "13" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Bill Collection ABE",
            color: "#bbb",
            value: "13",
            children: [
              {
                name: "Customer Account Balance ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Customer Payment ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Dunning ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Bill Inquiry ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "Dunning ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Interaction ABE",
            color: "#bbb",
            value: "5",
            children: [
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Order ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Problem ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Dunning ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Customer Account Balance Type ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Service Level Agreement ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Customer Statistic ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Workforce ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
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
        name: "Engaged Party Domain",
        color: "#e20074",
        value: "291",
        children: [
          {
            name: "Additional Party Entities ABE",
            color: "#bbb",
            value: "9",
            children: [
              {
                name: "Example Party Order Entities ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Agreement ABE",
            color: "#bbb",
            value: "14",
            children: [
              {
                name: "Commitment ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Event ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Metric Monitoring ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party ABE",
            color: "#e20074",
            value: "100",
            children: [
              {
                name: "Commitment ABE",
                color: "#bbb",
                value: "16",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "16",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "16",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "16" }]
                      }
                    ]
                  }
                ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Currency ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Identification ABE",
                color: "#bbb",
                value: "12",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "12",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Community ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Demographic ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Organization ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Profile ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  }
                ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "18" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Role Group ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Skill ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              }
            ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Order ABE",
            color: "#bbb",
            value: "8",
            children: [
              {
                name: "Example Party Order Entities ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Role Group ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Privacy ABE",
            color: "#bbb",
            value: "11",
            children: [
              {
                name: "Party Privacy Profile ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Privacy Profile Type ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Role Product Specification ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Problem ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Party Revenue Sharing ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Party Revenue Sharing Model ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              }
            ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Role Product Offering ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Example Party Role Product Offering Entities ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "Party Revenue Sharing Model ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Role Product Specification ABE",
                color: "#e20074",
                value: "8",
                children: [
                  {
                    name: "Example Party Role Product Offering Entities ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Revenue ABE",
            color: "#e20074",
            value: "114",
            children: [
              {
                name: "Applied Party Billing Rate ABE",
                color: "#bbb",
                value: "16",
                children: [
                  {
                    name: "Party Billing Statistic ABE",
                    color: "#bbb",
                    value: "16",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "16",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "16" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Example Party Order Entities ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Bill ABE",
                color: "#bbb",
                value: "30",
                children: [
                  {
                    name: "Dunning ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  },
                  {
                    name: "Party Billing Credit ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "7" }]
                      }
                    ]
                  },
                  {
                    name: "Party Billing Statistic ABE",
                    color: "#bbb",
                    value: "13",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "13",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "13" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Bill Collection ABE",
                color: "#bbb",
                value: "31",
                children: [
                  {
                    name: "Dunning ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "9" }]
                      }
                    ]
                  },
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  },
                  {
                    name: "Party Payment ABE",
                    color: "#bbb",
                    value: "21",
                    children: [
                      {
                        name: "Bank ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      },
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "12",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }]
                      },
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Revenue Sharing ABE",
                color: "#e20074",
                value: "28",
                children: [
                  {
                    name: "Party Billing Statistic ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "12" }]
                      }
                    ]
                  },
                  {
                    name: "Party Revenue Share Reconciliation ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
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
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "4" }]
                      }
                    ]
                  },
                  {
                    name: "Party Revenue Sharing Model ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Party Settlement ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Party Billing Statistic ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Service Level Agreement ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "Example Party Order Entities ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Statistic ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "Example Party Order Entities ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Metric Job ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Party Strategy ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Party Privacy Profile Type ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Example Party Role Product Spec Entities ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Payment Method ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
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
        name: "Enterprise Domain",
        color: "#bbb",
        value: "158",
        children: [
          {
            name: "Enterprise Effectiveness ABE",
            color: "#bbb",
            value: "10",
            children: [
              {
                name: "Business Objective ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Process ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Process Definition ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Revenue Assurance ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Enterprise Risk ABE",
            color: "#bbb",
            value: "119",
            children: [
              {
                name: "Enterprise Security ABE",
                color: "#bbb",
                value: "89",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  },
                  {
                    name: "Security Entity ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  },
                  {
                    name: "Security Event ABE",
                    color: "#bbb",
                    value: "15",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "15",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "15" }]
                      }
                    ]
                  },
                  {
                    name: "Security Incident ABE",
                    color: "#bbb",
                    value: "11",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "11",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "11" }]
                      }
                    ]
                  },
                  {
                    name: "Security Threat ABE",
                    color: "#bbb",
                    value: "28",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      },
                      {
                        name: "Security Threat Technique ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Placeholder Classes", value: "10" }]
                      },
                      {
                        name: "Security Threat Tool ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Placeholder Classes", value: "10" }]
                      }
                    ]
                  },
                  {
                    name: "Security Vulnerability ABE",
                    color: "#bbb",
                    value: "28",
                    children: [
                      {
                        name: "Security Threat Tool ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }]
                      },
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      },
                      {
                        name: "Security Vulnerability Scoring Definition ABE",
                        color: "#bbb",
                        value: "13",
                        children: [
                          { name: "Placeholder Classes", value: "7" },
                          { name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Media ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Revenue Assurance ABE",
                color: "#bbb",
                value: "29",
                children: [
                  {
                    name: "RA Action_Response ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "5" }]
                      }
                    ]
                  },
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
                      }
                    ]
                  },
                  {
                    name: "RA Control ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  },
                  {
                    name: "RA Key Performance Indicator ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "RA Trouble Ticket ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "RA Violation ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "Security Entity ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Marketing Campaign ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Media ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Workforce ABE",
            color: "#bbb",
            value: "28",
            children: [
              {
                name: "Business Objective ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "1" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "WorkSpecification ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "8" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Workforce Resource ABE",
                color: "#bbb",
                value: "13",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "10",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "10" }]
                      }
                    ]
                  },
                  {
                    name: "Work ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Workforce Schedule ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "RA Assessment ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "Security Vulnerability Score ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Security Vulnerability Scoring Algorithm ABE", value: "6" }]
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
        name: "Market_Sales Domain",
        color: "#bbb",
        value: "49",
        children: [
          {
            name: "Competitor ABE",
            color: "#bbb",
            value: "22",
            children: [
              {
                name: "Competitor Intelligence ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Competitor Product Correlation ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Placeholder Classes", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Market Statistic ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Contact Lead Prospect ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Competitor Product Correlation ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Market Segment ABE",
            color: "#bbb",
            value: "12",
            children: [
              {
                name: "Market Statistic ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Action ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Market Strategy Plan ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "Market Statistic ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Marketing Campaign ABE",
            color: "#bbb",
            value: "8",
            children: [
              {
                name: "Competitor Product Correlation ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Placeholder Classes", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Media ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Performance ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Product Action ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Sales Channel ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "Market Statistic ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Sales Statistics ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Competitor Product Correlation ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
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
        name: "Product Domain",
        color: "#bbb",
        value: "131",
        children: [
          {
            name: "Loyalty ABE",
            color: "#bbb",
            value: "15",
            children: [
              {
                name: "Loyalty Program ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Loyalty Program Specification ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "6",
                        children: [{ name: "Placeholder Classes", value: "6" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Usage Spec ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product ABE",
            color: "#bbb",
            value: "16",
            children: [
              {
                name: "Pricing Logic Algorithm ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Price ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Configuration ABE",
            color: "#bbb",
            value: "7",
            children: [
              {
                name: "Loyalty Program ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Action ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Offering ABE",
            color: "#bbb",
            value: "52",
            children: [
              {
                name: "Example Product Specification Entities ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Pricing Logic Algorithm ABE",
                color: "#bbb",
                value: "15",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  },
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Catalog ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Offering Price ABE",
                color: "#bbb",
                value: "15",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "15",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "15",
                        children: [{ name: "Placeholder Classes", value: "15" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Offering Price Rule ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Placeholder Classes", value: "5" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Placement ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Promotion ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Performance ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Product Action ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Specification ABE",
            color: "#bbb",
            value: "26",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "17",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "17",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "17",
                        children: [{ name: "Placeholder Classes", value: "17" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Example Product Specification Entities ABE",
                color: "#bbb",
                value: "9",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "9",
                        children: [{ name: "Placeholder Classes", value: "9" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Test ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Product Action ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Product Usage ABE",
            color: "#bbb",
            value: "8",
            children: [
              {
                name: "Product Price ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Product Usage Spec ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Strategy & Plan ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Strategic Product Portfolio Plan ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "Product Price ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "PLA Spec ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
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
        name: "Resource Domain",
        color: "bbb",
        value: "438",
        children: [
          {
            name: "Resource ABE",
            color: "#bbb",
            value: "354",
            children: [
              {
                name: "CompoundResource ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "PhysicalRole System View ABE",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "CompoundResource Specification ABE",
                color: "#bbb",
                value: "8",
                children: [
                  {
                    name: "Physical Role Specification ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      { name: "Software Resource Specification ABE", value: "8", children: [{ name: "", value: "8" }] }
                    ]
                  }
                ]
              },
              {
                name: "LogicalResource ABE",
                color: "#bbb",
                value: "245",
                children: [
                  {
                    name: "Address ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      { name: "Device Interface Association ABE", value: "7", children: [{ name: "", value: "7" }] }
                    ]
                  },
                  {
                    name: "Computing and Software ABE",
                    color: "#bbb",
                    value: "12",
                    children: [
                      { name: "Software Resource Specification ABE", value: "1", children: [{ name: "", value: "1" }] },
                      { name: "Software Resource and Software ABE", value: "11", children: [{ name: "", value: "11" }] }
                    ]
                  },
                  {
                    name: "Converged Network ABE",
                    color: "#bbb",
                    value: "30",
                    children: [
                      { name: "Class Diagrams", value: "1", children: [{ name: "", value: "1" }] },
                      {
                        name: "Informal Classes",
                        color: "#bbb",
                        value: "12",
                        children: [
                          { name: "", value: "1" },
                          { name: "Example Classes", value: "8" },
                          { name: "Placeholder Classes", value: "3" }
                        ]
                      },
                      { name: "Network Resource Fulfillment ABE", value: "17", children: [{ name: "", value: "17" }] }
                    ]
                  },
                  {
                    name: "Device Interface ABE",
                    color: "#bbb",
                    value: "24",
                    children: [
                      { name: "Device Interface Association ABE", value: "11", children: [{ name: "", value: "11" }] },
                      { name: "Switching Protocols ABE", value: "13", children: [{ name: "", value: "13" }] }
                    ]
                  },
                  {
                    name: "Device Protocol Association ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      { name: "Device Interface Association ABE", value: "9", children: [{ name: "", value: "9" }] }
                    ]
                  },
                  {
                    name: "Logical Device ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      { name: "Device Interface Association ABE", value: "4", children: [{ name: "", value: "4" }] }
                    ]
                  },
                  {
                    name: "Logical Role ABE",
                    color: "#bbb",
                    value: "16",
                    children: [
                      { name: "Service Statistical Info ABE", value: "16", children: [{ name: "", value: "16" }] }
                    ]
                  },
                  {
                    name: "LogicalResource Examples ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      { name: "Informal Classes", value: "2", children: [{ name: "Placeholder Classes", value: "2" }] }
                    ]
                  },
                  {
                    name: "Managed Transmission ABE",
                    color: "#bbb",
                    value: "9",
                    children: [
                      { name: "Software Resource and Software ABE", value: "5", children: [{ name: "", value: "5" }] },
                      { name: "Termination Point ABE", value: "4", children: [{ name: "", value: "4" }] }
                    ]
                  },
                  {
                    name: "Management Information ABE",
                    color: "#bbb",
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
                      { name: "Service Statistical Info ABE", value: "2", children: [{ name: "", value: "2" }] }
                    ]
                  },
                  {
                    name: "Network ABE",
                    color: "#bbb",
                    value: "11",
                    children: [{ name: "Termination Point ABE", value: "11", children: [{ name: "", value: "11" }] }]
                  },
                  {
                    name: "Physical Role Specification ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      { name: "Software Resource Specification ABE", value: "7", children: [{ name: "", value: "7" }] }
                    ]
                  },
                  {
                    name: "Protection ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Network Resource Fulfillment ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  },
                  {
                    name: "Protocol Service ABE",
                    color: "#bbb",
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
                      { name: "WAN Protocols ABE", value: "10", children: [{ name: "", value: "10" }] }
                    ]
                  },
                  {
                    name: "Resource Number ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Informal Classes", value: "3", children: [{ name: "Placeholder Classes", value: "3" }] }
                    ]
                  },
                  {
                    name: "Statistics ABE",
                    color: "#bbb",
                    value: "2",
                    children: [{ name: "Switching Protocols ABE", value: "2", children: [{ name: "", value: "2" }] }]
                  },
                  {
                    name: "TIP Logical Resource ABE",
                    color: "#bbb",
                    value: "18",
                    children: [
                      { name: "Network Resource Fulfillment ABE", value: "17", children: [{ name: "", value: "17" }] },
                      { name: "Service Statistical Info ABE", value: "1", children: [{ name: "", value: "1" }] }
                    ]
                  }
                ]
              },
              {
                name: "PhysicalResource ABE",
                color: "#bbb",
                value: "69",
                children: [
                  {
                    name: "Auxiliary Component ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      { name: "Informal Classes", value: "5", children: [{ name: "Placeholder Classes", value: "5" }] }
                    ]
                  },
                  {
                    name: "Equipment ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  },
                  {
                    name: "Equipment Holder ABE",
                    color: "#bbb",
                    value: "14",
                    children: [
                      { name: "HolderAtomic ABE", value: "4", children: [{ name: "Placeholder Classes", value: "4" }] },
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      },
                      { name: "Informal Classes", value: "2", children: [{ name: "Placeholder Classes", value: "2" }] }
                    ]
                  },
                  {
                    name: "Hardware ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "7",
                        children: [{ name: "Placeholder Classes", value: "7" }]
                      }
                    ]
                  },
                  {
                    name: "LogicalResource Examples ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      { name: "Informal Classes", value: "6", children: [{ name: "Placeholder Classes", value: "6" }] }
                    ]
                  },
                  {
                    name: "Physical Capacity ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "5",
                        children: [{ name: "Placeholder Classes", value: "5" }]
                      }
                    ]
                  },
                  {
                    name: "Physical Component ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      { name: "Informal Classes", value: "7", children: [{ name: "Placeholder Classes", value: "7" }] }
                    ]
                  },
                  {
                    name: "Physical Device ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "4",
                        children: [{ name: "Placeholder Classes", value: "4" }]
                      }
                    ]
                  },
                  {
                    name: "Physical Role ABE",
                    color: "#bbb",
                    value: "13",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "13",
                        children: [{ name: "Placeholder Classes", value: "13" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Resource Order ABE",
                color: "#bbb",
                value: "14",
                children: [
                  {
                    name: "PhysicalRole System View ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "Resource Number Portability ABE",
                    color: "#bbb",
                    value: "8",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "8",
                        children: [{ name: "Placeholder Classes", value: "8" }]
                      }
                    ]
                  },
                  {
                    name: "Resource Number Portability Role ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "ResourceRole System View ABE",
                color: "#bbb",
                value: "7",
                children: [
                  {
                    name: "LogicalRole System View ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  },
                  {
                    name: "Physical Role ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  },
                  {
                    name: "PhysicalRole System View ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "TIP Resource ABE",
                color: "#bbb",
                value: "4",
                children: [
                  {
                    name: "Network Resource Assurance ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  },
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  },
                  {
                    name: "Resource Number Portability Role ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Configuration ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Performance ABE",
            color: "#bbb",
            value: "4",
            children: [
              {
                name: "Resource Performance Specification ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "TIP Resource ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Specification ABE",
            color: "#bbb",
            value: "62",
            children: [
              {
                name: "CompoundResource Specification ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Physical Role Specification ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Software Resource Specification ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  }
                ]
              },
              {
                name: "LogicalResource Specification ABE",
                color: "#bbb",
                value: "30",
                children: [
                  {
                    name: "Logical Role Specification ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      { name: "Software Resource Specification ABE", value: "2", children: [{ name: "", value: "2" }] }
                    ]
                  },
                  {
                    name: "LogicalResource Spec Examples ABE",
                    color: "#bbb",
                    value: "7",
                    children: [
                      { name: "Software Resource Specification ABE", value: "7", children: [{ name: "", value: "7" }] }
                    ]
                  },
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] }
                    ]
                  },
                  {
                    name: "Software Resource and Software Specifications ABE",
                    color: "bbb",
                    value: "16",
                    children: [
                      {
                        name: "Service Bundle Examples ABE",
                        color: "bbb",
                        value: "1",
                        children: [{ name: "", value: "1" }]
                      },
                      {
                        name: "Software Resource Specification ABE",
                        color: "bbb",
                        value: "8",
                        children: [{ name: "", value: "8" }]
                      },
                      {
                        name: "Software Specification ABE",
                        color: "bbb",
                        value: "7",
                        children: [{ name: "", value: "7" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "PhysicalResource Specification ABE",
                color: "#bbb",
                value: "10",
                children: [
                  {
                    name: "LogicalResource Spec Examples ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      { name: "Software Resource Specification ABE", value: "6", children: [{ name: "", value: "6" }] }
                    ]
                  },
                  {
                    name: "Physical Role Specification ABE",
                    color: "#bbb",
                    value: "4",
                    children: [
                      { name: "Software Resource Specification ABE", value: "4", children: [{ name: "", value: "4" }] }
                    ]
                  }
                ]
              },
              {
                name: "Resource Catalog ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] }
                    ]
                  }
                ]
              },
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "14",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "14",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "14", children: [{ name: "", value: "14" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Strategy & Plan ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Test ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Topology ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Trouble ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Alarm ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "3",
                        children: [{ name: "Placeholder Classes", value: "3" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Alarm Severity Assignment Profile ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "2",
                        children: [{ name: "Placeholder Classes", value: "2" }]
                      }
                    ]
                  }
                ]
              },
              {
                name: "Resource Performance Specification ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Network Resource Basic ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      {
                        name: "HolderComposite ABE",
                        color: "#bbb",
                        value: "1",
                        children: [{ name: "Placeholder Classes", value: "1" }]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Resource Usage ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "CompoundResource Specification ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Physical Role Specification ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Software Resource Specification ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Strategy & Plan ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "1", children: [{ name: "", value: "1" }] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Service Domain",
        color: "#bbb",
        value: "129",
        children: [
          {
            name: "",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "",
                color: "#bbb",
                value: "1",
                children: [
                  { name: "", value: "1", children: [{ name: "", value: "1", children: [{ name: "", value: "1" }] }] }
                ]
              }
            ]
          },
          {
            name: "Service ABE",
            color: "#bbb",
            value: "39",
            children: [
              {
                name: "",
                color: "#bbb",
                value: "11",
                children: [
                  {
                    name: "",
                    color: "#bbb",
                    value: "11",
                    children: [{ name: "", value: "11", children: [{ name: "", value: "11" }] }]
                  }
                ]
              },
              {
                name: "Customer Facing Service ABE",
                color: "#bbb",
                value: "9",
                children: [
                  { name: "", value: "5", children: [{ name: "", value: "5", children: [{ name: "", value: "5" }] }] },
                  {
                    name: "Customer Facing Service Example ABE",
                    color: "#bbb",
                    value: "2",
                    children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }]
                  },
                  {
                    name: "CustomerFacing Service Role ABE",
                    color: "#bbb",
                    value: "2",
                    children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }]
                  }
                ]
              },
              {
                name: "Resource Facing Service ABE",
                color: "#bbb",
                value: "16",
                children: [
                  {
                    name: "Customer Facing Service Example ABE",
                    color: "#bbb",
                    value: "6",
                    children: [{ name: "", value: "6", children: [{ name: "", value: "6" }] }]
                  },
                  {
                    name: "Resource Facing Service Examples ABE",
                    color: "#bbb",
                    value: "6",
                    children: [{ name: "", value: "6", children: [{ name: "", value: "6" }] }]
                  },
                  {
                    name: "Resource Facing Service Role ABE",
                    color: "#bbb",
                    value: "4",
                    children: [{ name: "", value: "4", children: [{ name: "", value: "4" }] }]
                  }
                ]
              },
              {
                name: "Service Order ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Resource Facing Service Examples ABE",
                    color: "#bbb",
                    value: "3",
                    children: [{ name: "", value: "3", children: [{ name: "", value: "3" }] }]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Configuration ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Performance ABE",
            color: "#bbb",
            value: "15",
            children: [
              {
                name: "Service Catalog ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "2", children: [{ name: "", value: "2" }] }
                    ]
                  }
                ]
              },
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "11",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "11",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "11", children: [{ name: "", value: "11" }] }
                    ]
                  }
                ]
              },
              {
                name: "Service Performance Specification ABE",
                color: "#bbb",
                value: "2",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "2", children: [{ name: "", value: "2" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Problem ABE",
            color: "#bbb",
            value: "2",
            children: [
              {
                name: "",
                color: "#bbb",
                value: "2",
                children: [
                  { name: "", value: "2", children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }] }
                ]
              }
            ]
          },
          {
            name: "Service Specification ABE",
            color: "#bbb",
            value: "56",
            children: [
              {
                name: "Customer Facing Service Spec ABE",
                color: "#bbb",
                value: "21",
                children: [
                  {
                    name: "Customer Facing Service Spec Examples ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Service Package Spec Examples ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  },
                  {
                    name: "Customer Facing Service Spec Role ABE",
                    color: "#bbb",
                    value: "2",
                    children: [{ name: "", value: "2", children: [{ name: "", value: "2" }] }]
                  },
                  {
                    name: "Resource Facing Service Examples ABE",
                    color: "#bbb",
                    value: "6",
                    children: [{ name: "", value: "6", children: [{ name: "", value: "6" }] }]
                  },
                  {
                    name: "Service Package ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      { name: "", value: "4", children: [{ name: "", value: "4" }] },
                      { name: "Service Package Spec Examples ABE", value: "6", children: [{ name: "", value: "6" }] }
                    ]
                  }
                ]
              },
              {
                name: "Resource Facing Service Spec ABE",
                color: "#bbb",
                value: "18",
                children: [
                  {
                    name: "Customer Facing Service Spec Examples ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      { name: "Service Package Spec Examples ABE", value: "6", children: [{ name: "", value: "6" }] }
                    ]
                  },
                  {
                    name: "Resource Facing Service Spec Role ABE",
                    color: "#bbb",
                    value: "2",
                    children: [
                      { name: "Service Package Spec Examples ABE", value: "2", children: [{ name: "", value: "2" }] }
                    ]
                  },
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "10",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] },
                      { name: "Service Package Spec Examples ABE", value: "5", children: [{ name: "", value: "5" }] }
                    ]
                  }
                ]
              },
              {
                name: "Service Catalog ABE",
                color: "#bbb",
                value: "5",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "5",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "5", children: [{ name: "", value: "5" }] }
                    ]
                  }
                ]
              },
              {
                name: "Service Order ABE",
                color: "#bbb",
                value: "12",
                children: [
                  {
                    name: "Resource Facing Service Examples ABE",
                    color: "#bbb",
                    value: "12",
                    children: [{ name: "", value: "12", children: [{ name: "", value: "12" }] }]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Strategy & Plan ABE",
            color: "#bbb",
            value: "1",
            children: [
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "1",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "1",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "1", children: [{ name: "", value: "1" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Test ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Service Usage ABE",
            color: "#bbb",
            value: "3",
            children: [
              {
                name: "Service Catalog ABE",
                color: "#bbb",
                value: "3",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "3",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "3", children: [{ name: "", value: "3" }] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "TIP Service Management ABE",
            color: "#bbb",
            value: "6",
            children: [
              {
                name: "Service Level Spec ABE",
                color: "#bbb",
                value: "6",
                children: [
                  {
                    name: "Service Bundle ABE",
                    color: "#bbb",
                    value: "6",
                    children: [
                      { name: "Service Bundle Examples ABE", value: "6", children: [{ name: "", value: "6" }] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  test("Renders the chart", () => {
    viz.data(data)
    viz.config({
      suppressAnimation: true,
      width: 1000,
      height: 1000,
      outerBorderMargin: 5
    })
    viz.draw()
  })
}

export const title = "Simple rendering / large dataset"
