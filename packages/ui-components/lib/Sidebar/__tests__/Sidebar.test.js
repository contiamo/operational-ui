"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Sidebar_1 = require("../Sidebar");
describe("Sidebar", function () {
    it("Should render and initialize properly", function () {
        var renderedComponent = enzyme_1.shallow(React.createElement(Sidebar_1.Sidebar, null));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Sidebar.test.js.map