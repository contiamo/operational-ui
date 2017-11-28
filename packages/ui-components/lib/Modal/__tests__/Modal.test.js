"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Modal_1 = require("../Modal");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Modal = wrap_default_theme_1.default(Modal_1.default);
describe("Modal Component", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(Modal, { value: "SomeValue" }));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Modal.test.js.map