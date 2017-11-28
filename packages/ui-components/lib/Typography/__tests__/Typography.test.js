"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Typography_1 = require("../Typography");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
describe("Timeline", function () {
    it("TitleType should render properly", function () {
        expect(React.createElement(wrap_default_theme_1.default(Typography_1.TitleType))).toMatchSnapshot();
    });
    it("Heading1Type should render properly", function () {
        expect(React.createElement(wrap_default_theme_1.default(Typography_1.Heading1Type))).toMatchSnapshot();
    });
    it("Heading2Type should render properly", function () {
        expect(React.createElement(wrap_default_theme_1.default(Typography_1.Heading2Type))).toMatchSnapshot();
    });
    it("BodyType should render properly", function () {
        expect(React.createElement(wrap_default_theme_1.default(Typography_1.BodyType))).toMatchSnapshot();
    });
    it("SmallType should render properly", function () {
        expect(React.createElement(wrap_default_theme_1.default(Typography_1.SmallType))).toMatchSnapshot();
    });
});
//# sourceMappingURL=Typography.test.js.map