"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var PlusChip_1 = require("../PlusChip");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var PlusChip = wrap_default_theme_1.default(PlusChip_1.default);
describe("Plus Chip", function () {
    it("Should correctly render", function () {
        expect(enzyme_1.render(React.createElement(PlusChip, null))).toMatchSnapshot();
    });
});
//# sourceMappingURL=PlusChip.test.js.map