const { default: fetch } = require("node-fetch")

const body = {
  username: "Operational UI",
  icon_url: "https://emoji.slack-edge.com/T0G7GJQ9Z/operational/d2230b6586af99f0.png",
  text: "🚀 *Just deployed!*",
  attachments: [
    {
      fallback: "🚀 Just deployed `@operational/components@next`!",
      color: "good",
      title_link: "https://www.npmjs.com/package/@operational/components/v/next",
      text: `A new version (\`${
        process.argv[2]
      }\`) is available under \`@operational/components@next\`.\nBe sure to <https://github.com/contiamo/operational-ui/commit/${
        process.argv[2].split("-")[1]
      }|check out the commit on GitHub!>`,
      footer: "Thank you for your amazing contribution to this team.",
    },
  ],
}

fetch("https://hooks.slack.com/services/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", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(body),
})
