"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var fadeIn = glamor_1.css.keyframes({
    from: {
        opacity: 0,
        transform: "translate3d(0, -6px, 0)"
    },
    to: {
        opacity: 1,
        transform: "translate3d(0, 0, 0)"
    }
});
exports.fadeIn = fadeIn;
var resetTransform = glamor_1.css.keyframes({
    to: {
        transform: "none"
    }
});
exports.resetTransform = resetTransform;
var spin = glamor_1.css.keyframes({
    from: {
        transform: "rotate(0deg)"
    },
    to: {
        transform: "rotate(359deg)"
    }
});
exports.spin = spin;
//# sourceMappingURL=animations.js.map