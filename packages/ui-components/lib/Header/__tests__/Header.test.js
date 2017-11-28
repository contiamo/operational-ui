"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Header_1 = require("../Header");
var Header = wrap_default_theme_1.default(Header_1.default);
describe("Header", function () {
    it("Header component renders", function () {
        var output = enzyme_1.render(React.createElement(Header, { className: "hi" }, "Hello"));
        expect(output).toMatchSnapshot();
    });
});
//# sourceMappingURL=Header.test.js.map