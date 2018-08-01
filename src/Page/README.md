This component lays out a typical opinionated page in an application, containing a title, breadcrumbs, control buttons, as well as iconography that helps the user understand how the page fits into the larger context of the application.

This component is typically used inside a layout component along with a sidenav. Check out the [layout docs](./layout.md) to get a sense of this usage.

### Usage

Here is a simple usage example:

```jsx
;<Page title="Settings Page">
  <Card>Hello, this is page content</Card>
</Page>
```

### Properly handles grid rows

Here is a simple usage example:

```jsx
;<div style={{ height: 400 }}>
  <Page title="Settings Page">
    {Array(2)
      .fill("Hello, this is page content")
      .map((text, index) => <Card key={index}>{text}</Card>)}
  </Page>
</div>
```

### Sticky Header

Here is a simple usage example:

```jsx
;<div style={{ height: 200 }}>
  <Page title="Settings Page">
    {Array(50)
      .fill("Hello, this is page content")
      .map((text, index) => <Card key={index}>{text}</Card>)}
  </Page>
</div>
```

### With actions

```jsx
/* Always use condensed buttons in page actions */
const actions = (
  <Button condensed icon="ExternalLink" color="ghost">
    Go somewhere else
  </Button>
)
;<Page title="Settings Page" actions={actions}>
  <Card>Hello, this is page content</Card>
</Page>
```

### With tabs

```jsx
const Tab = props => (
  <PageContent>
    <Card title={`${props.title} Tab`} />
  </PageContent>
)
;<Page
  title="Bundle detail"
  tabs={[
    { name: "overview", children: <Tab title="Overview" /> },
    { name: "jobs", children: <Tab title="Jobs" /> },
    { name: "functions", children: <Tab title="Functions" /> },
  ]}
/>
```

### Sticky Header with Tabs

```jsx
const TabContent = props => (
  <PageContent areas="side main">
    {Array(50)
      .fill("Hello, this is page content")
      .map((text, index) => <Card key={index}>{text}</Card>)}
  </PageContent>
)
;<div style={{ height: 200 }}>
  <Page
    actions={
      <Button condensed icon="ExternalLink" color="ghost">
        Go somewhere else
      </Button>
    }
    title="Bundle detail"
    tabs={[
      { name: "overview", children: <TabContent /> },
      { name: "jobs", children: <TabContent /> },
      { name: "functions", children: <TabContent /> },
    ]}
  />
</div>
```

### With tabs and handlers

```jsx
const Tab = props => (
  <PageContent>
    <Card title={`${props.title} Tab`}>The tabs are not working because nothing update `activeTabName`!</Card>
  </PageContent>
)
;<Page
  title="Bundle detail"
  activeTabName="jobs"
  onTabChange={console.log}
  tabs={[
    { name: "overview", children: <Tab title="Overview" /> },
    { name: "jobs", children: <Tab title="Jobs" /> },
    { name: "functions", children: <Tab title="Functions" /> },
  ]}
/>
```

### With activeTabName controlled (classically with a router)

```jsx
const Tab = props => (
  <PageContent>
    <Card title={`${props.title} Tab`} />
  </PageContent>
)

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabName: "jobs",
    }
  }

  goTo(tabName) {
    this.setState({ tabName })
  }

  render() {
    return (
      <>
        <div style={{ paddingBottom: 10, marginBottom: 10, borderBottom: "1px black solid" }}>
          <h1>Router actions</h1>
          <p>Current route: {this.state.tabName}</p>
          <Button onClick={() => this.goTo("overview")}>go to overview</Button>
          <Button onClick={() => this.goTo("jobs")}>go to jobs</Button>
          <Button onClick={() => this.goTo("functions")}>go to functions</Button>
        </div>
        <Page
          title="Bundle detail"
          activeTabName={this.state.tabName}
          onTabChange={this.goTo.bind(this)}
          tabs={[
            { name: "overview", children: <Tab title="Overview" /> },
            { name: "jobs", children: <Tab title="Jobs" /> },
            { name: "functions", children: <Tab title="Functions" /> },
          ]}
        />
      </>
    )
  }
}

;<Router />
```

### With hidden tab

