"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Button_1 = require("../Button");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Button = wrap_default_theme_1.default(Button_1.default);
describe("Button Component", function () {
    it("Should initialize properly", function () {
        expect(enzyme_1.render(React.createElement(Button, null, "hi"))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Button.test.js.map