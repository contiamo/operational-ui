"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Card_1 = require("../Card");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Card = wrap_default_theme_1.default(Card_1.default);
describe("Card", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(Card, null, "hi"));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Card.test.js.map