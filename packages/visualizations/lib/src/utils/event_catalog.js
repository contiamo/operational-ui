"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = {
    CHART: {
        CLICK: "chart:click",
        HOVER: "chart:hover",
        MOVE: "chart:mousemove",
        OUT: "chart:out",
    },
    // Treemaps
    DATA: {
        DRILLTO: {
            ELEMENT: "drillTo:element",
        },
    },
    FOCUS: {
        CATEGORY: "focus:category",
        CLEAR: "focus:clear",
        // Cohort charts
        COHORT: {
            CELL: "focus:element:cell",
            COLUMN: "focus:element:column",
            ROW: "focus:element:row",
        },
        COMPONENT: {
            CLICK: "focus:component:click",
            HOVER: "focus:component:hover",
            OUT: "focus:component:out",
        },
        DATE: "focus:date",
        ELEMENT: {
            CLICK: "focus:element:click",
            HOVER: "focus:element:hover",
            OUT: "focus:element:out",
        },
        // Event flags in chart viz
        FLAG: {
            HOVER: "focus:flag:hover",
            OUT: "focus:flag:out",
        },
    },
};
exports.default = Events;
//# sourceMappingURL=event_catalog.js.map