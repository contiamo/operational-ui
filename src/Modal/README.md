## Basic Usage

Typically, you would use a modal to show some information and close when the area outside of it is clicked. Try it out!

```jsx
import * as React from "react"
import { Modal } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>Trigger the Modal</div>
      <Modal isOpen={isModalOpen} onClickOutside={() => setIsModalOpen(false)} title="What's up?">
        Dawg
      </Modal>
    </>
  )
}
;<MyComponent />
```

## Full size

```jsx
import * as React from "react"
import { Modal } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>Trigger the Modal</div>
      <Modal isOpen={isModalOpen} onClickOutside={() => setIsModalOpen(false)} title="What's up?" fullSize>
        Dawg
      </Modal>
    </>
  )
}
;<MyComponent />
```

## With Actions

Sometimes, you may want to mimic "Confirm" style behavior: like when deleting a resource. Here's how you can attach actions to your modal.

```jsx
import * as React from "react"
import { Modal, Button } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>Ask the Question</div>
      <Modal
        actions={[
          <Button
            color="error"
            onClick={() => {
              alert("💥")
              setIsModalOpen(false)
            }}
          >
            Yes
          </Button>,
          <Button
            onClick={() => {
              alert("God bless you")
              setIsModalOpen(false)
            }}
          >
            I'm a nice person
          </Button>,
        ]}
        isOpen={isModalOpen}
        onClickOutside={() => setIsModalOpen(false)}
        title="What's up?"
      >
        Do you want to delete the internet?
      </Modal>
    </>
  )
}
;<MyComponent />
```

## With Custom Height

Sometimes, we might want to either restrict or expand the height of the modal programmatically. For this, we have a `height` prop.

```jsx
import * as React from "react"
import { Modal, Body } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>An Essay About Ice-Cream</div>
      <Modal height="300px" isOpen={isModalOpen} onClickOutside={() => setIsModalOpen(false)} title="🍦">
        <Body>
          White chocolate cookies and cream raspberry, white chocolate. Caramel cherry mint maple orange frozen almond
          dessert scoop sorbet, snow cones caramel. Raspberry cake raspberry vanilla. Scoop sundae, apple, froyo. Apple
          snow cones sorbet chocolate froyo.
        </Body>
        <Body>
          Ice sundae chocolate chip flavour mocha caramel. Pecan vanilla sundae ice. Chocolate chip butter caramel
          flavour. Banana orange cherry cup mocha peanut butter shortcake cake chunky. Sorbet caramel shortcake toppings
          toppings soft serve orange vanilla sherbet, shortcake caramel frozen.
        </Body>
        <Body>
          Scoop pecan almond cake mocha dessert chocolate chip vanilla peppermint froyo. Cup soft serve gelato, flavour
          chocolate chip, chunky blueberry vanilla, sundae shortcake sundae toppings. Gelato nut sorbet cookies and
          cream butterscotch mint peanut butter. Dessert scoop ice raspberry chocolate chip almond coffee chocolate
          frozen. Peanut butter maple cherry almond orange dessert cake chocolate chip caramel blueberry gelato.
        </Body>
      </Modal>
    </>
  )
}
;<MyComponent />
```

## Anchoring to an Element

In some cases, you'd want a modal to be "anchored" to a parent element such that it covers it, providing screen real-estate and context. Supply the `anchor` prop with a `ref` and the modal will magically attach itself to the node in question if it can find it.

```jsx
import * as React from "react"
import { Modal, Body, Button } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const galactusRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={galactusRef} style={{ background: "#c00" }} onClick={() => setIsModalOpen(true)}>
        <h1 style={{ margin: 0, fontSize: 100 }}>I AM GALACTUS</h1>
        <h2>CLICK ME TO OPEN A MODAL ANCHORED TO MY POSITION AND SIZE</h2>
        <img
          alt="Galactus"
          src="https://www.artmajeur.com/medias/standard/b/e/benny-arte/artwork/11430287_galactus.jpg"
        />
      </div>
      <Modal
        actions={[
          <Button color="primary" onClick={() => alert("Fabien has the best voice for singing!")}>
            Tell me the Truth
          </Button>,
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>,
        ]}
        anchor={galactusRef}
        isOpen={isModalOpen}
        onClickOutside={() => setIsModalOpen(false)}
        title="🛡"
      >
        <div>
          The avengers win
          <img style={{ width: "100%" }} alt="Avengers" src="https://images5.alphacoders.com/481/481123.jpg" />
        </div>
      </Modal>
    </>
  )
}
;<MyComponent />
```

## Anchoring to an Element, but overriding width and height

In some cases, you want an anchored modal not to consume _all_ available space. In this case, we can override its size like so.

