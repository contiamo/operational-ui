"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var ColorPicker_1 = require("../ColorPicker");
var ColorPicker = ColorPicker_1.default;
describe("ColorPicker", function () {
    it("Should initialize properly", function () {
        expect(enzyme_1.render(React.createElement(ColorPicker, null))).toMatchSnapshot();
    });
});
//# sourceMappingURL=ColorPicker.test.js.map