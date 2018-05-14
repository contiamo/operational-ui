# Page

This component lays out a typical opinionated page in an application, containing a title, breadcrumbs, control buttons, as well as iconography that helps the user understand how the page fits into the larger context of the application.

This component is typically used inside a layout component along with a sidenav. Check out the [layout docs](./layout.md) to get a sense of this usage.

## Usage

```js
<Page
  title="Settings Page"
  titleIcon="Settings"
  breadcrumbs={
    <Breadcrumbs>
      <Breadcrumb>
        <a>Link One</a>
      </Breadcrumb>
      <Breadcrumb>Link Two</Breadcrumb>
    </Breadcrumbs>
  }
  controls={
    <>
      {/* Always use condensed buttons in page controls */}
      <Button condensed>Go somewhere else</Button>
    </>
  }
>
  <p>Hello, this is page content</p>
</Page>
```

## Props

| Name        | Description                                                                            | Type                             | Default | Required |
| :---------- | :------------------------------------------------------------------------------------- | :------------------------------- | :------ | :------- |
| title       | Page title                                                                             | string                           | -       | Yes      |
| titleIcon   | Icon displayed next to the title. Should match related sidenav icons.                  | See [icon name prop](./icon.md). | -       | No       |
| breadcrumbs | Page breadcrumbs, using the [breadcrumbs component](./breadcrumb.md).                  | React.ReactNode                  | -       | No       |
| controls    | Page controls, typically [condensed button components](./button.md) inside a fragment. | React.ReactNode                  | -       | No       |
