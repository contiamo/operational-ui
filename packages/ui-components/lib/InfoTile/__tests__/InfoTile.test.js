"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var InfoTile_1 = require("../InfoTile");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var InfoTile = wrap_default_theme_1.default(InfoTile_1.default);
describe("InfoTile", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(InfoTile, { label: "Country" }, "DE"));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=InfoTile.test.js.map