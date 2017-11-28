"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Timeline_1 = require("../Timeline");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Timeline = wrap_default_theme_1.default(Timeline_1.default);
describe("Timeline", function () {
    it("Should render", function () {
        var component = (React.createElement(Timeline, null,
            React.createElement(Timeline_1.TimelineItem, null, "Test")));
        var renderedComponent = enzyme_1.render(component);
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Timeline.test.js.map