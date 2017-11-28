"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Select_1 = require("../Select");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Select = wrap_default_theme_1.default(Select_1.default);
var options = [
    { label: "John", value: -10 },
    { label: "Joey", value: "Nein" },
    { label: "Tupac", value: "true" },
    { label: "Chandler", value: 10 }
];
describe("Select", function () {
    it("Should render correctly", function () {
        expect(enzyme_1.render(React.createElement(Select, { options: options, disabled: true, filterable: true, multiple: true, placeholder: "Select me" }))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Select.test.js.map