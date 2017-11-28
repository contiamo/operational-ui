"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Input_1 = require("../Input");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Input = wrap_default_theme_1.default(Input_1.default);
describe("Input", function () {
    it("Should initialize", function () {
        var input = enzyme_1.render(React.createElement(Input, { className: "hi", value: "How are you?", placeholder: "hello", name: "bienvenue" }));
        expect(input).toMatchSnapshot();
    });
});
//# sourceMappingURL=Input.test.js.map