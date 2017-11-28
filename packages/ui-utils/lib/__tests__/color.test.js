"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../color");
describe("Color utils", function () {
    it("Should give me a hex code or a color presented by name", function () {
        expect(color_1.hexOrColor("red")("#fff")).toEqual("#fff");
    });
    it("Should give me a readable text color against a presented background color", function () {
        expect(color_1.readableTextColor("black")(["white", "black"])).toEqual("#ffffff");
        expect(color_1.readableTextColor("white")(["white", "black"])).toEqual("#000000");
    });
    it("Should give white readable color for light saturated background colors", function () {
        expect(color_1.readableTextColor("#689F2C")(["white", "black"])).toEqual("#ffffff");
        expect(color_1.readableTextColor("#1499CE")(["white", "black"])).toEqual("#ffffff");
        expect(color_1.readableTextColor("#FFAE00")(["white", "black"])).toEqual("#ffffff");
        expect(color_1.readableTextColor("#DE1A1A")(["white", "black"])).toEqual("#ffffff");
    });
    it("Should darken a color by a percentage", function () {
        expect(color_1.darken("#ffffff")(50)).toEqual("#808080");
    });
    it("Should lighten a color by a percentage", function () {
        expect(color_1.lighten("#808080")(50)).toEqual("#ffffff");
    });
    it("Should transparentize a color by a percentage", function () {
        expect(color_1.transparentize("red")(100)).toEqual("rgba(255, 0, 0, 0)");
    });
    it("Should set a color's value", function () {
        expect(color_1.setBrightness("#BBB", 187)).toEqual("#bbbbbb");
        expect(color_1.setBrightness("#CCC", 150)).toEqual("#888888");
    });
});
//# sourceMappingURL=color.test.js.map