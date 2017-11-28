"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Progress_1 = require("../Progress");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Progress = wrap_default_theme_1.default(Progress_1.default);
describe("Progress Component", function () {
    it("Should initialize properly", function () {
        expect(enzyme_1.render(React.createElement(Progress, null))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Progress.test.js.map