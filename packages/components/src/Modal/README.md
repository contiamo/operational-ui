Modals are customizable full-screen alert boxes. They should be used sparingly, but they come in handy when there is a legitimate reason to block the rest of the screen. Several Operational components such as date pickers and select boxes implement local pop-ups, which are preferable most of the time.

### Usage

```js
class ContentWithModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
  }

  onClose() {
    this.setState(prevState => ({
      isModalOpen: false,
    }))
  }

  render() {
    return (
      <div>
        {this.state.isModalOpen ? (
          <Modal title="Modal header" onClose={this.onClose.bind(this)}>
            <p>Modal content</p>
            Any <Icon name="OperationalUI" size={16} /> components or HTML elements can be rendered here.
            <div style={{ width: "100%", marginTop: 20 }}>
              <Button style={{ marginRight: 0, float: "right" }} onClick={this.onClose.bind(this)}>
                OK
              </Button>
            </div>
          </Modal>
        ) : null}
        <Button
          color="info"
          onClick={ev => {
            this.setState(prevState => ({
              isModalOpen: !prevState.isModalOpen,
            }))
          }}
        >
          Expand your modal!
        </Button>
      </div>
    )
  }
}

;<ContentWithModal />
```
