"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Tabs_1 = require("../Tabs");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Tabs = wrap_default_theme_1.default(Tabs_1.Tabs);
describe("Tabs", function () {
    it("Should render", function () {
        var component = (React.createElement(Tabs, null,
            React.createElement(Tabs_1.Tab, null, "Test")));
        var renderedComponent = enzyme_1.render(component);
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Tabs.test.js.map