```jsx
const Tab = props => (
  <PageContent>
    <Card title={`${props.title} Tab`} />
  </PageContent>
)

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabName: "jobs",
    }
  }

  goTo(tabName) {
    this.setState({ tabName })
  }

  render() {
    return (
      <>
        <div style={{ paddingBottom: 10, marginBottom: 10, borderBottom: "1px black solid" }}>
          <h1>Router actions</h1>
          <p>Current route: {this.state.tabName}</p>
          <Button onClick={() => this.goTo("overview")}>go to overview</Button>
          <Button onClick={() => this.goTo("jobs")}>go to jobs</Button>
          <Button onClick={() => this.goTo("functions")}>go to functions</Button>
          <Button onClick={() => this.goTo("editor")}>go to editor</Button>
        </div>
        <Page
          title="Bundle detail"
          activeTabName={this.state.tabName}
          onTabChange={this.goTo.bind(this)}
          tabs={[
            { name: "overview", children: <Tab title="Overview" /> },
            { name: "jobs", children: <Tab title="Overview" /> },
            { name: "functions", children: <Tab title="Overview" /> },
            { name: "editor", children: <Tab title="Editor" />, hidden: true },
          ]}
        />
      </>
    )
  }
}

;<Router />
```

### With different layout

```jsx
;<Page title="Side on left!" areas="side main" fill>
  <PageArea name="side">
    <Card title="Side part">I'm on the side part</Card>
  </PageArea>
  <PageArea name="main">
    <Card title="Main part">I'm on the main part</Card>
  </PageArea>
</Page>
```

### With dropdown menu

```jsx
const options = [
  { label: "Payroll", onClick: () => {} },
  { label: "All Databases", onClick: () => {} },
  { label: "Sales - Germany only", onClick: () => {} },
  { label: "Sales - global", onClick: () => {} },
  { label: "Reporting", onClick: () => {} },
  { label: "Logistics", onClick: () => {} },
]

const actions = (
  <HeaderMenu items={options} withCaret align={"right"}>
    Sales / Foodmart
  </HeaderMenu>
)
;<Page title="Settings Page" actions={actions}>
  <Card>Hello, this is page content</Card>
</Page>
```

### Render a confirm box (prompt)

`Page` components support rendering an opinionated confirm box through a method in its context.

```jsx
<Page title="Delete the internet">
  {({ confirm }) => (
    <Card title="The red button">
      <p>
        The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil
        men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness,
        for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with
        great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know
        My name is the Lord when I lay My vengeance upon thee.
      </p>
      <p>Generated by http://slipsum.com/</p>
      <Button
        color="error"
        onClick={() =>
          confirm({
            title: "Are you sure?",
            body: (
              <>
                <p>This action will delete the entire internet</p>
                <p>You can continue safely if you are a bad guy!</p>
              </>
            ),
            cancelButton: <Button color="success">I feel guilty :-/</Button>,
            actionButton: <Button color="error">I'm a bad guy!</Button>,
            onConfirm: () => alert("boooooommm!"),
          })
        }
      >
        Delete the internet
      </Button>
    </Card>
  )}
</Page>
```

### Render a confirm box in a tab

`Page` components support rendering an opinionated confirm box through a method in its context.

```jsx
const Tab = props => (
  <PageContent>
    {({ confirm }) => (
      <Card
        title={`${props.title} Tab`}
        action={() => (
          <div>
            A nice text generated by <a href="http://www.cupcakeipsum.com">http://www.cupcakeipsum.com</a>
          </div>
        )}
      >
        <p>
          Tiramisu biscuit ice cream caramels toffee toffee ice cream jujubes. Lollipop jelly beans oat cake jelly sweet
          roll oat cake candy canes tootsie roll. Fruitcake cookie apple pie donut jujubes topping biscuit pudding.
          Dragée cotton candy chocolate bar danish cheesecake ice cream. Sweet halvah sweet roll cotton candy
          gingerbread lemon drops. Fruitcake liquorice cotton candy. Jelly beans marshmallow apple pie topping croissant
          toffee toffee sesame snaps. Jelly-o caramels cotton candy sugar plum bear claw carrot cake cake jelly-o carrot
          cake. Jelly croissant powder. Jelly beans wafer topping. Danish lemon drops halvah carrot cake fruitcake lemon
          drops. Dessert cake oat cake pudding muffin halvah cotton candy. Marshmallow cotton candy lollipop tootsie
          roll. Chocolate cake lollipop lollipop.
        </p>
        <p>
          Jelly-o biscuit wafer candy fruitcake ice cream oat cake powder topping. Sugar plum pudding oat cake pastry
          lemon drops jelly jelly beans wafer. Oat cake apple pie chupa chups chupa chups. Tiramisu gummi bears
          chocolate bear claw chocolate bar croissant tootsie roll jelly beans. Bonbon sesame snaps jujubes powder
          marzipan cotton candy marzipan. Carrot cake fruitcake candy dragée jujubes lollipop macaroon. Cheesecake
          brownie croissant cotton candy pudding marshmallow sugar plum chocolate. Lollipop donut marzipan. Muffin
          tiramisu cheesecake bonbon carrot cake caramels chocolate bar. Topping soufflé biscuit pudding muffin dragée.
          Chocolate bar cheesecake cotton candy. Jelly biscuit marzipan.
        </p>
        <Button
          color="primary"
          onClick={() =>
            confirm({
              title: "Oops, I did it again",
              body: (
                <>
                  <p>I think I did it again</p>
                  <p>I made you believe we're more than just friends</p>
                  <p>Oh baby</p>
                </>
              ),
            })
          }
        >
          Oops, I did it again
        </Button>
      </Card>
    )}
  </PageContent>
)
;<Page
  title="Bundle detail"
  tabs={[
    { name: "overview", children: <Tab title="overview" /> },
    { name: "jobs", children: <Tab title="jobs" /> },
    { name: "functions", children: <Tab title="functions" /> },
  ]}
/>
```

