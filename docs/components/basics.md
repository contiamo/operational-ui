# Basics

UI's need solid basics, such as colors and typography. Operational UI keeps these fairly well-defined and contained in the [theme](https://ui.contiamo.com/theming).

## Colors

The library provides a set of basic colors, as well as a range of grays.

### Generic colors

These colors hold a generic semantic meaning that makes their use self-explanatory for elements such as a warning banner, a button doing something dangerous or irreversible, and the likes. We recommend using colors sparsely, as per [design guidelines](https://ui.contiamo.com/docs/design-guidelines).

Brand colors add a nice touch to interfaces made for clients - that said, they can obscure this semantics and should be used sparingly. We recommend not assigning it to non-brand theme color variables, with the occasional exception of \`info\`.

### Interface colors

```js
<div style={{
  width: 80,
  height: 80,
  backgroundColor: theme.colors.info 
}} />
```

## Typography

Operational UI ships with 5 well-defined, themeable typography definitions as glamorous components:
* `TitleType`: used for main page title, typically in a single place on the page (we recommend the header)
* `Heading1Type`: used as main section titles, such as card headers or static content headings. We recommend using a font-size that is not much greater than the body (16px / 12px works well).
* `Heading2Type`: used as subsection titles, e.g. inside cards or in static content. Typically the same font-size as heading1 elements, only thinner and more faded.
* `BodyType`: used for main body copy, in most of the interface.
* `SmallType`: used sparingly for form labels and auxiliary content.

You can use typography components as follows:

```js
<div>
  <TitleType>I am a title.</TitleType>
  <Heading1Type>I am a heading1.</Heading1Type>
  <Heading2Type>I am a heading2.</Heading2Type>
  <BodyType>I am a regular body section. Feel free to paint me olive.</BodyType>
  <SmallType>I am a little smaller than that.</SmallType>
</div>
```
