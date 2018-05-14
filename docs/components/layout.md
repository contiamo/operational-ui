# Layouts

This component lays out an opinionated application frame with side navigation, a main section and some optional conveniences. It sits at the top level of the page.

## Usage

```
// Container must set the height explicitly.
// This component will set height to 100%.
<Layout
  sidenav={<Sidenav expanded />}
  main={
    <Page
      title="Page Title"
      breadcrumbs={
        <Breadcrumbs>
          <Breadcrumb>One</Breadcrumb>
          <Breadcrumb>One</Breadcrumb>
          <Breadcrumb>One</Breadcrumb>
        </Breadcrumbs>
      }
      controls={
        <div>
          <Button condensed color="info">Help</Button>
        </div>
      }
    />
  }
/>
```

## Props

| Name    | Description                                             | Type            | Default | Required |
| :------ | :------------------------------------------------------ | :-------------- | :------ | :------- |
| sidenav | Side navigation, see [sidenav component](./sidenav.md). | React.ReactNode | -       | No       |
| main    | Main content, typically a [page component](./page.md).  | React.ReactNode | -       | No       |
| loading | Sets whether a loading progress bar should be rendered. | boolean         | -       | No       |
