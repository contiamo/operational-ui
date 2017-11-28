"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var SideNavigationHeader_1 = require("../SideNavigationHeader");
var wrap_default_theme_1 = require("../../../utils/wrap-default-theme");
var SideNavigationHeader = wrap_default_theme_1.default(SideNavigationHeader_1.default);
describe("SideNavigationHeader", function () {
    it("Should render correctly", function () { return expect(enzyme_1.render(React.createElement(SideNavigationHeader, null, "hi"))).toMatchSnapshot(); });
});
//# sourceMappingURL=SideNavigationHeader.test.js.map