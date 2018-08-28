import * as child_process from "child_process"
import { danger, GitHubPRDSL, markdown, message, warn } from "danger"
import jest from "danger-plugin-jest"
import * as fs from "fs"
import { includes } from "lodash"

// Setup
const pr = danger.github.pr
const modified = danger.git.modified_files
const added = danger.git.created_files

const packageChanged = includes(modified, "package.json")
const wrongLockfileChanged = includes([...modified, ...added], "package-lock.json")

const titlePrefixes = ["**Fix:**", "**Feature:**", "**Breaking:**"]
const isPrPrefixed = (title: GitHubPRDSL["title"]) => titlePrefixes.some(prefix => title.startsWith(prefix))

// Warn when there is a big PR
const bigPRThreshold = 500

message(`Here's [the demo](https://deploy-preview-${pr.number}--operational-ui.netlify.com/) for testing!`)

if (pr.title.includes("WIP")) {
  fail("This PR is a work in progress and should not be reviewed or merged _yet_.")
}

if (packageChanged && wrongLockfileChanged) {
  fail(
    "This PR contains `package-lock.json`, but we expect a `yarn.lock` instead as yarn is the preferred package manager for this project. We should not have to maintain two lockfiles.",
  )
}

if (modified.find(file => file.includes("src")) && !isPrPrefixed(pr.title)) {
  fail(`This PR is not prefixed with one of:
- ${titlePrefixes.map(prefix => `\`${prefix}\``).join("\n- ")}

Prefixing a PR that touches files in \`src\` helps us semantically version releases of this library better.`)
}

/**
 * Disabling this because we can't yet trigger
 * rechecks when a checkbox _is actually_ checked
 * as in, when the PR body is edited.
 */
// if (pr.body.includes("[ ]")) {
//   warn("There is an unchecked checkbox in this PR's description so it cannot be merged.")
// }

// No PR is too small to warrant a paragraph or two of summary
if (pr.body.length === 0) {
  fail("Please add a description to your PR.")
}

if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(":exclamation: Big PR")
}

// Always ensure we assign someone, so that our Slackbot can do its work correctly
if (pr.assignee === null) {
  fail("Please assign someone to merge this PR, and optionally include people who should review.")
}

if (fs.existsSync("tslint-errors.json")) {
  const tslintErrors = JSON.parse(fs.readFileSync("tslint-errors.json", "utf8")) as any[]
  if (tslintErrors.length) {
    const errors = tslintErrors.map(error => {
      const format = error.ruleSeverity === "ERROR" ? ":no_entry_sign:" : ":warning:"
      const linkToFile = danger.github.utils.fileLinks([error.name])
      return `* ${format} ${linkToFile} - ${error.ruleName} - ${error.failure}`
    })
    const tslintMarkdown = `
  ## TSLint Issues:
  ${errors.join("\n")}
  `
    markdown(tslintMarkdown)
  }
}

jest()
