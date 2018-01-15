"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events = {
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
    }
};
exports.default = Events;
//# sourceMappingURL=event_catalog.js.map