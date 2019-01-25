Card columns are used to group content within a card into vertical columns.

# Basic Usage

Here's how you can easily use this component.

```jsx
<Card title="Bundle Information">
  <CardColumns>
    <CardColumn title="Contributor">@tejasq</CardColumn>
    <CardColumn title="Other Contributor">@imogenf</CardColumn>
    <CardColumn title="Also other Contributor">@stereobooster</CardColumn>
    <CardColumn title="Yet another Contributor">@fabien0102</CardColumn>
  </CardColumns>
</Card>
```

# With Tabs

Card columns can be used with tabs when required. Here's how.

```jsx
const myData = {
  _page: 1,
  _pageSize: 1,
}
const myEndpointUrl = "https://me.now.sh/my-service"
initialState = {
  playgroundBodyType: "CURL",
}

const tab1 = {
  name: "CURL",
  children: (
    <Code syntax="bash">{`curl \\
    '${myEndpointUrl}' \\
    -H 'content-type: application/json' \\
    -H "Authorization: Bearer $SERVICE_ACCOUNT_TOKEN" \\
    -H 'accept: */*' \\
    --data-binary '${JSON.stringify(myData, null, 2)}'`}</Code>
  ),
}

const tab2 = {
  name: "JSON",
  children: <Code syntax="javascript">{JSON.stringify(myData, null, 2)}</Code>,
}
;<Card title="Some Versions of Snippets">
  <CardColumns>
    <CardColumn
      title="Request Body"
      activeTabName={state.playgroundBodyType}
      onTabChange={playgroundBodyType => setState({ playgroundBodyType })}
      tabs={[tab1, tab2]}
    />
  </CardColumns>
</Card>
```
