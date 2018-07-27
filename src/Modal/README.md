Modals are customizable full-screen alert boxes. They should be used sparingly, but they come in handy when there is a legitimate reason to block the rest of the screen.

### Usage

```js
<Modal>
  {modal => (
    <Button
      color="primary"
      onClick={() => {
        modal({
          title: "A modal",
          body: close => (
            <Button
              color="primary"
              onClick={() => {
                close()
              }}
            >
              Close modal
            </Button>
          ),
        })
      }}
    >
      Open modal
    </Button>
  )}
</Modal>
```
