"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var ContextMenu_1 = require("../ContextMenu");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var ContextMenu = wrap_default_theme_1.default(ContextMenu_1.default);
describe("ContextMenu Component", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(ContextMenu, { value: "SomeValue" }));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=ContextMenu.test.js.map