const scripts = {
  prettier: "prettier './**/*.{ts,tsx}' --write",
  "prettier:verify": "prettier './**/*.{ts,tsx}' -l",
  lint: "tslint './**/*.{ts,tsx}' --fix",
  "lint:verify": "tslint './**/*.{ts,tsx}'",
  package: "tsc -d "
}

const files = {
  "test-polyfills.js": `
// Shims requestAnimationFrame for Jest tests (required since React@16)
global.requestAnimationFrame = next => {
  setTimeout(next, 0)
}
  `,
  "tsconfig.json": `
{
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
}
  `,
  ".prettierrc": `
{
  "semi": false,
  "printWidth": 120,
  "parser": "typescript"
}
  `,
  "tslint.json": `
{
  "extends": ["tslint-config-airbnb", "tslint-config-prettier"],
  "rules": {
    "one-variable-per-declaration": false,
    "semicolon": false,
    "quotemark": "double",
    "variable-name": ["allow-pascal-case"],
    "indent": false,
    "import-name": false
  }
}
  `
}

const buildDependencies = {
  prettier: "1.8.2",
  tslint: "5.7.0",
  "tslint-config-airbnb": "5.2.1",
  "tslint-config-prettier": "1.5.0",
  typescript: "2.6.2"
}
