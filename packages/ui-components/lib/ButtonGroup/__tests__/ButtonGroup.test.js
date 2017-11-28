"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var ButtonGroup_1 = require("../ButtonGroup");
var Button_1 = require("../../Button/Button");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var ButtonGroup = wrap_default_theme_1.default(ButtonGroup_1.default);
describe("ButtonGroup Component", function () {
    it("Should initialize properly", function () {
        expect(enzyme_1.render(React.createElement(ButtonGroup, null,
            React.createElement(Button_1.default, null, "Hello")))).toMatchSnapshot();
    });
});
//# sourceMappingURL=ButtonGroup.test.js.map