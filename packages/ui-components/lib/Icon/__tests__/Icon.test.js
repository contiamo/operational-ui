"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Icon_1 = require("../Icon");
var Icon = wrap_default_theme_1.default(Icon_1.default);
describe("Icon Component", function () {
    it("Renders an <svg> tag", function () {
        expect(enzyme_1.render(React.createElement(Icon, { name: "play" }))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Icon.test.js.map