```jsx
import * as React from "react"
import { Modal, Body, Button } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const appleRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={appleRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0ff",
          padding: 32,
          height: 480,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <h2>Click to open a (smaller) Modal anchored to this div</h2>
      </div>
      <Modal
        width="max-content"
        height="auto"
        anchor={appleRef}
        isOpen={isModalOpen}
        onClickOutside={() => setIsModalOpen(false)}
        title="🛡"
        actions={[
          <Button color="primary" onClick={() => alert("Apple used to be good but I'm not paying $999 for a monitor.")}>
            Tell me the Truth
          </Button>,
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>,
        ]}
      >
        <img alt="JS" src="https://satchel.rei.com/media/global/img/compass-animation-222.gif" />
      </Modal>
    </>
  )
}
;<MyComponent />
```

## Advanced Case: With a Form

We also would like to have stateful modals sometimes. Here's how one can implement a form (and modalception) with Modal.

⚠️ This example is a little advanced so please [open an issue](https://github.com/contiamo/operational-ui/issues/new) or similar if you need extra help.

```jsx
import * as React from "react"
import { Modal, Form, Input, Button, Checkbox } from "@operational/components"

const DeleteButton = ({ anchorRef }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Button color="error" onClick={() => setIsModalOpen(true)}>
        Delete
      </Button>
      <Modal
        anchor={anchorRef}
        actions={[<Button onClick={() => setIsModalOpen(false)}>Close</Button>]}
        title="Modalception"
        isOpen={isModalOpen}
      >
        How is this even possible?
        <MyComponent />
      </Modal>
    </>
  )
}

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [currentFormPage, setCurrentFormPage] = React.useState(1)
  const [formData, setFormData] = React.useState<{ name?: string; iceCream?: string; checked?: boolean }>({})
  const formRef = React.useRef<HTMLDivElement>(null)
  const modalRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={formRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0",
          width: 640,
          height: 480,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <h2>Open a Form</h2>
      </div>
      <Modal
        actions={
          currentFormPage === 1
            ? [<Button onClick={() => setCurrentFormPage(2)}>Next</Button>, <DeleteButton anchorRef={modalRef} />]
            : [
                <Button
                  color="primary"
                  onClick={() => {
                    alert(JSON.stringify(formData, null, 2))
                    setIsModalOpen(false)
                  }}
                >
                  Submit
                </Button>,
                <Button onClick={() => setCurrentFormPage(1)}>Back</Button>,
                <Button
                  onClick={() => {
                    setCurrentFormPage(1)
                    setIsModalOpen(false)
                  }}
                >
                  Cancel
                </Button>,
              ]
        }
        ref={modalRef}
        anchor={formRef}
        isOpen={isModalOpen}
        onClickOutside={() => setIsModalOpen(false)}
        title="Questionnaire"
      >
        {currentFormPage === 1 ? (
          <Form>
            <Input
              onChange={name => setFormData({ ...formData, name })}
              value={formData.name}
              placeholder="Slavic Vysokynsky"
              label="Your Name"
            />
            <Input
              onChange={iceCream => setFormData({ ...formData, iceCream })}
              value={formData.iceCream}
              placeholder="Rocky Road"
              label="Your Favorite Ice Cream Flavor"
            />
          </Form>
        ) : (
          <Form>
            <Checkbox
              value={formData.checked === true}
              onChange={newVal => setFormData({ ...formData, checked: newVal })}
              label="Are you beautiful?"
            />
          </Form>
        )}
      </Modal>
    </>
  )
}
;<MyComponent />
```

## With an Anchored Table

Here's how a table can compose into a modal.

```jsx
import * as React from "react"
import { Table, Modal, Chip, Button, ProjectIcon } from "@operational/components"

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<{ name?: string; iceCream?: string; checked?: boolean }>({})
  const formRef = React.useRef<HTMLDivElement>(null)
  const modalRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={formRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eaf",
          width: "100%",
          height: 480,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <h2>Show me the Table</h2>
      </div>
      {isModalOpen && (
        <Modal
          width="max-content"
          height="auto"
          actions={[<Button onClick={() => setIsModalOpen(false)}>Close Modal</Button>]}
          ref={modalRef}
          anchor={formRef}
          isOpen={isModalOpen}
          onClickOutside={() => setIsModalOpen(false)}
          title="Questionnaire"
        >
          <div style={{ width: 600 }}>
            <Table
              data={Array(100).fill({ name: "Mischa", lastUpdated: new Date().toString(), tags: ["yes", "no"] })}
              columns={[
                { heading: "", cell: dataEntry => <ProjectIcon color="primary" /> },
                { heading: "Name", cell: dataEntry => dataEntry.name },
                { heading: "Last updated", cell: dataEntry => dataEntry.lastUpdated },
                {
                  heading: "Tags",
                  cell: dataEntry => dataEntry.tags.map((tag, tagIndex) => <Chip key={tagIndex}>{tag}</Chip>),
                },
              ]}
              onRowClick={(dataEntry, i) => console.log({ dataEntry, i })}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
;<MyComponent />
```
