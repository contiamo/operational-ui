const fs = require("fs")
const path = require("path")

const scripts = {
  prettier: "prettier './**/*.{ts,tsx}' --write",
  "prettier:verify": "prettier './**/*.{ts,tsx}' -l",
  lint: "tslint './**/*.{ts,tsx}' --fix",
  "lint:verify": "tslint './**/*.{ts,tsx}'",
  test: "jest",
  "test:u": "jest -u",
  package: "rm -rf lib && tsc -d"
}

const jest = {
  setupFiles: [
    "./test-polyfills.js"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  transform: {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "/__tests__/.*\\.(ts|tsx|js|jsx)$",
  setupTestFrameworkScriptFile: "<rootDir>/node_modules/jest-enzyme/lib/index.js",
  moduleNameMapper: {
    "\\.(css|jpg|png)$": "<rootDir>/empty-module.js"
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-enzyme"
  ],
  unmockedModulePathPatterns: [
    "react",
    "enzyme",
    "jest-enzyme"
  ],
  mapCoverage: true
}

const files = {
  "test-polyfills.js": `// Shims requestAnimationFrame for Jest tests (required since React@16)
global.requestAnimationFrame = next => {
  setTimeout(next, 0)
}`,
  "tsconfig.json": `{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "outDir": "lib",
    "target": "ES5",
    "module": "commonjs",
    "sourceMap": true,
    "noImplicitAny": true,
    "jsx": "react",
    "lib": ["DOM", "ES6", "DOM.Iterable", "ScriptHost", "es2017.object"],
    "moduleResolution": "node"
  },
  "include": ["types/**/*", "src/index.ts"],
  "exclude": ["node_modules", "lib"]
}`,
  ".prettierrc": `{
  "semi": false,
  "printWidth": 120,
  "parser": "typescript"
}`,
  "tslint.json": `{
  "extends": ["tslint-config-airbnb", "tslint-config-prettier"],
  "rules": {
    "one-variable-per-declaration": false,
    "semicolon": false,
    "quotemark": "double",
    "variable-name": ["allow-pascal-case"],
    "indent": false,
    "import-name": false
  }
} `
}

const devDependencies = {
  "@types/core-js": "0.9.43",
  "@types/d3-ease": "1.0.7",
  "@types/d3-scale": "1.0.10",
  "@types/d3-selection": "1.1.0",
  "@types/d3-shape": "1.2.1",
  "@types/d3-transition": "1.1.0",
  "@types/enzyme": "3.1.5",
  "@types/jest": "20.0.8",
  "@types/jquery": "3.2.12",
  "@types/lodash": "4.14.74",
  "@types/marked": "0.3.0",
  "@types/node": "8.0.27",
  "@types/react": "16.0.25",
  "@types/react-color": "2.13.0",
  "@types/react-dom": "16.0.0",
  "@types/react-hot-loader": "3.0.4",
  "@types/react-icons": "2.2.2",
  "@types/react-router-dom": "4.2.0",
  "@types/react-syntax-highlighter": "0.0.3",
  "@types/tinycolor2": "1.4.0",
  "@types/webpack-env": "1.13.1",
  enzyme: "2.9.1",
  "enzyme-to-json": "1.5.1",
  prettier: "1.8.2",
  tslint: "5.7.0",
  "tslint-config-airbnb": "5.2.1",
  "tslint-config-prettier": "1.5.0",
  typescript: "2.6.2",
  jest: "21.2.1",
  "jest-enzyme": "3.8.1",
  "jest-glamor-react": "3.1.0",
  "jest-serializer-enzyme": "1.0.0",
  "react-test-renderer": "16.0.0",
  "ts-jest": "21.0.0"
}

const packages = ["showcase", "ui-blocks", "ui-components", "ui-theme", "ui-utils", "visualizations"]

const writeFiles = () => {
  packages.forEach(pkg => {
    Object.keys(files).forEach(file => {
      fs.writeFileSync(path.resolve(__dirname, "../packages", pkg, file), files[file])
    })
  })
}

const changePackageJson = () => {
  packages.forEach(pkg => {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../packages", pkg, "package.json"), "utf-8"))
    packageJson.scripts = Object.assign({}, packageJson.scripts, scripts)
    packageJson.devDependencies = Object.assign({}, packageJson.devDependencies, devDependencies)
    packageJson.jest = jest
    fs.writeFileSync(path.resolve(__dirname, "../packages", pkg, "package.json"), JSON.stringify(packageJson, null, 2))
  })
}

writeFiles()
changePackageJson()
