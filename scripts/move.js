const { rename, lstatSync, readdirSync } = require("fs")
const { resolve, unlink, join } = require("path")

const isDirectory = source => lstatSync(source).isDirectory()
const getPackages = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)
    .map(path => ({ path, name: path.split("/")[path.split("/").length - 1] }))
    .filter(package => package.name !== "showcase")

getPackages(resolve(__dirname, "../lib")).forEach(({ path, name }) => {
  rename(resolve(path, "src"), resolve(__dirname, "../packages", name, "lib"), status => console.log("haha", status))
})

// fs.rename(resolve(__dirname, '../lib'))