### Advanced case - Render a confirm box with internal state

`Page` components support rendering an opinionated confirm box through a method in its context.

```jsx
;<Page title="Advanced case">
  {({ confirm }) => (
    <Card title="With internal state management">
      <p style={{ height: 300 }}>
        The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil
        men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness,
        for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with
        great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know
        My name is the Lord when I lay My vengeance upon thee.
      </p>
      <p>Generated by http://slipsum.com/</p>
      <Button
        color="primary"
        onClick={() =>
          confirm({
            title: "This confirm can have internal state management!",
            state: {
              var1: "test 01",
              var2: "test 02",
              var3: "test 03",
            },
            body: props => (
              <>
                <Body>This will start the execution of the job immediately.</Body>
                <CardColumns>
                  <CardColumn title="Environment variables provided to the job">
                    <CardItem
                      title="MY_VAR_1"
                      value={<Input value={props.state.var1} onChange={val => props.setConfirmState({ var1: val })} />}
                    />
                    <CardItem
                      title="MY_VAR_2"
                      value={<Input value={props.state.var2} onChange={val => props.setConfirmState({ var2: val })} />}
                    />
                    <CardItem
                      title="MY_VAR_3"
                      value={<Input value={props.state.var3} onChange={val => props.setConfirmState({ var3: val })} />}
                    />
                  </CardColumn>
                </CardColumns>
              </>
            ),
            cancelButton: <Button>Cancel</Button>,
            actionButton: <Button color="primary">Confirm</Button>,
            onConfirm: state => alert(JSON.stringify(state, null, 2)),
          })
        }
      >
        Start hacking!
      </Button>
    </Card>
  )}
</Page>
```

### Render a modal box

Modals are a more flexible alternative to the confirm box, that may contain anything, and are not tied to the cancel and confirm button structure.

```jsx
<Page title="With a modal">
  {({ confirm, modal }) => (
    <Card
      action={() => (
        <div>
          A nice text generated by <a href="https://baconipsum.com/">https://baconipsum.com/</a>
        </div>
      )}
    >
      <p>
        Bacon ipsum dolor amet capicola filet mignon bacon ham t-bone. Meatloaf turkey tenderloin kielbasa, frankfurter
        doner cupim drumstick chuck shoulder boudin strip steak tongue ham hock. Shankle doner ball tip pork loin, short
        ribs turkey bacon brisket ground round. Corned beef frankfurter turkey andouille cow beef ribs pastrami meatball
        drumstick ground round biltong ball tip spare ribs. Ground round tongue shank short loin, prosciutto landjaeger
        andouille spare ribs doner kielbasa meatloaf beef chicken chuck.
      </p>
      <p>
        Pig kielbasa biltong andouille leberkas, chicken pork belly. Ball tip landjaeger chuck cow pancetta picanha
        kielbasa ham sirloin bresaola biltong buffalo. Burgdoggen chuck t-bone, porchetta pancetta tail alcatra jerky
        meatloaf tenderloin bresaola venison swine pastrami. Landjaeger sirloin turducken filet mignon boudin, fatback
        beef ribs.
      </p>
      <Button
        color="primary"
        onClick={() => {
          modal({
            title: "Bacccconnnnn!",
            body: close => (
              <>
                <p>So tasty :)</p>
                <Button
                  onClick={() => {
                    close()
                  }}
                >
                  Close this modal now!
                </Button>
              </>
            ),
          })
        }}
      >
        I want some bacon
      </Button>
    </Card>
  )}
</Page>
```
