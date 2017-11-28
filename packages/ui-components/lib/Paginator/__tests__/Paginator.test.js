"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Paginator_1 = require("../Paginator");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Paginator = wrap_default_theme_1.default(Paginator_1.default);
describe("Paginator Component", function () {
    it("Should initialize properly", function () {
        expect(enzyme_1.render(React.createElement(Paginator, { pageCount: 10, onChange: function (newPage) { } }))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Paginator.test.js.map