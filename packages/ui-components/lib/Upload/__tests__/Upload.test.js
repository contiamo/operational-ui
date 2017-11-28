"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Upload_1 = require("../Upload");
var wrap_default_theme_1 = require("../../utils/wrap-default-theme");
var Upload = wrap_default_theme_1.default(Upload_1.default);
describe("Upload Component", function () {
    it("Should render", function () {
        var renderedComponent = enzyme_1.render(React.createElement(Upload, null));
        expect(renderedComponent).toMatchSnapshot();
    });
});
//# sourceMappingURL=Upload.test.js.map