import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { OperationalUI, Progress, Spinner } from "@operational/components"

injectStylesheet(baseStylesheet(operational))

const containerNode = document.getElementById("app")

import Sunburst from "../../src/Sunburst/facade"
import { VisualizationWrapper } from "../../src/index"

const config: any = { maxRings: 4, propagateColors: true }

import { RawData } from "../../src/Sunburst/typings"

const data: RawData = {
    "name": "Pageviews",
    "data": {
        "name": "All",
        "value": "837398",
        "children": [
            {
                "name": "5__gutschein_von_teegschwendner_",
                "value": "15999",
                "color": "#ffd94d"
            },
            {
                "name": "cardboard_virtual_reality_brille_geschenkt",
                "value": "9241",
                "color": "#f2994d"
            },
            {
                "name": "exklusiver_vorverkauf_fr_das_eminem_konzert",
                "value": "25542",
                "color": "#f2994d"
            },
            {
                "name": "gesund_abnehmen_das_buch__geschenkt",
                "value": "2355",
                "color": "#66e6ff"
            },
            {
                "name": "gratis_fotoshooting",
                "value": "1217",
                "color": "#66e6ff"
            },
            {
                "name": "home",
                "value": "764298",
                "children": [
                    {
                        "name": "5__gutschein_von_teegschwendner_",
                        "value": "45905",
                        "children": [
                            {
                                "name": "redeem-animation",
                                "value": "9444",
                                "children": [
                                    {
                                        "name": "5__gutschein_von_teegschwendner_",
                                        "value": "6363",
                                        "color": "#ffd94d"
                                    },
                                    {
                                        "name": "missing",
                                        "value": "3081",
                                        "empty": true
                                    }
                                ],
                                "color": "#ffd94d"
                            },
                            {
                                "name": "missing",
                                "value": "36461",
                                "empty": true
                            }
                        ],
                        "color": "#ffd94d"
                    },
                    {
                        "name": "_personal_training_deluxe_von_pumperlgsund_gewinnen",
                        "value": "22901",
                        "color": "#ffd94d"
                    },
                    {
                        "name": "activation-error",
                        "value": "20354",
                        "children": [
                            {
                                "name": "gesund_abnehmen_das_buch__geschenkt",
                                "value": "7895",
                                "color": "#ffd94d"
                            },
                            {
                                "name": "gratis_fotoshooting",
                                "value": "3249",
                                "color": "#f2994d"
                            },
                            {
                                "name": "zwei_gewrzdosen_geschenkt",
                                "value": "8145",
                                "color": "#40b2a6"
                            },
                            {
                                "name": "missing",
                                "value": "1065",
                                "empty": true
                            }
                        ],
                        "color": "#f2994d"
                    },
                    {
                        "name": "apple_music_6_monate_kostenlos_erleben",
                        "value": "1188",
                        "color": "#f2994d"
                    },
                    {
                        "name": "cardboard_virtual_reality_brille_geschenkt",
                        "value": "65412",
                        "children": [
                            {
                                "name": "redeem-animation",
                                "value": "2307",
                                "children": [
                                    {
                                        "name": "success",
                                        "value": "2307",
                                        "children": [
                                            {
                                                "name": "cardboard_virtual_reality_brille_geschenkt",
                                                "value": "2307"
                                            }
                                        ],
                                        "color": "#ffd94d"
                                    }
                                ],
                                "color": "#ffd94d"
                            },
                            {
                                "name": "missing",
                                "value": "63105",
                                "empty": true
                            }
                        ],
                        "color": "#f2994d"
                    },
                    {
                        "name": "exklusiver_vorverkauf_fr_das_eminem_konzert",
                        "value": "30890",
                        "color": "#f2994d"
                    },
                    {
                        "name": "gesund_abnehmen_das_buch__geschenkt",
                        "value": "43940",
                        "color": "#66e6ff"
                    },
                    {
                        "name": "gratis_fotoshooting",
                        "value": "37456",
                        "color": "#66e6ff"
                    },
                    {
                        "name": "home.error",
                        "value": "1782",
                        "color": "#66e6ff"
                    },
                    {
                        "name": "jbl_clip__fr_995_",
                        "value": "12607",
                        "color": "#66e6ff"
                    },
                    {
                        "name": "login.telekom-username",
                        "value": "6763",
                        "children": [
                            {
                                "name": "login.telekom-password",
                                "value": "6763",
                                "children": [
                                    {
                                        "name": "exklusiver_vorverkauf_fr_das_eminem_konzert",
                                        "value": "1009",
                                        "color": "#ffd94d"
                                    },
                                    {
                                        "name": "gesund_abnehmen_das_buch__geschenkt",
                                        "value": "1129",
                                        "color": "#66e6ff"
                                    },
                                    {
                                        "name": "missing",
                                        "value": "4625",
                                        "empty": true
                                    }
                                ],
                                "color": "#ffd94d"
                            }
                        ],
                        "color": "#1973cc"
                    },
                    {
                        "name": "mydeals",
                        "value": "103266",
                        "children": [
                            {
                                "name": "cardboard_virtual_reality_brille_geschenkt",
                                "value": "2560",
                                "children": [
                                    {
                                        "name": "mydeals",
                                        "value": "1182",
                                        "color": "#ffd94d"
                                    },
                                    {
                                        "name": "missing",
                                        "value": "1378",
                                        "empty": true
                                    }
                                ],
                                "color": "#ffd94d"
                            },
                            {
                                "name": "gesund_abnehmen_das_buch__geschenkt",
                                "value": "1330",
                                "children": [
                                    {
                                        "name": "mydeals",
                                        "value": "1330",
                                        "color": "#ffd94d"
                                    }
                                ],
                                "color": "#f2994d"
                            },
                            {
                                "name": "jbl_clip__fr_995_",
                                "value": "1039",
                                "children": [
                                    {
                                        "name": "mydeals",
                                        "value": "1039",
                                        "color": "#ffd94d"
                                    }
                                ],
                                "color": "#66e6ff"
                            },
                            {
                                "name": "missing",
                                "value": "98337",
                                "empty": true
                            }
                        ],
                        "color": "#1973cc"
                    },
                    {
                        "name": "mydeals.empty",
                        "value": "7225",
                        "color": "#1973cc"
                    },
                    {
                        "name": "pumperlgsund_abnehmprogramm_geschenkt",
                        "value": "44515",
                        "color": "#40b2a6"
                    },
                    {
                        "name": "readly_zwei_monate_kostenlos",
                        "value": "4081",
                        "color": "#40b2a6"
                    },
                    {
                        "name": "teil_1_der_maze_runner_trilogie_geschenkt",
                        "value": "32469",
                        "color": "#40b2a6"
                    },
                    {
                        "name": "zwei_gewrzdosen_geschenkt",
                        "value": "39617",
                        "color": "#a6d9f2"
                    },
                    {
                        "name": "missing",
                        "value": "243927",
                        "empty": true
                    }
                ],
                "color": "#1973cc"
            },
            {
                "name": "home.error",
                "value": "10625",
                "color": "#1973cc"
            },
            {
                "name": "jbl_clip__fr_995_",
                "value": "1337",
                "color": "#40b2a6"
            },
            {
                "name": "teil_1_der_maze_runner_trilogie_geschenkt",
                "value": "6784",
                "color": "#40b2a6"
            }
        ]
    }
}

const accessors: any = {
  data: {
    data: (d: any) => d.data
  },
  series: {
    color: (d: any) => d.color
  }
}

const App = () => <OperationalUI><VisualizationWrapper facade={Sunburst} data={data} config={config} accessors={accessors}/></OperationalUI>

render(<App />, containerNode)

