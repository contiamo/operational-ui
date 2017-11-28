"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var SideNavigation_1 = require("../SideNavigation");
var SideNavigation = wrap_default_theme_1.default(SideNavigation_1.default);
test("SideNavigation component renders", function () {
    expect(enzyme_1.shallow(React.createElement(SideNavigation, null))).toMatchSnapshot();
});
//# sourceMappingURL=SideNavigation.test.js.map