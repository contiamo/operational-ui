import { Button, ThemeProvider, operationalTheme } from "@operational/components"

export default () => (
  <ThemeProvider theme={operationalTheme}>
    <div>
      <h1>Hello!</h1>
      <Button>Good bye</Button>
    </div>
  </ThemeProvider>
)
