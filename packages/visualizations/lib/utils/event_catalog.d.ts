declare const Events: {
    CHART: {
        CLICK: string;
        HOVER: string;
        MOVE: string;
        OUT: string;
    };
    FOCUS: {
        CLEAR: string;
        COMPONENT: {
            CLICK: string;
            HOVER: string;
            OUT: string;
            LABEL: {
                OUT: string;
            };
        };
        ELEMENT: {
            HIGHLIGHT: string;
            CLICK: string;
            HOVER: string;
            OUT: string;
        };
    };
};
export default Events;
