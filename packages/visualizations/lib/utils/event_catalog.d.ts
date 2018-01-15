declare const Events: {
    CHART: {
        CLICK: string;
        MOUSEOVER: string;
        MOVE: string;
        MOUSEOUT: string;
    };
    FOCUS: {
        CLEAR: string;
        COMPONENT: {
            CLICK: string;
            MOUSEOVER: string;
            MOUSEOUT: string;
            LABEL: {
                MOUSEOUT: string;
            };
        };
        ELEMENT: {
            HIGHLIGHT: string;
            CLICK: string;
            MOUSEOVER: string;
            MOUSEOUT: string;
        };
    };
};
export default Events;
