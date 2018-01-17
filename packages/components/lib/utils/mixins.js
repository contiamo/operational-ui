"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@operational/utils");
exports.inputFocus = function (_a) {
    var theme = _a.theme;
    return ({
        outline: 0,
        border: "1px solid",
        borderColor: theme.colors.info,
        boxShadow: "0 0 0 3px " + utils_1.lighten(theme.colors.info)(40)
    });
};
//# sourceMappingURL=mixins.js.map