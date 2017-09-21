"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glamor_1 = require("glamor");
var fadeIn = glamor_1.css.keyframes({
    to: {
        opacity: 1
    }
}), resetTransform = glamor_1.css.keyframes({
    to: {
        transform: "none"
    }
}), spin = glamor_1.css.keyframes({
    from: {
        transform: "rotate(0deg)"
    },
    to: {
        transform: "rotate(359deg)"
    }
});
exports.fadeIn = fadeIn;
exports.resetTransform = resetTransform;
exports.spin = spin;
//# sourceMappingURL=animations.js.map