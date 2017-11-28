"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var SideNavigationLink_1 = require("../SideNavigationLink");
describe("SideNavigationLink", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.shallow(React.createElement(SideNavigationLink_1.SideNavigationLink, { className: "hi" }, "Hi, I'm a Link"));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=SideNavigationLink.test.js.map