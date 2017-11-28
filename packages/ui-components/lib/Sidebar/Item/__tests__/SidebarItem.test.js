"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var SidebarItem_1 = require("../SidebarItem");
describe("SidebarItem", function () {
    it("Should initialize", function () {
        var renderedComponent = enzyme_1.render(React.createElement(SidebarItem_1.SidebarItem, null, "Hola, compadre!"));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=SidebarItem.test.js.map