const { default: fetch } = require("node-fetch")

exports.handler = (event, _, callback) => {
  const requestBody = JSON.parse(event.body)

  if (!requestBody.attachments[0].title_link.includes("deploy-preview")) {
    return callback(requestBody, { statusCode: 200 })
  }

  fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({
      ...requestBody,
      username: "Operational UI",
      icon_url: "https://emoji.slack-edge.com/T0G7GJQ9Z/operational/d2230b6586af99f0.png",
    }),
  })

  return callback(requestBody, { statusCode: 200 })
}
