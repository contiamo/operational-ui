const https = require("https")

const body = {
  username: "Operational UI",
  icon_url: "https://emoji.slack-edge.com/T0G7GJQ9Z/operational/d2230b6586af99f0.png",
  text: "🚀 *Just deployed!*",
  attachments: [
    {
      fallback: "🚀 Just deployed `@operational/components@next`!",
      color: "good",
      title_link: "https://www.npmjs.com/package/@operational/components/v/next",
      text: "A new version is available under `@operational/components@next`.",
      footer: "Thank you for your amazing contribution to this team.",
    },
  ],
}

const req = https.request(
  "https://hooks.slack.com/services/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",
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  },
  res => {
    console.log(res.statusCode, res.headers)
    res.setEncoding("utf8")
    res.on("data", console.log)
    res.on("end", () => console.log("Response done."))
  },
)

req.write(JSON.stringify(body))
req.end()
