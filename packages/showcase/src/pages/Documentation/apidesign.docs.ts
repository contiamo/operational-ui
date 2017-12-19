export default `
Operational UI exports a wide range of granular components fulfilling a wide range of purposes. To help using them successfully, this page describes the general API philosophy, and outlines common code patterns that all components adhere to.


## Stateless and controlled

Components rely on very little local state, limited only to holding transient UI state (e.g. whether a dialog box is expanded), filter/autocomplete values and intermediate data entry results.

Components whose main concern is data entry typically provide a *value* and *onChange* props. The parent component must own this piece of state and define how it reacts to its changes by wiring up these props.

Some examples:

    <Input value="MyName" onChange={newValue => { /* */ }/>
    <DatePicker start="2013-10-02" end={null} onChange={({ start, end }) => { /* */ }/>

Notice how *value* is often more complex, and thus named differently to keep props flat. As a general pattern, the data structure passed back through *onChange* mymics the structure passed down, to the extent it can be made clear using JSX syntax.

## Makes use of dedicated child components to define structure

One could define a menu in two ways:

    const Menu1 = () => <Menu links={[{ label: "Link1", url: "/link1" }, { label: "Link2", url: "/link2" }]}/>
    const Menu2 = () =>
      <Menu>
        <MenuLink label="Link1" url="/link1"/>
        <MenuLink label="Link2" url="/link2"/>
      </Menu>

This library heavily opts for the latter, keeping content more customizable, and breaking down responsibilities of both styling and customization options to multiple components. This heavily component-based styling philosophy emerges from the internal implementation of the component styles themselves. Replicating this styling approach in larger applications using this project will make sure styles play nicely together.

## Theming

Most components rely on a theme object, the use of which the library mandates, as follows:

    import { operationalTheme, Button } from "@operational/components"
    import glamorous, { ThemeProvider } from "glamorous"

    render(<ThemeProvider theme={operationalTheme}><Button>Hello</Button></ThemeProvider>

You can of course, define your own theme based on the operationalTheme structure. Since the theme structure still changes significantly, more detailed docs will be arriving later.

## Overrides

ui-components is fairly opinionated, designed to get effective and sensibly designed operational interfaces running in the least amount of time and code involved. As your application grows and needs become more specialized, you'll likely need to do customizations and overrides.

Two override props are provided on all components, an additional *className* string and a glamor style object under the name *css*, as follows:

    <Button className="solid-button" css={{ color: "red": "&:hover": { color: "blue" }}}/>

Some components expose similar props you can use to style key internal components, such as the content panel of a modal, trough related props *childClassName* and *childCss*.

Note that inline styles passed in through the *style* prop are ignored in order to discourage ultimate escape hatches that override the cascade. 

## All-JS, all-React

Components tap all the way into advanced features of its significant dependencies, React and glamorous. Custom-defined CSS class names are avoided as much as possible over granular, parameterized styled components. Several components rely on React's event delegation, child manipulation through *React.Children.map*, and there are plans underway to introduce error boundaries and portals.

But that doesn't mean the project has to be used this way: you can attach custom class names and style overrides as you see fit, integrate with third-party libraries, and provide custom React content inside components. The hashed class names inside components will make sure you can plug other projects and technologies in and stay conflict-free. 
`
