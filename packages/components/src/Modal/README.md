# Modals

Modals are customizable full-screen alert boxes. They should be used sparingly, but they come in handy when there is a legitimate reason to block the rest of the screen. Several Operational components such as date pickers and select boxes implement local pop-ups, which are preferable most of the time.

## Usage

```js
class ContentWithModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false
    }
  }
  
  render() {
    return (
      <div>
        {this.state.isModalOpen ? (
          <Modal
            onClose={() => {
              this.setState(prevState => ({
                isModalOpen: false
              }))
            }}
          >
            <div style={{ width: 300, height: 240 }}>Hello</div>
          </Modal>
        ) : null}
        <Button
          color="info"
          onClick={ev => {
            this.setState(prevState => ({
              isModalOpen: !prevState.isModalOpen
            }))
          }}
        >
          Expand your modal!
        </Button>
      </div>
    )
  }
}

<ContentWithModal />
```

## Props

| Name           | Description                                                                                                               | Type   | Default | Required |
| :------------- | :------------------------------------------------------------------------------------------------------------------------ | :----- | :------ | :------- |
| childCss       | Glamor CSS object passed down to the container's immediate child, which holds the content. Use to specify/override styles | string | -       | Yes      |
| childClassName | Class name for the modal container's immediate child, which holds the content. Use to specify/override styles.            | string | -       | Yes      |
| onClose        | Callback called when the modal is closed (outside area is clicked).                                                       | string | -       | Yes      |
