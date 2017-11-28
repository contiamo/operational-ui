"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Chip_1 = require("../Chip");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Chip = wrap_default_theme_1.default(Chip_1.default);
describe("Chip", function () {
    it("Should render", function () {
        expect(enzyme_1.render(React.createElement(Chip, null, "Hi"))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Chip.test.js.map