"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var SideNavigationItem_1 = require("../SideNavigationItem");
var wrap_default_theme_1 = require("../../../utils/wrap-default-theme");
var SideNavigationItem = wrap_default_theme_1.default(SideNavigationItem_1.default);
test("SideNavigationItem component renders", function () {
    var output = enzyme_1.render(React.createElement(SideNavigationItem, null, "Hi, I'm an Item"));
    expect(output).toMatchSnapshot();
});
//# sourceMappingURL=SideNavigationItem.test.js.map