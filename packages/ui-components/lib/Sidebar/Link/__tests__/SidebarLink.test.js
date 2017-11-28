"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var SidebarLink_1 = require("../SidebarLink");
var contiamo_ui_theme_1 = require("contiamo-ui-theme");
describe("SidebarLink", function () {
    it("Should render correctly", function () {
        var renderedComponent = enzyme_1.shallow(React.createElement(SidebarLink_1.SidebarLink, { className: "hi" }, "sup"));
        expect(renderedComponent).toMatchSnapshot();
    });
    it("Should render a react-router link if given a `to` prop", function () {
        var renderedComponent = enzyme_1.shallow(React.createElement(SidebarLink_1.SidebarLink, { className: "hi", to: "/route" }, "sup"));
        expect(renderedComponent).toMatchSnapshot();
    });
    it("Should receive proper styles", function () {
        expect(SidebarLink_1.style({ theme: contiamo_ui_theme_1.contiamoTheme })).toMatchObject({});
    });
    it("Should display a symbol to the right", function () {
        var renderedComponent = enzyme_1.shallow(React.createElement(SidebarLink_1.SidebarLink, { className: "hi", symbol: "% s  " }, "sup"));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=SidebarLink.test.js.map