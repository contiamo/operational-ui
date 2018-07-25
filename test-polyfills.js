const Adapter = require("enzyme-adapter-react-16");
const Enzyme = require("enzyme");

// Shims requestAnimationFrame for Jest tests (required since React@16)
global.requestAnimationFrame = next => {
  setTimeout(next, 0);
};

Enzyme.configure({ adapter: new Adapter() });
