module.exports = {
  sections: [
    {
      name: "Introduction",
      content: "./README.md",
    },
    { name: "Hooks", components: "src/use*/*.ts", sectionDepth: 1 },
    {
      name: "Components",
      components: "src/**/*.tsx",
      ignore: [
        "/**/*test*",
        "**/Internals/**",
        "**/hooks/**",
        "**/utils/**",
        "**/Typography/**",
        "**/Debug/makeRows*",
        "**/*.*.{ts,tsx}",
      ],
      sectionDepth: 1,
    },

    {
      name: "Typography",
      content: "src/Typography/README.md",
      sectionDepth: 1,
      components: "src/Typography/**/*.tsx",
    },
  ],
}
