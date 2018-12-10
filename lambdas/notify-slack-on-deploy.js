const { default: fetch } = require("node-fetch")
const get = require("lodash/get")

const defaultResponse = {
  statusCode: 200,
  body: JSON.stringify({ msg: "ok" })
}

exports.handler = async (event) => {
  try {
    console.log(JSON.stringify(event, null, 2))
    const requestBody = JSON.parse(event.body)

    if (!get(requestBody, "attachments.0.title_link", "").includes("deploy-preview")) {
      return defaultResponse
    }

    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        ...requestBody,
        text: "🎉 One of my PRs now has a demo!",
        username: "Operational UI",
        icon_url: "https://emoji.slack-edge.com/T0G7GJQ9Z/operational/d2230b6586af99f0.png",
        attachments: [
          {
            ...get(requestBody, "attachments.0", {}),
            fallback: "🎉 One of my PRs now has a demo!",
            text: "Also, the PR is <https://github.com/contiamo/operational-ui/pull/"+get(requestBody, "attachments.0.title_link", "").split("-")[2]+"|here> if you want to review it.",
            footer: "Thank you for your amazing contribution to this team.",
          },
        ],
      }),
    })

    return defaultResponse
  } catch (e) {
    console.log("Failed: " + JSON.stringify(event, null, 2))
    // Silently fail because this is what all great engineers do
    return defaultResponse
  }
}
