import fetch from "isomorphic-fetch"

const repoBasePath = "https://rawgit.com/Contiamo/operational-ui/master"
const separatorString = "<!-- separator -->"

/**
 * In order to avoid additional dependencies and hacking next.js internals to pull in readme file contents into the site,
 * this simple utility fetches the contents through a simple network request and pass it to props
 * via getInitialProps. Since the pages are statically generated, this only involves a single network
 * request at build time.
 */
export const fetchFromRepo = path => {
  return fetch(`${repoBasePath}${path}`)
    .then(res => res.text())
    .then(res => {
      // If the markdown includes the separator, the fetch should assume the markdown author intended to leave off
      // a chunk at the beginning and one at the end. This flexibility is necessary so that .md content
      // makes sense both on the npm website and on the showcase.
      if (res.indexOf(separatorString) > -1) {
        return res.split("<!-- separator -->")[1]
      }
      return res
    })
}
