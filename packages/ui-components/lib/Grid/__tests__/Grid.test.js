"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Grid_1 = require("../Grid");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Grid = wrap_default_theme_1.default(Grid_1.default);
describe("Grid Component", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(Grid, { value: "SomeValue" }));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Grid.test.js.map