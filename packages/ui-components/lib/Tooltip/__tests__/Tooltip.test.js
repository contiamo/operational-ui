"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Tooltip_1 = require("../Tooltip");
describe("Tooltip Component", function () {
    it("Should intialize without problems", function () {
        var output = enzyme_1.render(React.createElement(Tooltip_1.Tooltip, { className: "test" }, "Hello"));
        expect(output).toMatchSnapshot();
    });
});
//# sourceMappingURL=Tooltip.test.js.map