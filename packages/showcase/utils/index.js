import fetch from "isomorphic-fetch"

const repoBasePath = "https://rawgit.com/Contiamo/operational-ui/master"

/**
 * In order to avoid additional dependencies and hacking next.js internals to pull in readme file contents into the site,
 * this simple utility fetches the contents through a simple network request and pass it to props
 * via getInitialProps. Since the pages are statically generated, this only involves a single network
 * request at build time.
 */
export const fetchFromRepo = (path, startLine, endLine) => {
  return fetch(`${repoBasePath}${path}`)
    .then(res => res.text())
    .then(res => startLine ? res.split("\n").slice(startLine, endLine).join("\n") : res)
}
