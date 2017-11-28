"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var theme_1 = require("../theme");
var ThemelessComp = function () { return React.createElement("div", null, "Hello, ThemeWrapper!"); };
var Comp = theme_1.wrapTheme({})(ThemelessComp);
describe("Progress Component", function () {
    it("Should initialize properly", function () {
        expect(enzyme_1.render(React.createElement(Comp, null))).toMatchSnapshot();
    });
});
//# sourceMappingURL=theme.test.js.map