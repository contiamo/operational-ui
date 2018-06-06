import * as React from "react"
import { render } from "react-dom"
import { OperationalUI } from "@operational/components"

const containerNode = document.getElementById("app")

import Sunburst from "../../src/Sunburst/facade"
import { VisualizationWrapper } from "../../src/index"

const config: any = {
  maxRings: 4,
  propagateColors: true,
  width: 800,
  breadcrumbItemWidth: 250,
  maxBreadcrumbLength: 3,
}

import { RawData } from "../../src/Sunburst/typings"

/**
 * This variable is assigned here and then re-assigned in the
 * setTimeout block later in this file.
 *
 * There are a couple of things wrong with this:
 * - Reassigning variables is generally dangerous and so we prefer to work with constants
 * - Assigning variables on the GLOBAL scope, like this, is also dangerous because of naming collisions
 *
 * As a general rule, let's use consts everywhere and avoid
 * re-assignments.
 *
 * This has been a delightful essay.
 *
 * God bless you all.
 */
let data: RawData = {
  sunburst_data: {
    name: "Pageviews",
    data: {
      name: "All",
      value: "1308649",
      children: [
        { name: "2 real quality mslis geschenkt", value: "1782", level: "0", id: ";25769803778;", color: "#ffd94d" },
        { name: "coming soon", value: "2172", level: "0", id: ";94489280514;", color: "#ffd94d" },
        {
          name: "deal-2 real quality mueslis geschenkt",
          value: "17321",
          level: "0",
          id: ";8589934593;",
          color: "#ffd94d",
        },
        {
          name: "deal-2 real quality mueslis geschenkt-activated",
          value: "7956",
          level: "0",
          id: ";34359738368;",
          color: "#ffd94d",
        },
        { name: "deal-coming soon", value: "7353", level: "0", id: ";120259084288;", color: "#ffd94d" },
        { name: "deal-fcb mobil prepaid karte", value: "506", level: "0", id: ";111669149697;", color: "#ffd94d" },
        { name: "deal-grillido deal", value: "1138", level: "0", id: ";34359738369;", color: "#ffd94d" },
        { name: "deal-grillido deal-activated", value: "1820", level: "0", id: ";60129542145;", color: "#ffd94d" },
        { name: "deal-happybrush zahnpasta geschenkt", value: "7167", level: "0", id: ";2;", color: "#ffd94d" },
        {
          name: "deal-happybrush zahnpasta geschenkt-activated",
          value: "3936",
          level: "0",
          id: ";51539607553;",
          color: "#ffd94d",
        },
        {
          name: "deal-happybrush zahnpflege-jahreskit gewinnen",
          value: "3944",
          level: "0",
          id: ";111669149696;",
          color: "#ffd94d",
        },
        { name: "grillido deal", value: "6172", level: "0", id: ";60129542144;", color: "#ffd94d" },
        { name: "grillido gw", value: "1272", level: "0", id: ";94489280512;", color: "#ffd94d" },
        { name: "happybrush zahnpasta geschenkt", value: "4006", level: "0", id: ";17179869184;", color: "#ffd94d" },
        {
          name: "happybrush zahnpflege jahreskit gewinnen",
          value: "629",
          level: "0",
          id: ";77309411329;",
          color: "#ffd94d",
        },
        {
          name: "home",
          value: "1063043",
          level: "0",
          id: ";0;42949672961;",
          children: [
            { name: "%s", value: "559", level: "1", id: ";0;42949672961;", color: "#f2994d" },
            {
              name: "2 real quality mslis geschenkt",
              value: "74130",
              level: "1",
              id: ";0;25769803778;85899345921;",
              children: [
                { name: "redeem-bar", value: "16526", level: "2", id: ";0;25769803778;85899345921;", color: "#66e6ff" },
                { name: "complementary", value: "57604", id: ";0;25769803778;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "2 real quality mslis geschenkt verlngert",
              value: "17302",
              level: "1",
              id: ";0;103079215104;85899345921;",
              children: [
                { name: "redeem-bar", value: "2955", level: "2", id: ";0;103079215104;85899345921;", color: "#66e6ff" },
                { name: "complementary", value: "14347", id: ";0;103079215104;", empty: true },
              ],
              color: "#f2994d",
            },
            { name: "30 auf alle pflanzen", value: "2038", level: "1", id: ";0;257698037760;", color: "#f2994d" },
            { name: "30 bei evrgreen", value: "906", level: "1", id: ";0;163208757249;", color: "#f2994d" },
            {
              name: "activation-error",
              value: "96912",
              level: "1",
              id: ";0;42949672960;60129542144;",
              children: [
                {
                  name: "grillido deal",
                  value: "4951",
                  level: "2",
                  id: ";0;42949672960;60129542144;",
                  color: "#66e6ff",
                },
                {
                  name: "happybrush zahnpasta geschenkt",
                  value: "77702",
                  level: "2",
                  id: ";0;42949672960;17179869184;",
                  color: "#66e6ff",
                },
                { name: "complementary", value: "14259", id: ";0;42949672960;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "apple music 6 monate kostenlos erleben",
              value: "666",
              level: "1",
              id: ";0;146028888065;",
              color: "#f2994d",
            },
            {
              name: "batman v superman dawn of justice geschenkt",
              value: "16125",
              level: "1",
              id: ";0;103079215105;",
              color: "#f2994d",
            },
            { name: "coming soon", value: "23326", level: "1", id: ";0;94489280514;", color: "#f2994d" },
            {
              name: "deal- batman v superman: dawn of justice geschenkt!",
              value: "7591",
              level: "1",
              id: ";0;68719476736;",
              color: "#f2994d",
            },
            {
              name: "deal-2 real quality mueslis geschenkt",
              value: "29026",
              level: "1",
              id: ";0;8589934593;42949672961;34359738368;",
              children: [
                {
                  name: "%s",
                  value: "2810",
                  level: "2",
                  id: ";0;8589934593;42949672961;34359738368;",
                  children: [
                    {
                      name: "deal-2 real quality mueslis geschenkt-activated",
                      value: "1287",
                      level: "3",
                      id: ";0;8589934593;42949672961;34359738368;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "1523", id: ";0;8589934593;42949672961;", empty: true },
                  ],
                  color: "#66e6ff",
                },
                {
                  name: "deal-2 real quality mueslis geschenkt-activated",
                  value: "661",
                  level: "2",
                  id: ";0;8589934593;34359738368;",
                  color: "#66e6ff",
                },
                { name: "complementary", value: "25555", id: ";0;8589934593;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "deal-2 real quality mueslis geschenkt verlaengert",
              value: "6297",
              level: "1",
              id: ";0;77309411328;42949672961;",
              children: [
                { name: "%s", value: "590", level: "2", id: ";0;77309411328;42949672961;", color: "#66e6ff" },
                { name: "complementary", value: "5707", id: ";0;77309411328;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "deal-2 real quality mueslis geschenkt verlaengert-activated",
              value: "513",
              level: "1",
              id: ";0;128849018882;",
              color: "#f2994d",
            },
            {
              name: "deal-2 real quality mueslis geschenkt-activated",
              value: "14157",
              level: "1",
              id: ";0;34359738368;42949672961;",
              children: [
                { name: "%s", value: "587", level: "2", id: ";0;34359738368;42949672961;", color: "#66e6ff" },
                { name: "complementary", value: "13570", id: ";0;34359738368;", empty: true },
              ],
              color: "#f2994d",
            },
            { name: "deal-30% auf alle pflanzen", value: "513", level: "1", id: ";0;163208757248;", color: "#f2994d" },
            { name: "deal-coming soon", value: "8310", level: "1", id: ";0;120259084288;", color: "#f2994d" },
            {
              name: "deal-fcb mobil prepaid karte",
              value: "1011",
              level: "1",
              id: ";0;111669149697;",
              color: "#f2994d",
            },
            {
              name: "deal-grillido deal",
              value: "16739",
              level: "1",
              id: ";0;34359738369;42949672961;60129542145;",
              children: [
                {
                  name: "%s",
                  value: "3969",
                  level: "2",
                  id: ";0;34359738369;42949672961;60129542145;",
                  children: [
                    {
                      name: "deal-grillido deal-activated",
                      value: "1570",
                      level: "3",
                      id: ";0;34359738369;42949672961;60129542145;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "2399", id: ";0;34359738369;42949672961;", empty: true },
                  ],
                  color: "#66e6ff",
                },
                { name: "complementary", value: "12770", id: ";0;34359738369;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "deal-grillido deal-activated",
              value: "3405",
              level: "1",
              id: ";0;60129542145;42949672961;",
              children: [
                { name: "%s", value: "1694", level: "2", id: ";0;60129542145;42949672961;", color: "#66e6ff" },
                { name: "complementary", value: "1711", id: ";0;60129542145;", empty: true },
              ],
              color: "#f2994d",
            },
            { name: "deal-grillido gw", value: "1699", level: "1", id: ";0;197568495616;", color: "#f2994d" },
            {
              name: "deal-happybrush zahnpasta geschenkt",
              value: "48992",
              level: "1",
              id: ";0;2;42949672961;51539607553;",
              children: [
                {
                  name: "%s",
                  value: "4116",
                  level: "2",
                  id: ";0;2;42949672961;51539607553;",
                  children: [
                    {
                      name: "deal-happybrush zahnpasta geschenkt-activated",
                      value: "1089",
                      level: "3",
                      id: ";0;2;42949672961;51539607553;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "3027", id: ";0;2;42949672961;", empty: true },
                  ],
                  color: "#66e6ff",
                },
                {
                  name: "deal-happybrush zahnpflege-jahreskit gewinnen",
                  value: "2083",
                  level: "2",
                  id: ";0;2;111669149696;",
                  color: "#66e6ff",
                },
                { name: "error", value: "3967", level: "2", id: ";0;2;154618822657;", color: "#66e6ff" },
                { name: "complementary", value: "38826", id: ";0;2;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "deal-happybrush zahnpasta geschenkt-activated",
              value: "5493",
              level: "1",
              id: ";0;51539607553;42949672961;",
              children: [
                { name: "%s", value: "2770", level: "2", id: ";0;51539607553;42949672961;", color: "#66e6ff" },
                { name: "complementary", value: "2723", id: ";0;51539607553;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "deal-happybrush zahnpflege-jahreskit gewinnen",
              value: "8659",
              level: "1",
              id: ";0;111669149696;",
              color: "#f2994d",
            },
            {
              name: "deal-lottery-2 vip tickets fc bayern vs- eintracht frankfurt gewinnen",
              value: "4120",
              level: "1",
              id: ";0;154618822656;",
              color: "#f2994d",
            },
            { name: "deal-lottery-teufel gw", value: "18146", level: "1", id: ";0;68719476737;", color: "#f2994d" },
            {
              name: "deal-lottery-vip-reise nach los angeles gewinnen!",
              value: "1439",
              level: "1",
              id: ";0;188978561024;",
              color: "#f2994d",
            },
            { name: "fcb mobil prepaid karte", value: "7993", level: "1", id: ";0;120259084289;", color: "#f2994d" },
            { name: "grillido deal", value: "36202", level: "1", id: ";0;60129542144;", color: "#f2994d" },
            { name: "grillido gw", value: "25330", level: "1", id: ";0;94489280512;", color: "#f2994d" },
            {
              name: "happybrush zahnpasta geschenkt",
              value: "36655",
              level: "1",
              id: ";0;17179869184;",
              color: "#f2994d",
            },
            {
              name: "happybrush zahnpflege jahreskit gewinnen",
              value: "34436",
              level: "1",
              id: ";0;77309411329;",
              color: "#f2994d",
            },
            { name: "home.error", value: "12445", level: "1", id: ";0;1;", color: "#f2994d" },
            { name: "imprint", value: "2562", level: "1", id: ";0;180388626433;", color: "#f2994d" },
            {
              name: "login.kek",
              value: "2816",
              level: "1",
              id: ";0;60129542146;17179869184;",
              children: [
                {
                  name: "happybrush zahnpasta geschenkt",
                  value: "538",
                  level: "2",
                  id: ";0;60129542146;17179869184;",
                  color: "#66e6ff",
                },
                { name: "complementary", value: "2278", id: ";0;60129542146;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "login.telekom-username",
              value: "5301",
              level: "1",
              id: ";0;25769803776;25769803777;42949672960;17179869184;",
              children: [
                {
                  name: "login.telekom-password",
                  value: "5301",
                  level: "2",
                  id: ";0;25769803776;25769803777;42949672960;17179869184;",
                  children: [
                    {
                      name: "activation-error",
                      value: "773",
                      level: "3",
                      id: ";0;25769803776;25769803777;42949672960;17179869184;",
                      children: [
                        {
                          name: "happybrush zahnpasta geschenkt",
                          value: "773",
                          level: "4",
                          id: ";0;25769803776;25769803777;42949672960;17179869184;",
                          color: "#40b2a6",
                        },
                      ],
                      color: "#1973cc",
                    },
                    {
                      name: "grillido deal",
                      value: "564",
                      level: "3",
                      id: ";0;25769803776;25769803777;60129542144;",
                      color: "#1973cc",
                    },
                    {
                      name: "happybrush zahnpasta geschenkt",
                      value: "607",
                      level: "3",
                      id: ";0;25769803776;25769803777;17179869184;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "3357", id: ";0;25769803776;25769803777;", empty: true },
                  ],
                  color: "#66e6ff",
                },
              ],
              color: "#f2994d",
            },
            {
              name: "mydeals",
              value: "71512",
              level: "1",
              id: ";0;8589934592;25769803778;85899345921;",
              children: [
                {
                  name: "2 real quality mslis geschenkt",
                  value: "4395",
                  level: "2",
                  id: ";0;8589934592;25769803778;85899345921;",
                  children: [
                    {
                      name: "redeem-bar",
                      value: "527",
                      level: "3",
                      id: ";0;8589934592;25769803778;85899345921;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "3868", id: ";0;8589934592;25769803778;", empty: true },
                  ],
                  color: "#66e6ff",
                },
                {
                  name: "grillido deal",
                  value: "1641",
                  level: "2",
                  id: ";0;8589934592;60129542144;",
                  color: "#66e6ff",
                },
                {
                  name: "happybrush zahnpasta geschenkt",
                  value: "1041",
                  level: "2",
                  id: ";0;8589934592;17179869184;",
                  color: "#66e6ff",
                },
                {
                  name: "login.telekom-username",
                  value: "8675",
                  level: "2",
                  id: ";0;8589934592;25769803776;25769803777;94489280513;51539607552;17179869185;1;",
                  children: [
                    {
                      name: "login.telekom-password",
                      value: "8675",
                      level: "3",
                      id: ";0;8589934592;25769803776;25769803777;94489280513;51539607552;17179869185;1;",
                      children: [
                        {
                          name: "login.success",
                          value: "8675",
                          level: "4",
                          id: ";0;8589934592;25769803776;25769803777;94489280513;51539607552;17179869185;1;",
                          children: [
                            {
                              name: "mydeals.error",
                              value: "8675",
                              level: "5",
                              id: ";0;8589934592;25769803776;25769803777;94489280513;51539607552;17179869185;1;",
                              children: [
                                {
                                  name: "mydeals.empty",
                                  value: "8675",
                                  level: "6",
                                  id: ";0;8589934592;25769803776;25769803777;94489280513;51539607552;17179869185;1;",
                                  children: [
                                    {
                                      name: "home.error",
                                      value: "8675",
                                      id:
                                        ";0;8589934592;25769803776;25769803777;94489280513;51539607552;17179869185;1;",
                                      color: "#ffd94d",
                                    },
                                  ],
                                  color: "#f2994d",
                                },
                              ],
                              color: "#ffd94d",
                            },
                          ],
                          color: "#40b2a6",
                        },
                      ],
                      color: "#1973cc",
                    },
                  ],
                  color: "#66e6ff",
                },
                { name: "complementary", value: "55760", id: ";0;8589934592;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "mydeals.empty",
              value: "9839",
              level: "1",
              id: ";0;17179869185;51539607552;1;",
              children: [
                {
                  name: "mydeals.error",
                  value: "9273",
                  level: "2",
                  id: ";0;17179869185;51539607552;1;",
                  children: [
                    {
                      name: "home.error",
                      value: "6274",
                      level: "3",
                      id: ";0;17179869185;51539607552;1;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "2999", id: ";0;17179869185;51539607552;", empty: true },
                  ],
                  color: "#66e6ff",
                },
                { name: "complementary", value: "566", id: ";0;17179869185;", empty: true },
              ],
              color: "#f2994d",
            },
            {
              name: "mydeals.error",
              value: "31501",
              level: "1",
              id: ";0;51539607552;17179869185;1;",
              children: [
                {
                  name: "mydeals.empty",
                  value: "27624",
                  level: "2",
                  id: ";0;51539607552;17179869185;1;",
                  children: [
                    {
                      name: "home.error",
                      value: "20260",
                      level: "3",
                      id: ";0;51539607552;17179869185;1;",
                      color: "#1973cc",
                    },
                    { name: "complementary", value: "7364", id: ";0;51539607552;17179869185;", empty: true },
                  ],
                  color: "#66e6ff",
                },
                { name: "complementary", value: "3877", id: ";0;51539607552;", empty: true },
              ],
              color: "#f2994d",
            },
            { name: "privacy", value: "4259", level: "1", id: ";0;163208757250;", color: "#f2994d" },
            { name: "complementary", value: "374118", id: ";0;", empty: true },
          ],
          color: "#ffd94d",
        },
        { name: "home.error", value: "177384", level: "0", id: ";1;", color: "#ffd94d" },
        { name: "mydeals", value: "1048", level: "0", id: ";8589934592;", color: "#ffd94d" },
      ],
    },
  },
  metadata: {
    "t_parse_input (ms)": 0,
    "t_function_call (ms)": 371,
    "load_time (ms)": 337,
    "t_package_import (ms)": 339,
    date_range: ["2018-02-17", "2018-04-18"],
    os_values: ["iOS", "Android", "Other", "BlackBerry"],
    version: "1.7",
  },
}

const accessors: any = {
  data: {
    data: (d: any) => d.sunburst_data.data,
  },
  series: {
    color: (d: any) => d.color,
  },
}

const App = () => (
  <OperationalUI withBaseStyles>
    <VisualizationWrapper facade={Sunburst} data={data} config={config} accessors={accessors} />
  </OperationalUI>
)

render(<App />, containerNode)

setTimeout(() => {
  config.zoomNode = { name: "activation-error" }
  render(<App />, containerNode)
}, 5e3)

setTimeout(() => {
  data = {
    sunburst_data: {
      name: "Pageviews",
      data: {
        name: "All",
        value: "56142",
        children: [
          {
            name: "home",
            value: "56142",
            level: "0",
            id: ";0;34359738369;",
            children: [
              { name: "deal-grillido deal", value: "1490", id: ";0;34359738369;", color: "#ffd94d" },
              { name: "deal-lottery-teufel gw", value: "3978", id: ";0;68719476737;", color: "#ffd94d" },
              { name: "fcb mobil prepaid karte", value: "1044", id: ";0;120259084289;", color: "#ffd94d" },
              { name: "grillido deal", value: "6031", id: ";0;60129542144;", color: "#ffd94d" },
              { name: "grillido gw", value: "4505", id: ";0;94489280512;", color: "#ffd94d" },
              { name: "mydeals", value: "4495", id: ";0;8589934592;", color: "#ffd94d" },
              { name: "complementary", value: "34599", id: ";0;", empty: true, color: "#ffd94d" },
            ],
            color: "#ffd94d",
          },
        ],
      },
    },
    metadata: {
      "t_parse_input (ms)": 1,
      "t_function_call (ms)": 31,
      "load_time (ms)": 337,
      "t_package_import (ms)": 339,
      date_range: ["2018-02-17", "2018-04-18"],
      os_values: ["iOS", "Android", "Other", "BlackBerry"],
      version: "1.7",
    },
  }
  render(<App />, containerNode)
}, 10e3)
