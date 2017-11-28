"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Switch_1 = require("../Switch");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Switch = wrap_default_theme_1.default(Switch_1.default);
describe("Switch", function () {
    it("Should render", function () {
        expect(enzyme_1.render(React.createElement(Switch, { on: true }))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Switch.test.js.map